<script lang="ts">
    import { onMount, afterUpdate } from "svelte";
	import { conversionRate, trendPercentage } from '$lib/utils';
    import WebSocket from 'isomorphic-ws';
	import Icon from '@iconify/svelte';

	export let country;
	let first = {current : false}
	const ws = new WebSocket("wss://ws-feed.pro.coinbase.com");
	let coinbase = [];
    let products = ['BTC-USDT','ETH-USDT','ADA-USDT'];
    onMount(async () => {
		first.current = true;
	});

	afterUpdate(async () => {
		const handleSend = () => {
			if (ws.readyState === WebSocket.OPEN) {
				let msg = {
					type: "subscribe",
					product_ids: products,
					channels: ["ticker"]
				};
				let jsonMsg = JSON.stringify(msg);
				ws.send(jsonMsg);
			} else {
				// Queue a retry
				setTimeout(() => { handleSend() }, 1000)
			}
		};
		handleSend();

		ws.onmessage = (e) => {
			let data = JSON.parse(e.data);
			if (data.type !== "ticker") {
				return;
			}
			if(products.includes(data.product_id)) {
				coinbase[data.product_id] = data;
			}
		};
	});
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
    {#each products as product}
		<div class="w-full">
			<div class="shadow-lg px-4 py-6 w-full bg-white dark:bg-gray-700 relative h-52">
				<div class="flex">
					<div class="flex-1 text-sm w-max text-gray-700 dark:text-white mb-1 font-sans font-semibold flex items-end">
						{coinbase && coinbase[product] ? coinbase[product].product_id : ""} 
					</div>
					<div class="text-sm w-max text-lime-500 dark:text-white mb-1 font-sans font-semibold flex items-end">
						{coinbase && coinbase[product] ? `${trendPercentage(coinbase[product].open_24h, coinbase[product].low_24h)}%` : ""}
					</div>
				</div>
				<p class="text-2xl text-black dark:text-white font-bold mb-1">
					{coinbase && coinbase[product] ? coinbase[product].high_24h : ""} 
				</p>
				<p class="text-base text-black dark:text-white font-bold">
					{coinbase && coinbase[product] ? `Volume: ${coinbase[product].volume_24h}` : ""} 
				</p>
			</div>
			<p class="text-base text-black dark:text-white font-bold mt-4">
				{#if coinbase && coinbase[product]}
				{country.currency}:  
				<Icon icon={country.symbol} class="w-4 h-8 inline text-base text-black dark:text-white font-bold"/> 
				{conversionRate(coinbase[product].price, country.rate)} 
				{/if}
			</p>
		</div>
    {/each}
</div>	
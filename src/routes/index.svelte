<script context="module" lang="ts">
	export const prerender = true;
	import { onMount } from "svelte";
	import { countryList, listItems } from '$lib/stores/store.js';
	import Cards from '../components/Cards.svelte';
	import Icon from '@iconify/svelte';
</script>

<script lang="ts">
	import {get} from './dashboard/index';
	let toggle = false;
	let selCountry = {name: '', currency: 'USD', rate: 1, symbol: 'carbon:currency-dollar'};
    
	const toggleElement = () => {
		toggle = !toggle;
    }

	const selectCountry = (item) => {
		selCountry = item;
		toggle = !toggle;
	}

	onMount(async () => {
		const query = 
			{query:`{
				countries {
					name
					code
					emojiU
					emoji
					currency
				}
			}`};
		const response = await get(query); 
		const data = await response;
		countryList.set(data); 
	});

</script>
<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<div class="top-250">
	<div class="flex flex-col items-center h-24">
		<div class="w-full md:w-1/2 flex flex-col items-center h-64">
			<div class="w-full px-4">
				<div class="flex flex-col items-center relative">
					<div class="w-full">
						<div class="my-2 p-1 bg-white flex border border-gray-200 rounded">
							<!-- <div class="flex flex-auto flex-wrap"></div> -->
							<input placeholder="Search" value={selCountry.name} class="p-1 px-2 appearance-none outline-none w-full text-gray-800">
							<div class="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200">
								<button class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none" on:click={toggleElement}>
									{#if toggle}
									<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="bi:currency-yen w-4 h-4">
										<polyline points="6 9 12 15 18 9"></polyline>
									</svg>
									{:else}
									<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="bi:currency-yen w-4 h-4">
										<polyline points="18 15 12 9 6 15"></polyline>
									</svg>
									{/if}
								</button>
							</div>
						</div>
					</div>
					{#if toggle}
					<div class="absolute shadow bg-white top-100 z-40 w-full lef-0 rounded max-h-select overflow-y-auto svelte-5uyqqj">
						{#each $listItems as country}
						<div class="flex flex-col w-full" on:click={e => selectCountry(country)}>
							<div class="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100 {selCountry.name == country.name ? 'bg-teal-100' : ''}">
								<div class="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
									<div class="w-6 flex flex-col items-center">
										<Icon icon={country.flag} class="w-5 h-9 rounded-full"/>
									</div>
									<div class="w-full items-center flex">
										<div class="mx-2 -mt-1  ">{country.name}</div>
									</div>
								</div>
							</div>
						</div>
						{/each}
					</div>	
					{/if}
				</div>
			</div>
			
		</div>
	</div>

	<Cards country={selCountry}/>

</div>
<style>
	.top-250 {margin-top: 200px}
    .top-100 {top: 100%}
    .max-h-select {
        max-height: 300px;
    }
</style>

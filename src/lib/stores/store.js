import { writable, derived } from 'svelte/store';
 
export const countryList = writable([]);

export const listItems = derived(countryList, ($countryList) => {
  const countryCode = ['IN','MV','SG','JP','MY'];
  const countryRate = [{code: 'IN', rate: 76.96, symbol: "carbon:currency-rupee", flag: "emojione:flag-for-india"}, {code: 'MV', rate: 15.42, symbol: "heroicons-solid:currency-bangladeshi", flag: "emojione:flag-for-maldives"},
   {code: 'SG', rate:1.36, symbol: 'carbon:currency-dollar', flag: "emojione:flag-for-singapore"}, {code: 'JP', rate: 115.35, symbol: "bi:currency-yen", flag: "emojione:flag-for-japan"}, 
   {code: 'MY', rate: 4.18, symbol: "mdi:currency-brl", flag: "emojione:flag-for-malaysia"}]
    if ($countryList.data && $countryList.data.countries){
      var i = 0;
      let countries = $countryList.data.countries.filter(item => {
        if(countryCode.includes(item.code)) {
          let rate = countryRate.filter(cRate => cRate.code == item.code);
          item.rate = rate[0].rate;
          item.symbol = rate[0].symbol;
          item.flag = rate[0].flag;
          i++;
          return item;
        }  
      });
      return countries;
    }
    return [];
  });

 
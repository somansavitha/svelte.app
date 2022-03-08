export function conversionRate(price, rate) {
    return (price * rate).toFixed(2);
}

export function trendPercentage(sAmount, fAmount) {
    return (fAmount/sAmount * 100).toFixed(2);
}
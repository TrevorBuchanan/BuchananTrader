
function lerp(a, b, t) {
    return a + t * (b - a)
}

function upTrendForLength(series, length) {
    if (series.length < length) return false;
    for (let i = series.length - length; i < series.length - 1; i++) {
        if (series[i]['price'] >= series[i + 1]['price']) {
            return false;
        }
    }
    return true;
}

function downTrendForLength(series, length) {
    if (series.length < length) return false;
    for (let i = series.length - length; i < series.length - 1; i++) {
        if (series[i]['price'] <= series[i + 1]['price']) {
            return false;
        }
    }
    return true;
}


module.exports = {
    lerp,
    upTrendForLength,
    downTrendForLength,
}
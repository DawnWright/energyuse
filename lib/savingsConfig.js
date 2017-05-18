// interface SavingsQuery {
//     savingsPercent: number,
//     hourRange: {start: number, end: number},
// }

// savingsPercent: percentage (0,1) of savings during the given range
// hourRange: hourly range where savings applies (inclusive at endpoints)
const AirConditionerConfig = {
    savingsPercent: .3,
    hourRange: {start: 13, end: 18},
}

const RefrigeratorConfig = {
    savingsPercent: .1,
    hourRange: {start: 0, end: 23},
}

module.exports = {
    AirConditionerConfig,
    RefrigeratorConfig,
}
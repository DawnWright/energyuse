// Returns configuration data for the expected savings queries.
//
// savingsPercent: percentage (0,1) of savings during the given time range. There
// are no savings outside of this timeframe.
//
// hourRange: hourly range where savings applies (inclusive at endpoints)

const airConditionerConfig = {
    savingsPercent: .3,
    hourRange: {start: 13, end: 18},
}

const refrigeratorConfig = {
    savingsPercent: .1,
    hourRange: {start: 0, end: 23},
}

module.exports = {
    airConditionerConfig,
    refrigeratorConfig,
}

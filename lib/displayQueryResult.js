const QueryTypes = require('./QueryTypes')
const {AirConditionerConfig, RefrigeratorConfig} = require('./savingsConfig')
const {ArgumentError} = require('./ArgumentError')
const {expectedKWhSavings, peakUsage} = require('./query')

// Display only 6 decimals for usage data
const formatUsage = (kwhUsage) => `${kwhUsage.toFixed(6)} kWh`

// Display in military time
const formatHour = (hour) => `${hour}:00`

const displayQueryResult = ({usageData, query, buildingId}) => {
    switch (query) {
        case QueryTypes.peakUsage: {
            const peak = peakUsage({usageData, buildingId})
            return `${formatUsage(peak.kwh_usage)} at ${formatHour(peak.hour)}`
        }
        case QueryTypes.airConditionerSavings: {
            const savings = expectedKWhSavings({usageData, buildingId, savingsConfig: AirConditionerConfig})
            return formatUsage(savings)
        }
        case QueryTypes.refrigeratorSavings: {
            const savings = expectedKWhSavings({usageData, buildingId, savingsConfig: RefrigeratorConfig})
            return formatUsage(savings)
        }
        default:
            throw new ArgumentError(`Unknown <query>: ${query}`)
    }
}

module.exports = displayQueryResult

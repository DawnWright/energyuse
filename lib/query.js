// Helper to find all of the data corresponding to the given building.
const dataForBuilding = ({usageData, buildingId}) => {
    const buildingData = usageData.filter(datum => datum.building_id === buildingId)
    if (!buildingData || buildingData.length <= 0) {
        throw new Error(`${buildingId} not in data set!`)
    }
    if (buildingData.length < 24) {
        throw new Error(`${buildingId} is missing data.`)
    }
    return buildingData
}

// Query for the peak (maximum) usage on a particular building in the data set.
//
// Returns the data point corresponding to the hour with maximum usage.
const peakUsage = ({usageData, buildingId}) => {
    const buildingData = dataForBuilding({usageData, buildingId})
    const maxDataPoint = buildingData.reduce((currentMax, buildingDatum) => {
        return currentMax.kwh_usage > buildingDatum.kwh_usage ? currentMax : buildingDatum
    }, buildingData[0])
    return maxDataPoint
}

const peakUsageHour = ({usageData}) => {
    const totalUsagePerHour = new Array(24).fill(0)
    usageData.forEach(datum => {
        totalUsagePerHour[datum.hour] += datum.kwh_usage
    })
    let maxValue = -Number.MAX_VALUE
    let maxHour = undefined
    totalUsagePerHour.forEach((hourUsage, index) => {
        if (hourUsage > maxValue) {
            maxValue = hourUsage
            maxHour = index
        }
    })
    return {
        kwh_usage: maxValue,
        hour: maxHour,
    }
}

// Helper for computing savings for a given hour range and percentage savings.
//
// Returns the daily savings, in kWh, that we’d expect from installing an
// energy-efficient A/C in the given building, during the given hourly range.
const expectedKWhSavings = ({usageData, buildingId, savingsConfig}) => {
    const {savingsPercent, hourRange} = savingsConfig
    const buildingData = dataForBuilding({usageData, buildingId})
    const afternoonUsage = buildingData
        .filter(buildingDatum => buildingDatum.hour >= hourRange.start && buildingDatum.hour <= hourRange.end)
        .reduce((afternoonTotal, buildingDatum) => afternoonTotal + buildingDatum.kwh_usage, 0)
    const afternoonSavingsRatio = savingsPercent
    return afternoonSavingsRatio * afternoonUsage
}

module.exports = {
    dataForBuilding,
    expectedKWhSavings,
    peakUsage,
    peakUsageHour,
}

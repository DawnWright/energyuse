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

// Replacing an A/C unit has been shown to save 30% of a building’s energy usage
// during the afternoon (12 p.m. to 6 p.m.), with no effect the rest of the time.
//
// Returns the daily savings, in kWh, that we’d expect from installing an
// energy-efficient A/C in the given building.
const expectedKWhSavings = ({usageData, buildingId}) => {
    const buildingData = dataForBuilding({usageData, buildingId})
    const afternoonUsage = buildingData
        .filter(buildingDatum => buildingDatum.hour >= 13 && buildingDatum.hour <= 18)
        .reduce((afternoonTotal, buildingDatum) => afternoonTotal + buildingDatum.kwh_usage, 0)
    const afternoonSavingsRatio = .3
    const afternoonSavings = afternoonSavingsRatio * afternoonUsage
    return afternoonSavings
}

module.exports = {
    dataForBuilding,
    expectedKWhSavings,
    peakUsage,
}

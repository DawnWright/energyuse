const fs = require('fs')
const {ArgumentError} = require('./ArgumentError')

const CsvFieldTypes = {
    buildingId: "building_id",
    hour: "hour",
    kwhUsage: "kwh_usage",
}

const parseFieldValue = ({fieldValue, fieldName}) => {
    switch (fieldName) {
        case CsvFieldTypes.buildingId:
            return fieldValue
        case CsvFieldTypes.hour:
            return parseInt(fieldValue)
        case CsvFieldTypes.kwhUsage:
            return parseFloat(fieldValue)
        default:
            throw new Error(`Unknown CSV field name: ${fieldName}`)
    }
}

const loadFile = (filename) => {
    try {
        return fs.readFileSync(filename, 'utf8')
    } catch (error) {
        if (error.code === 'ENOENT') {
            // File not found. Translate to an ArgumentError so we can print
            // more explicit help to the user.
            throw new ArgumentError(error.message)
        }
        throw error
    }
}

const loadUsageData = (filename) => {
    const fileContents = loadFile(filename)
    if (!fileContents) {
        return []
    }
    const usageData = parseFileContents(fileContents)
    return scrub(usageData)
}

const scrub = (usageData) => {
    return usageData.map(datum => {
        const {building_id} = datum
        const transformedBuildingId = building_id.split(' ').join('_').toLowerCase()
        return {
            building_id: transformedBuildingId,
            hour: datum.hour,
            kwh_usage: datum.kwh_usage,
        }
    })    
}

const parseFileContents = (fileContents) => {
    // Split apart the lines.
    const lineDelimiter = "\n"
    const usageData = fileContents.trim().split(lineDelimiter)

    // In each line, split apart and parse the fields.
    // The first line contains the names of the fields for each line that follows.
    // Remove that line from the data set, then parse each line of data.
    const fieldDelimiter = ","
    const csvHeader = usageData.shift().trim()
    const fieldNames = csvHeader.split(fieldDelimiter)
    if (fieldNames.length !== Object.keys(CsvFieldTypes).length) {
        throw new Error(`CSV header invalid: ${csvHeader}`)
    }
    return usageData.map(datum => {
        datum = datum.trim()
        const fieldValues = datum.split(fieldDelimiter)
        if (fieldValues.length !== fieldNames.length) {
            throw new Error(`Invalid usage data: ${datum}`)
        }
        const usageItem = {}
        fieldValues.forEach((fieldValue, index) => {
            const fieldName = fieldNames[index]
            usageItem[fieldName] = parseFieldValue({fieldValue, fieldName})
        })
        return usageItem
    })
}

module.exports = {
    loadUsageData,
    parseFileContents,
    scrub,
}

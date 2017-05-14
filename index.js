#! /usr/bin/env node

const displayQueryResult = require('./lib/displayQueryResult')
const {ArgumentError, ArgumentErrorType} = require('./lib/ArgumentError')
const {loadUsageData} = require('./lib/loadUsageData')
const {printHelp, readArgs} = require('./lib/cliUtils')

const energyUse = () => {
    try {
        const {filename, query, buildingId} = readArgs()
        const usageData = loadUsageData(filename)
        const result = displayQueryResult({usageData, query, buildingId})
        console.log(result)
    } catch (error) {
        console.error(error.message)
        if (error.type === ArgumentErrorType) {
            printHelp()
        }
        process.exit(1)
    }
}

energyUse()

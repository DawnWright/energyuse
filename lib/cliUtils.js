const QueryTypes = require('./QueryTypes')
const {ArgumentError} = require('./ArgumentError')

const printHelp = () => {
    console.log()
    console.log("usage: energyuse <filepath> <query> <building_id>")
    console.log()
    console.log("\t<filepath> to a CSV describing energy usage")
    console.log(`\t<query> is one of: ${Object.keys(QueryTypes).map(type => QueryTypes[type]).join(', ')}`)
    console.log("\t<building_id> is one of the building IDs in the CSV")
}

const readArgs = () => {
    // In Node.js, first argument is node and second is this executable.
    // Therefore strip those args out to find the user args.
    const userArgs = process.argv.slice(2)

    if (userArgs.length !== 3) {
        throw new ArgumentError("Unknown arguments")
    }

    // args are validated later, as they are consumed.
    //
    // TODO: Consider integrating minimist if more complex arg parsing is
    // needed in future.
    const [filename, query, buildingId] = userArgs
    return {
        filename,
        query,
        buildingId,
    }
}

module.exports = {
    printHelp,
    readArgs,
}

const {expect} = require('chai')
const {parseFileContents, scrubData} = require('../lib/loadUsageData')

describe("parseFileContents", () => {
    it("should convert csv format to objects", () => {
        const buildingData = parseFileContents(`building_id,hour,kwh_usage
            white_house,1,4.898962
            white_house,2,4.725122`
        )
        const expectedBuildingData = [
            { building_id: "white_house", hour: 1, kwh_usage: 4.898962 },
            { building_id: "white_house", hour: 2, kwh_usage: 4.725122 },
        ]
        expect(buildingData).to.eql(expectedBuildingData)
    })

    it("should throw when csv field names don't match", () => {
        expect(() => parseFileContents(`building_id,hou,kwh_usage
            white_house,1,4.898962
            white_house,2,4.725122`
        )).to.throw("Unknown CSV field name: hou")
    })

    it("should throw when incorrect number field names", () => {
        expect(() => parseFileContents(`building_id,kwh_usage
            white_house,1,4.898962
            white_house,2,4.725122`
        )).to.throw("CSV header invalid: building_id,kwh_usage")
    })

    it("should throw when any data point has incorrect number of fields", () => {
        expect(() => parseFileContents(`building_id,hour,kwh_usage
            white_house,4.898962
            white_house,2,4.725122`
        )).to.throw("Invalid usage data: white_house,4.898962")
    })

    describe("scrubData", () => {
        it("should scrub the given data into standard format", () => {
          expect(scrubData([{
              building_id: "White Opera House",
              hour: 3,
              kwh_usage: 3.4,
          }])).to.eql([{
              building_id: "white_opera_house",
              hour: 3,
              kwh_usage: 3.4,
          }])
        })
    })

})

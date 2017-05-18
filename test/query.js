const {expect} = require('chai')
const {dataForBuilding, expectedKWhSavings, peakUsage} = require('../lib/query')
const {parseFileContents} = require('../lib/loadUsageData')

describe("query module", () => {
    const usageData = parseFileContents(`building_id,hour,kwh_usage
        white_house,1,4.898962
        white_house,2,4.725122
        white_house,3,5.889937
        white_house,4,7.055993
        white_house,5,8.147902
        white_house,6,9.526529
        white_house,7,9.654547
        white_house,8,9.497643
        white_house,9,7.656154
        white_house,10,6.922413
        white_house,11,4.821351
        white_house,12,5.117135
        white_house,13,6.103418
        white_house,14,7.221611
        white_house,15,10.372388
        white_house,16,12.876020
        white_house,17,15.434560
        white_house,18,18.041841
        white_house,19,18.205720
        white_house,20,16.776500
        white_house,21,15.114921
        white_house,22,12.123730
        white_house,23,8.830045
        white_house,0,6.439924
        white_museum,1,3.146252
        white_museum,2,2.818647
        white_museum,3,2.856209
        white_museum,4,2.912183
        white_museum,5,3.898217
        white_museum,6,4.244804
        white_museum,7,4.407645
        white_museum,8,3.961966
        white_museum,9,3.501887
        white_museum,10,3.429625
        white_museum,11,2.463888
        white_museum,12,2.150805
        white_museum,13,2.726530
        white_museum,14,3.954946
        white_museum,15,4.920009
        white_museum,16,5.151228
        white_museum,17,6.439517
        white_museum,18,7.830080
        white_museum,19,7.797688
        white_museum,20,7.385189
        white_museum,21,6.687765
        white_museum,22,5.950172
        white_museum,23,4.164074
        white_museum,0,3.175319`
    )

    describe("dataForBuilding", () => {
        it("should return only the data for the given building", () => {
            const buildingData = dataForBuilding({
                buildingId: "white_museum",
                usageData,
            })
            const expectedBuildingData = [
                { building_id: 'white_museum', hour: 1, kwh_usage: 3.146252 },
                { building_id: 'white_museum', hour: 2, kwh_usage: 2.818647 },
                { building_id: 'white_museum', hour: 3, kwh_usage: 2.856209 },
                { building_id: 'white_museum', hour: 4, kwh_usage: 2.912183 },
                { building_id: 'white_museum', hour: 5, kwh_usage: 3.898217 },
                { building_id: 'white_museum', hour: 6, kwh_usage: 4.244804 },
                { building_id: 'white_museum', hour: 7, kwh_usage: 4.407645 },
                { building_id: 'white_museum', hour: 8, kwh_usage: 3.961966 },
                { building_id: 'white_museum', hour: 9, kwh_usage: 3.501887 },
                { building_id: 'white_museum', hour: 10, kwh_usage: 3.429625 },
                { building_id: 'white_museum', hour: 11, kwh_usage: 2.463888 },
                { building_id: 'white_museum', hour: 12, kwh_usage: 2.150805 },
                { building_id: 'white_museum', hour: 13, kwh_usage: 2.72653 },
                { building_id: 'white_museum', hour: 14, kwh_usage: 3.954946 },
                { building_id: 'white_museum', hour: 15, kwh_usage: 4.920009 },
                { building_id: 'white_museum', hour: 16, kwh_usage: 5.151228 },
                { building_id: 'white_museum', hour: 17, kwh_usage: 6.439517 },
                { building_id: 'white_museum', hour: 18, kwh_usage: 7.83008 },
                { building_id: 'white_museum', hour: 19, kwh_usage: 7.797688 },
                { building_id: 'white_museum', hour: 20, kwh_usage: 7.385189 },
                { building_id: 'white_museum', hour: 21, kwh_usage: 6.687765 },
                { building_id: 'white_museum', hour: 22, kwh_usage: 5.950172 },
                { building_id: 'white_museum', hour: 23, kwh_usage: 4.164074 },
                { building_id: 'white_museum', hour: 0, kwh_usage: 3.175319 },
            ]
            expect(buildingData).to.eql(expectedBuildingData)
        })

        it("should throw when the building does not exist in the data set", () => {
            expect(() => dataForBuilding({
                buildingId: "blue_house",
                usageData,
            })).to.throw("blue_house not in data set!")
        })

        it("should throw when the building does not have sufficient data", () => {
            const usageDataMissing = parseFileContents(`building_id,hour,kwh_usage
                white_house,1,4.898962
                white_house,2,4.725122
                white_house,3,5.889937
                white_house,4,7.055993
                white_house,23,8.830045
                white_house,0,6.439924`
            )

            expect(() => dataForBuilding({
                buildingId: "white_house",
                usageData: usageDataMissing,
            })).to.throw("white_house is missing data.")
        })
    })

    describe("peakUsage", () => {
        it("should return the data point corresponding to the hour with maximum usage", () => {
            const buildingId = "white_house"
            const peak = peakUsage({usageData, buildingId})
            expect(peak.building_id).to.equal(buildingId)
            expect(peak.hour).to.equal(19)
            expect(peak.kwh_usage).to.equal(18.20572)
        })
    })

    // describe("expectedKWhSavings", () => {
    //     it("should return the daily savings for replacing with energy efficient A/C", () => {
    //         const buildingId = "white_house"
    //         const savings = expectedKWhSavings({usageData, buildingId})
    //         expect(savings).to.equal(21.014951399999998)
    //     })
    // })
})

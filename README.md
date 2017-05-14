# energyuse

Reads a CSV containing energy usage data for a particular day, and lets the user access a summary of the data from the command line.

```
usage: energyuse <filepath> <query> <building_id>

	<filepath> to a CSV describing energy usage
	<query> is one of: peak_usage,expected_savings
	<building_id> is one of the building IDs in the CSV
```

Example CSV data file:

```
building_id,hour,kwh_usage
white_house,12,0.2
white_house,13,0.14
blue_house,12,0.1
white_house,14,3
blue_house,13,74.5
blue_house,14,0.3
```

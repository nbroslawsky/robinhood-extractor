var fs = require('fs')
var data = require('./export.json')
var results = data.results || []
var overrides = {
	'total_notional': function(data) {
		return data && data.amount
	},
	'executed_notional': function(data) {
		return data && data.amount
	},
	'executions': function(data) {
		var executions = []
			
		for(var i=0; i<data.length; i++) {
			executions.push([
				"Price: " + data[i].price,
				"Quantity: " + data[i].quantity,
				"Settlement Date: " + data[i].settlement_date,
				"Timestamp: " + data[i].timestamp
			].join(', '))
		}
		return executions.join('\n')
	}
}

var keys = Object.keys(results[0])
var output = [keys]
for(var i=0; i<results.length; i++) {
	var r = []
	for(var k=0; k<keys.length; k++) {
		var keyname = keys[k]
		var value = (keyname in overrides) 
			? overrides[keyname](results[i][keyname]) 
			: results[i][keyname]
		r.push('"'+value+'"')
	}
	output.push(r.join(','))
}

fs.writeFileSync('./export.csv', output.join('\n'))
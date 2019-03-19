var fs = require('fs');

var uuid4 = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[x]/gi,()=>{return Math.random().toString(26)[5];})

var defaultcolor = "\x1b[0m";
var Severity = {
	Emergency : {code: 0, name: "Emergency", 	symbol: "X", color: "\x1b[31m"},
	Alert : 	{code: 1, name: "Alert", 		symbol: "A", color: "\x1b[31m"},
	Critical : 	{code: 2, name: "Critical", 	symbol: "C", color: "\x1b[31m"},
	Error : 	{code: 3, name: "Error", 		symbol: "E", color: "\x1b[31m"},
	Warning : 	{code: 4, name: "Warning", 		symbol: "W", color: "\x1b[33m"},
	Notice : 	{code: 5, name: "Notice", 		symbol: "N", color: "\x1b[33m"},
	Info : 		{code: 6, name: "Info", 		symbol: "I", color: "\x1b[37m"},
	Debug : 	{code: 7, name: "Debug", 		symbol: "D", color: "\x1b[36m"}
}

fs.mkdir("logs/", function(err) {});

var filename = `logs/robit-${new Date().toISOString().slice(0,10)}-${uuid4}.log`;

function log(severity, message) {
	var statement = `[${new Date().toISOString()}][${severity.symbol}] ${message}`;
	logToConsole(severity.color, statement);
	logToFile(statement);
}
function logToConsole(color, statement) {
	console.log(`${color}${statement}${defaultcolor}`);
}
function logToFile(statement) {
	fs.writeFile(filename, statement+"\n", {'flag':'a', 'encoding':'utf8'}, function(e) {if (e) {throw e;}});
}

module.exports.id = uuid4;
module.exports.Severity = Severity;
module.exports.log = log;

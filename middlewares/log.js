'use strict'
/**
 * Created by Fred.Lu on 2016/11/8.
 */


var log4js = require('log4js');
var fs = require('fs');

//创建一个日志写入流
var logFileDirectory =  'logs/log_file';
fs.existsSync(logFileDirectory) || fs.mkdirSync(logFileDirectory);
var logDateDirectory = 'logs/log_date';
fs.existsSync(logDateDirectory) || fs.mkdirSync(logDateDirectory);
log4js.configure({
    appenders: [
        {
            "type":"console",
            "category":"console"
        },
        {
            "category":"log_file",
            "type": "file",
            "filename": "logs/log_file/file.log",
            "maxLogSize": 104800,
            "backups": 100
        },
        {
            "category":"log_date",
            "type": "dateFile",
            "filename":"logs/log_date/log",
            "alwaysIncludePattern": true,
            "pattern": "-yyyy-MM-dd.log"

        }
    ],
    replaceConsole: false,   //替换console.log
    levels:{
        "log_file":"ALL",
        "console":"ALL",
        "log_date":"error"
    }
});


var fileLog = log4js.getLogger('log_file');
var consoleLog = log4js.getLogger('console');
var dateLog = log4js.getLogger('log_date');
exports.consoleLogger = consoleLog;
exports.fileLog = fileLog;
exports.dateLog = dateLog;


exports.use = function(app) {

   app.use(log4js.connectLogger(fileLog, {level:'INFO', format:':method   :url   :status'}));
}
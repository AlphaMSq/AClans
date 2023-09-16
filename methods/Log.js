const fs = require('fs');

class Logger {
    static log(...args) {
        Logger.printLog('LOG', ...args);
    }
    
    static info(...args) {
        Logger.printLog('INFO', ...args);
    }
    
    static infoG(...args) {
        Logger.printLog('GLOBAL INFO', ...args);
    }
    
    static warn(...args) {
        Logger.printLog('WARN', ...args);
    }
    
    static error(...args) {
        Logger.printLog('ERROR', ...args);
    }
    
    static fatal(...args) {
        Logger.printLog('FATAL', ...args);
    }    

    static printLog(level, ...args) {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hour = String(now.getHours()).padStart(2, '0');
        const minute = String(now.getMinutes()).padStart(2, '0');
        const second = String(now.getSeconds()).padStart(2, '0');
  
        const logTime = `${year}.${month}.${day}-${hour}:${minute}:${second}`;
        const message = args.map(arg => String(arg)).join(' ');
  
        let decoratedMessage;
        let fileMessage;
        switch (level) {
            case 'LOG':
                decoratedMessage = `\x1b[1m\x1b[33m${logTime} \x1b[37m${level}\x1b[0m \x1b[1m${message}`;// White
                fileMessage = `${level} ${message}`

                break;
            case 'INFO':
                decoratedMessage = `\x1b[1m\x1b[33m${logTime} \x1b[32m${level}\x1b[0m \x1b[1m${message}`;// Green
                fileMessage = `${level} ${message}`
                break;
            case 'GLOBAL INFO':
                decoratedMessage = `\x1b[1m\x1b[33m${logTime} \x1b[32m${level}\x1b[0m \x1b[1m\x1b[36m${message}`;// Green
                fileMessage = `${level} ${message}`
                break;
            case 'WARN':
                decoratedMessage = `\x1b[1m\x1b[33m${logTime} \x1b[33m${level} ${message}`;// Yellow
                fileMessage = `${level} ${message}`
                break;
            case 'ERROR':
                decoratedMessage = `\x1b[1m\x1b[33m${logTime} \x1b[31m${level} ${message}`;// Red
                fileMessage = `${level} ${message}`
                break;
            case 'FATAL':
                decoratedMessage = `\x1b[1m\x1b[33m${logTime} \x1b[35m${level} ${message}`;// Magenta
                fileMessage = `${level} ${message}` 
                break;
            default:
                decoratedMessage = `\x1b[1m\x1b[33m${logTime} \x1b[0m${level}\x1b[0m \x1b[1m${message}`;// Reset color
                fileMessage = `${level} ${message}`
                break;
        }
        console.log(`\x1b[0m${decoratedMessage}\x1b[0m`);
        Logger.writeLogToFile(logTime, fileMessage)
    }

    static writeLogToFile(logTime, message) {
        const logFilePath = './logs/AClans.log';
        const logEntry = `${logTime}: ${message}\n`;
        
        if (!fs.existsSync(logFilePath)) {
            fs.writeFileSync(logFilePath, '', 'utf8');
        }
        
        fs.appendFile(logFilePath, logEntry, (err) => {
            if (err) {
                Logger.error('Ошибка при записи в лог файл:', err);
            }
        });
    }    
}

module.exports = Logger;
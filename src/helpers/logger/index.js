/**
 * Logger helper file
 */
const winston = require('winston');
const { createLogger, format, transports } = winston;
const Sentry = require("winston-transport-sentry-node").default;
const { combine, timestamp, label, printf, colorize, uncolorize } = format;
const { isDevEnv } = require('@utils/index');

// Add label in log statements
// if module is passed as a string then return the string value
// else return the extracted file name from the module object.
function getLabel(module) {
    let label = "";
    if (typeof module === "string") {
      label = module;
    } else if (typeof module === "object") {
      label = (module.filename || "").split("/").slice(-2).join("/");
    }
    return label;
  }
  
// Helps in displaying error stack on stderr.
const enumerateErrorFormat = format((info) => {
    if (info.stack) {
      info.message = `${info.message}\n${info.stack}`;
      Reflect.deleteProperty(info, "stack");
    }
    return info;
  });

// custom console format
const consoleFormat = printf(({ message, label, timestamp }) => {
    return `${message}`;
});

// checks if we want to report sentry events for this or not.
const willNotReport = format((info) => {
  if (Object(info).hasOwnProperty("sendToSentry") && !info.sendToSentry) {
    return false;
  }
  return info;
});


const formatSentryMetadata = format((info) => {
  if (info.metadata) {
    switch (typeof info.metadata) {
      case "object": {
        info.metadata = JSON.stringify(info.metadata);
        break;
      }
    }
  }
  return info;
});


// formats the message so that you can color it.
const formatMessage = format((info) => {
    const { level, message, label, timestamp } = info;
    info.message = `${timestamp} [${label}] ${level}: ${message}`;
    return info;
  });
  
  
const logger = (fileAlias) => {
    const logTransports = [
        new transports.Console({
          level: process.env.LOGGING_LEVEL || "info",
          format: combine(
            label({ label: getLabel(fileAlias) }),
            timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
            enumerateErrorFormat(),
            formatMessage(),
            format.splat(),
            colorize({ all: true }),
            consoleFormat
          ),
          handleExceptions: true,
          stderrLevels: ["error"],
        }),
      ];

      // create new winston logger instance.
    const logger = createLogger({
        transports: logTransports,
        defaultMeta: { service: "index" },
    });

    logger.exitOnError = false;
    
    return logger;
};
module.exports = logger;
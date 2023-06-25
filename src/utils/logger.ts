import { LoggerOptions, config, createLogger, format, transports } from "winston";

export const usersLogger: LoggerOptions = createLogger({
    levels: config.syslog.levels,
    format: format.combine(
        format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
    ),
    transports: [
        new transports.File({ filename: 'users.log' })
    ]
});

export const serverLogger = createLogger({
    format: format.combine(
        format.align(),
        format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
    ),
    transports: [
        new transports.File({ filename: 'transaction.log' })
    ],
});
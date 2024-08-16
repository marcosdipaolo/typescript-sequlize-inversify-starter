import winston, { Logger, format } from "winston";

const { timestamp, combine, printf, label } = format;

const console = new winston.transports.Console({
  format: winston.format.colorize(),
});

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const error = new winston.transports.File({
  filename: "logs/error.log",
  level: "error",
  options: { timestamp: true },
});
const combined = new winston.transports.File({
  filename: "logs/combined.log",
  options: { timestamp: true },
});

export function createLogger(prefix?: string): Logger {
  const logger = winston.createLogger({
    format: combine(
      label({ label: prefix || "global" }),
      timestamp(),
      myFormat,
    ),
    transports: [error, combined],
  });
  if (process.env.NODE_ENV !== "production") {
    logger.add(console);
  }
  return logger;
}

export default createLogger();

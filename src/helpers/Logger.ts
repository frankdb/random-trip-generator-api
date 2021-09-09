const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;
const logLevels = require("../config/LogLevels.json");

export default class Logger {
  private logger: any;
  private label: string;

  constructor(label: string) {
    this.label = label;
    this.logger = createLogger({
      level: "info",
      format: format.json(),
      transports: [new transports.Console()],
    });

    const logFormats = {
      local: format.combine(
        format.timestamp(),
        format.colorize({
          colors: logLevels.colors,
        }),
        format.printf(({ level, message, timestamp }: any) => {
          let _stdout =
            process.env.NODE_ENV === "development" ? `[${timestamp}]` : "";
          (_stdout += this.label ? `[${this.label}]` : ""),
            (_stdout += `[${level}]`);
          _stdout += `${
            typeof message === "object" ? JSON.stringify(message) : message
          }`;
          return _stdout;
        })
      ),
      aws: format.combine(format.json()),
    };
  }

  public error() {
    this.logger.log("error");
  }
}

const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;

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
  }

  public error() {
    this.logger.log("error");
  }
}

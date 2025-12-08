/* eslint-disable no-console -- Allow */

export const LogLevel = {
  NONE: "NONE",
  ERROR: "ERROR",
  WARN: "WARN",
  DEBUG: "DEBUG",
  ALL: "ALL",
} as const;

export type LogLevelType = keyof typeof LogLevel;

const LogLevelNumber: Record<LogLevelType, number> = {
  NONE: 0,
  ERROR: 1,
  WARN: 2,
  DEBUG: 3,
  ALL: 4,
};

interface LoggerOptions {
  prefix?: string;
  level?: LogLevelType;
  showLevel?: boolean;
}

export class Logger {
  private prefix: string;
  private level: LogLevelType;
  private showLevel: boolean;
  private levelNumber: number;

  constructor({ prefix = "", level = "ALL", showLevel = true }: LoggerOptions) {
    this.prefix = prefix;
    this.level = level;
    this.levelNumber = LogLevelNumber[level];
    this.showLevel = showLevel;

    console.log(this.level);
  }

  debug(...args: unknown[]) {
    if (this.canWrite("DEBUG")) {
      this.write("DEBUG", ...args);
    }
  }

  warn(...args: unknown[]) {
    if (this.canWrite("WARN")) {
      this.write("WARN", ...args);
    }
  }

  error(...args: unknown[]) {
    if (this.canWrite("ERROR")) {
      this.write("ERROR", ...args);
    }
  }

  private canWrite(level: LogLevelType): boolean {
    return this.levelNumber >= LogLevelNumber[level];
  }

  private write(level: LogLevelType, ...args: unknown[]) {
    let prefix = this.prefix;

    if (this.showLevel) {
      prefix = `- ${level} ${prefix}`;
    }

    if (level === "ERROR") {
      console.error(prefix, ...args);
    } else {
      console.log(prefix, ...args);
    }
  }
}

export function createLogger(options: LoggerOptions = {}): Logger {
  return new Logger(options);
}

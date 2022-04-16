import { color } from '../common';

export class Logger {
  public static error(message: string): void {
    Logger.log(
      `${color.bgRed('VODYANI-CLI ERROR:')} ${color.red(message)}`,
    );
  }

  public static warn(message: string): void {
    Logger.log(
      `${color.bgYellow('VODYANI-CLI WARNING:')} ${color.yellow(message)}`,
    );
  }

  public static exec(message: string): void {
    Logger.log(
      `${color.bgCyan('VODYANI-CLI EXEC:')} ${color.cyan(message)}`,
    );
  }

  public static success(message: string): void {
    Logger.log(
      `${color.bgGreen('VODYANI-CLI SUCCESS:')} ${color.green(message)}`,
    );
  }

  public static info(message: string): void {
    Logger.log(color.blueBright(message));
  }

  public static log(message: string): void {
    console.log(message);
  }
}

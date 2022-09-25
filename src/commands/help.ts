import { Logger } from '../base';
import { fileTypes, figlet, color } from '../common';

export class HelpHandler {
  public static async outputUsage(): Promise<void> {
    const value = `
    vodyani help             ❓ Get Help.
    vodyani new              🚀 Generating a new application.
    vodyani g <type> [name]  🏭 Generates a file of the specified type.
    vodyani types            📚 Get Help for view the types that can be generated.
    `;

    HelpHandler.outputThank(value);
  }

  public static async outputTypes(): Promise<void> {
    let str = ``;

    fileTypes.forEach(({ type, alias, description }) => {
      str += `|type| ${color.blue(type)}: ${description} (alias => ${color.redBright(alias)})\n`;
    });

    HelpHandler.outputThank(str);
  }

  public static async outputThank(message: string) {
    await new Promise((resolve, reject) => {
      figlet('V O D Y A N I', function(error, data) {
        if (error) {
          reject(error);
        }

        Logger.info(data);
        Logger.info(`\n${message}`);
        Logger.info(`\nFind everything in the documentation: https://vodyani.netlify.app 📚`);

        resolve(null);
      });
    });
  }
}

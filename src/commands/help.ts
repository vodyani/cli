import { Logger } from '../base';
import { figlet } from '../common';

export class HelpHandler {
  public static async outputUsage(): Promise<void> {
    const value = `
    vodyani new       =>  🚀 Create a starter project.
    vodyani api       =>  🔌 Generate complete api modules in the project.
    vodyani domain    =>  🌏 Generate complete domain modules in the project.
    vodyani file      =>  🏭 Generate complete file on demand in the project.
    `;

    HelpHandler.outputThank(value);
  }

  public static async outputThank(message: string) {
    await new Promise((resolve, reject) => {
      figlet('V O D Y A N I', function(error, data) {
        if (error) {
          reject(error);
        }

        Logger.info(data);
        Logger.info(`\n${message}`);
        Logger.info(`\nFind everything in the documentation: https://vodyani.vercel.app 📚`);

        resolve(null);
      });
    });
  }
}

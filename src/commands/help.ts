import { Logger } from '../base';
import { figlet } from '../common';

export class HelpHandler {
  public static async outputUsage(): Promise<void> {
    const value = `
    vodyani new  =>  🚀 Create a starter project.
    vodyani a    =>  🔌 Generate complete api modules in the project.
    vodyani d    =>  🌏 Generate complete domain modules in the project.
    vodyani i    =>  🏭 Generate complete infrastructure modules in the project.
    vodyani f    =>  📚 Generate complete file on demand in the project.
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

import { existsSync } from 'fs';

import { shell } from '../common';
import { Logger, Input } from '../base';

export class CreateProjectHandler {
  private static readonly docs = 'https://github.com/vodyani/vodyani.git';

  public static async download(version: string) {
    const { name } = await Input.getAnswer([{
      message: 'Enter the name you want to create, if the name has more than one word please use `-` split.',
      name: 'name',
      type: 'input',
      default: 'vodyani',
    }]);

    Logger.exec(`Downloading v${version} ...`);

    if (!existsSync(`./${name}`)) {
      shell.exec(`git clone -b ${version} ${CreateProjectHandler.docs} ${name}`);
      shell.exec(`cd ${name} && rm -rf .git`);

      const { isAllow } = await Input.getAnswer([{
        type: 'list',
        message: 'Do you need auto install all?',
        name: 'isAllow',
        default: 'yes',
        choices: [
          'yes',
          'no',
        ],
      }]);

      if (isAllow === 'yes') {
        Logger.exec(`Install all ...`);
        shell.exec(`cd ${name} && npm run install:all`);
      }

      Logger.success(`v${version} Created.`);
    } else {
      Logger.error(`${name} already exists.`);
    }
  }
}

import { existsSync, writeFileSync } from 'fs';

import { Input, Logger } from '../base';
import { shell, commonFiles } from '../common';

export class CommonGenerator {
  public static async build(name: string) {
    const path = `./${name}/common`;

    if (!existsSync(path)) {
      const { isAllow } = await Input.getAnswer([{
        message: 'Do you need build common?',
        name: 'isAllow',
        default: 'no',
        type: 'list',
        choices: [
          'no',
          'yes',
        ],
      }]);

      if (isAllow === 'yes') {
        shell.mkdir(path);

        for (const file of commonFiles) {
          writeFileSync(`${path}/${file}.ts`, '');
        }
      }
    } else {
      Logger.error(`${path}/common already exists.`);
    }
  }
}

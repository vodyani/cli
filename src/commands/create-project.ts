import { existsSync } from 'fs';

import { major } from 'semver';

import { shell } from '../common';
import { Logger, Input } from '../base';

import { HelpHandler } from './help';

export class CreateProjectHandler {
  private static readonly docs = 'https://github.com/vodyani/vodyani.git';

  public static async download(version: string) {
    const { name } = await Input.getAnswer([{
      message: 'Enter the name you want to create, if the name has more than one word please use `-` split.',
      name: 'name',
      type: 'input',
      default: 'vodyani',
    }]);

    const vodyaniVersion = `${major(version)}.x`;

    Logger.exec(`download ${vodyaniVersion} ...`);

    if (!existsSync(`./${name}`)) {
      shell.exec(`git clone -b ${vodyaniVersion} ${CreateProjectHandler.docs} ${name}`);

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
        Logger.exec(`install all ...`);
        shell.exec(`cd ${name} && npm run local`);
      }

      shell.exec(`rm -rf ./${name}/.git`);
      shell.exec(`rm -rf ./${name}/.github`);
      shell.exec(`rm -rf ./${name}/renovate.json`);

      HelpHandler.outputThank(`\n vodyani project: ${name} is created 🎉`);
    } else {
      Logger.error(`${name} already exists.`);
    }
  }
}

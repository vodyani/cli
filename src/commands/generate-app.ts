import { existsSync } from 'fs';

import { shell } from '../common';
import { Logger, Input } from '../base';

import { HelpHandler } from './help';

export class AppGenerator {
  private static readonly docs = 'https://github.com/vodyani/vodyani.git';

  public static async download() {
    const { name } = await Input.getAnswer([{
      message: 'Enter the name you want to create, if the name has more than one word please use `-` split.',
      name: 'name',
      type: 'input',
      default: 'vodyani',
    }]);

    const branchDict = Object({
      'http v8.x': '8.x',
      'http v8.x (with swagger)': '8/with-swagger',
    });

    const { version } = await Input.getAnswer([{
      message: 'Select the version you want to create',
      default: Object.keys(branchDict)[0],
      choices: Object.keys(branchDict),
      name: 'version',
      type: 'list',
    }]);

    const vodyaniVersion = branchDict[version];

    Logger.exec(`download from vodyani ${vodyaniVersion} ...`);

    if (!existsSync(`./${name}`)) {
      shell.exec(`git clone -b ${vodyaniVersion} ${AppGenerator.docs} ${name}`);

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

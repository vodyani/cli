import { existsSync } from 'fs';

import { shell } from '../common';
import { Logger, Input } from '../base';

import { FileGenerator } from './generate-file';

export class InfrastructureGenerator {
  public static async build() {
    const { name } = await Input.getAnswer([{
      message: 'Enter the name you want to create, if the name has more than one word please use `-` split.', name: 'name', type: 'input', default: 'normal',
    }]);

    Logger.exec(`generate ${name} ...`);

    if (!existsSync(`./${name}`)) {
      shell.mkdir(name);

      await InfrastructureGenerator.moduleHandler(name);
      await InfrastructureGenerator.providerHandler(name);

      Logger.success(`${name} infrastructure created.`);
    } else {
      Logger.error(`${name} already exists.`);
    }
  }

  public static async moduleHandler(name: string, isUseName = false) {
    if (isUseName) {
      FileGenerator.write('infrastructure.module', name, 'module');
    } else {
      FileGenerator.write('infrastructure.module', name, `${name}/module`);
    }
  }

  public static async providerHandler(name: string, isUseName = false) {
    if (isUseName) {
      FileGenerator.write('infrastructure.provider', name, `${name}-provider`);
    } else {
      FileGenerator.write('infrastructure.provider', name, `${name}/provider`);
    }
  }
}

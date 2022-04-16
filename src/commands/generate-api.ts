import { existsSync } from 'fs';

import { shell } from '../common';
import { Logger, Input } from '../base';

import { CommonGenerator } from './generate-common';
import { GenerateFileHandler } from './generate-file';

export class ApiGenerator {
  public static async build() {
    const { name } = await Input.getAnswer([{
      message: 'Enter the name you want to create, if the name has more than one word please use `-` split.', name: 'name', type: 'input', default: 'normal',
    }]);

    Logger.exec(`Generate ${name} ...`);

    if (!existsSync(`./${name}`)) {
      shell.mkdir(name);

      await ApiGenerator.controllerHandler(name);
      await ApiGenerator.consumerHandler(name);
      await ApiGenerator.moduleHandler(name);
      await ApiGenerator.dtoHandler(name);
      await ApiGenerator.voHandler(name);
      await CommonGenerator.build(name);

      Logger.success(`${name} Api Module Created.`);
    } else {
      Logger.error(`${name} already exists.`);
    }
  }

  public static async voHandler(name: string) {
    GenerateFileHandler.write('api.vo', 'vo', name);
  }

  public static async dtoHandler(name: string) {
    GenerateFileHandler.write('api.dto', 'dto', name);
  }

  public static async moduleHandler(name: string) {
    GenerateFileHandler.write('api.module', 'module', name);
  }

  public static async consumerHandler(name: string) {
    const { isAllow } = await Input.getAnswer([{
      message: 'Do you need build consumer?',
      name: 'isAllow',
      default: 'no',
      type: 'list',
      choices: [
        'no',
        'yes',
      ],
    }]);

    if (isAllow === 'yes') {
      GenerateFileHandler.write('api.consumer', 'consumer', name);
    }
  }

  public static async controllerHandler(name: string) {
    const { mode } = await Input.getAnswer([{
      message: 'Select the mode to be created',
      name: 'mode',
      default: 'simple',
      type: 'list',
      choices: [
        'simple',
        'full',
      ],
    }]);

    if (mode === 'simple') {
      GenerateFileHandler.write('api.controller.simple', 'controller', name);
    } else {
      GenerateFileHandler.write('api.controller.full', 'controller', name);
    }
  }
}

import { existsSync } from 'fs';

import { shell } from '../common';
import { Logger, Input } from '../base';

import { FileGenerator } from './generate-file';

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

      Logger.success(`${name} Api Created.`);
    } else {
      Logger.error(`${name} already exists.`);
    }
  }

  public static async voHandler(name: string, isUseName = false) {
    if (isUseName) {
      FileGenerator.write('api.vo', name, `${name}-vo`);
    } else {
      FileGenerator.write('api.vo', name, `${name}/vo`);
    }
  }

  public static async dtoHandler(name: string, isUseName = false) {
    if (isUseName) {
      FileGenerator.write('api.dto', name, `${name}-dto`);
    } else {
      FileGenerator.write('api.dto', name, `${name}/dto`);
    }
  }

  public static async moduleHandler(name: string, isUseName = false) {
    if (isUseName) {
      FileGenerator.write('api.module', name, 'module');
    } else {
      FileGenerator.write('api.module', name, `${name}/module`);
    }
  }

  public static async consumerHandler(name: string, isUseName = false) {
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
      if (isUseName) {
        FileGenerator.write('api.consumer', name, `${name}-consumer`);
      } else {
        FileGenerator.write('api.consumer', name, `${name}/consumer`);
      }
    }
  }

  public static async controllerHandler(name: string, isUseName = false) {
    const { mode } = await Input.getAnswer([{
      message: 'Select the complexity of the controller you want to create.',
      name: 'mode',
      default: 'simple',
      type: 'list',
      choices: [
        'simple',
        'full',
      ],
    }]);

    const mustacheName = mode === 'simple' ? 'api.controller.simple' : 'api.controller.full';

    if (isUseName) {
      FileGenerator.write(mustacheName, name, `${name}-controller`);
    } else {
      FileGenerator.write(mustacheName, name, `${name}/controller`);
    }
  }
}

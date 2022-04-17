import { existsSync } from 'fs';

import { shell } from '../common';
import { Logger, Input } from '../base';

import { CommonGenerator } from './generate-common';
import { FileGenerator } from './generate-file';

export class DomainGenerator {
  public static async build() {
    const { name } = await Input.getAnswer([{
      message: 'Enter the name you want to create, if the name has more than one word please use `-` split.', name: 'name', type: 'input', default: 'normal',
    }]);

    Logger.exec(`Generate ${name} Domain ...`);

    if (!existsSync(`./${name}`)) {
      shell.mkdir(name);

      await DomainGenerator.serviceHandler(name);
      await DomainGenerator.managerHandler(name);
      await DomainGenerator.repositoryHandler(name);
      await DomainGenerator.providerHandler(name);
      await DomainGenerator.doHandler(name);
      await DomainGenerator.moduleHandler(name);
      await CommonGenerator.build(name);

      Logger.success(`${name} Domain Created.`);
    } else {
      Logger.error(`${name} already exists.`);
    }
  }

  public static async serviceHandler(name: string, isUseName = false) {
    if (isUseName) {
      FileGenerator.write('domain.service', name, `${name}-service`);
    } else {
      FileGenerator.write('domain.service', name, `${name}/service`);
    }
  }

  public static async managerHandler(name: string, isUseName = false) {
    if (isUseName) {
      FileGenerator.write('domain.manager', name, `${name}-manager`);
    } else {
      FileGenerator.write('domain.manager', name, `${name}/manager`);
    }
  }

  public static async repositoryHandler(name: string, isUseName = false) {
    if (isUseName) {
      FileGenerator.write('domain.repository', name, `${name}-repository`);
    } else {
      FileGenerator.write('domain.repository', name, `${name}/repository`);
    }
  }

  public static async providerHandler(name: string, isUseName = false) {
    if (isUseName) {
      FileGenerator.write('domain.provider', name, `${name}-provider`);
    } else {
      FileGenerator.write('domain.provider', name, `${name}/provider`);
    }
  }

  public static async doHandler(name: string, isUseName = false) {
    if (isUseName) {
      FileGenerator.write('domain.do', name, `${name}-do`);
    } else {
      FileGenerator.write('domain.do', name, `${name}/do`);
    }
  }

  public static async moduleHandler(name: string, isUseName = false) {
    if (isUseName) {
      FileGenerator.write('domain.module', name, 'module');
    } else {
      FileGenerator.write('domain.module', name, `${name}/module`);
    }
  }
}

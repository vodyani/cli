import { readFileSync, writeFileSync } from 'fs';

import { render } from 'mustache';
import { upperFirst, camelCase } from 'lodash';

import { Input, Logger } from '../base';
import { templatePath } from '../common';

import { ApiGenerator } from './generate-api';
import { DomainGenerator } from './generate-domain';

export class FileGenerator {
  public static async build() {
    let name = '';

    const { target } = await Input.getAnswer([
      {
        message: 'Which target do you want to create?',
        name: 'target',
        default: 'api',
        type: 'list',
        choices: [
          'api',
          'default',
          'domain',
          'test',
        ],
      },
    ]);

    ({ name } = await Input.getAnswer([
      {
        message: 'Enter the name you want to create, if the name has more than one word please use `-` split.',
        name: 'name',
        type: 'input',
        default: 'normal',
      },
    ]));

    Logger.exec(`generate ${name} ${target} ...`);

    if (target === 'default') await FileGenerator.selectDefault(name);
    if (target === 'test') FileGenerator.write('test', `${name}.spec`);
    if (target === 'api') await FileGenerator.selectApi(name);
    if (target === 'domain') await FileGenerator.selectDomain(name);

    Logger.success(`${name} created.`);
  }

  public static async selectApi(name: string) {
    const { type } = await Input.getAnswer([{
      message: 'Which type do you want to create?',
      name: 'type',
      default: 'controller',
      type: 'list',
      choices: [
        'controller',
        'consumer',
        'dto',
        'module',
        'vo',
      ],
    }]);

    if (type === 'controller') await ApiGenerator.controllerHandler(name, true);
    if (type === 'consumer') await ApiGenerator.consumerHandler(name, true);
    if (type === 'module') await ApiGenerator.moduleHandler(name, true);
    if (type === 'dto') await ApiGenerator.dtoHandler(name, true);
    if (type === 'vo') await ApiGenerator.voHandler(name, true);
  }

  public static async selectDomain(name: string) {
    const { type } = await Input.getAnswer([{
      message: 'Which type do you want to create?',
      name: 'type',
      default: 'do',
      type: 'list',
      choices: [
        'do',
        'manager',
        'module',
        'provider',
        'repository',
        'service',
      ],
    }]);

    if (type === 'service') await DomainGenerator.serviceHandler(name, true);
    if (type === 'manager') await DomainGenerator.managerHandler(name, true);
    if (type === 'repository') await DomainGenerator.repositoryHandler(name, true);
    if (type === 'provider') await DomainGenerator.providerHandler(name, true);
    if (type === 'module') await DomainGenerator.moduleHandler(name, true);
    if (type === 'do') await DomainGenerator.doHandler(name, true);
  }

  public static async selectDefault(name: string) {
    const { type } = await Input.getAnswer([{
      message: 'Which type do you want to create?',
      name: 'type',
      default: 'filter',
      type: 'list',
      choices: [
        'filter',
        'decorator',
        'guard',
        'interceptor',
        'module',
        'provider',
        'pipe',
      ],
    }]);

    if (type === 'provider') await FileGenerator.providerHandler(name);
    if (type === 'module') FileGenerator.write('file.module', name, 'module');
    if (type === 'pipe') FileGenerator.write('file.pipe', name, `${name}-pipe`);
    if (type === 'guard') FileGenerator.write('file.guard', name, `${name}-guard`);
    if (type === 'filter') FileGenerator.write('file.filter', name, `${name}-filter`);
    if (type === 'decorator') FileGenerator.write('file.decorator', name, `${name}-decorator`);
    if (type === 'interceptor') FileGenerator.write('file.interceptor', name, `${name}-interceptor`);
  }

  public static async providerHandler(name: string) {
    const { mode } = await Input.getAnswer([{
      name: 'mode',
      type: 'list',
      default: 'provider',
      choices: ['provider', 'async-factory-provider'],
      message: 'Select the complexity of the provider you want to create.',
    }]);

    if (mode === 'provider') {
      FileGenerator.write('file.provider', name, `${name}-provider`);
    } else {
      FileGenerator.write('file.provider.factory', name, `${name}-manager`);
    }
  }

  public static write(
    mustacheName: string,
    fileName: string,
    filePath?: string,
    isUpperFirst = true,
  ) {
    const upperName = isUpperFirst ? upperFirst(camelCase(fileName)) : camelCase(fileName);
    const mustachePath = `${templatePath}/${mustacheName}.mustache`;
    const mustacheData = readFileSync(mustachePath, 'utf8');

    const newFilePath = filePath ? `./${filePath}.ts` : `./${fileName}.ts`;
    const newFileData = render(mustacheData, { name: fileName, upperName });

    writeFileSync(newFilePath, `${newFileData}\n`);
  }
}

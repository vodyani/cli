import { existsSync, readFileSync, writeFileSync } from 'fs';

import { render } from 'mustache';
import { upperFirst, camelCase } from 'lodash';

import { Logger } from '../base';
import { fileTypes, templatePath } from '../common';

export class FileGenerator {
  public static async build(options: string, name?: string) {
    const result = fileTypes.find(e => e.alias === options || e.type === options);

    if (result) {
      let fileName = name;
      if (!name) fileName = result.type;
      if (result.type === 'test') fileName += '.spec';

      FileGenerator.write(result.type, name, fileName);

      Logger.success(`${name} created.`);
    } else {
      Logger.error('Creation failed: non-existent options');
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

    if (!existsSync(newFilePath)) {
      writeFileSync(newFilePath, `${newFileData}\n`);
    } else {
      Logger.error('Creation failed: A file with the same name exists in the directory');
    }
  }
}

import { readFileSync, writeFileSync } from 'fs';

import { render } from 'mustache';
import { upperFirst, camelCase } from 'lodash';

import { templatePath } from '../common';

export class GenerateFileHandler {
  public static write(mustache: string, topic: string, name: string) {
    const upperName = upperFirst(camelCase(name));
    const mustachePath = `${templatePath}/${mustache}.mustache`;
    const mustacheData = readFileSync(mustachePath, 'utf8');

    const newFilePath = `./${name}/${topic}.ts`;
    const newFileData = render(mustacheData, { name, upperName });

    writeFileSync(newFilePath, `${newFileData}\n`);
  }
}

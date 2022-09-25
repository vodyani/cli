/* eslint-disable @typescript-eslint/no-var-requires */
import { lt } from 'semver';
import { Command } from 'commander';

import {
  AppGenerator,
  FileGenerator,
  HelpHandler,
} from './commands';
import { Logger } from './base';
import { color } from './common';

export class Launcher {
  constructor(
    private readonly suggestNodeVersion = '16.14.0',
    private readonly currentNodeVersion = process.versions.node,
    private readonly cliVersion = require('../package.json').version,
  ) {
    if (lt(this.currentNodeVersion, this.suggestNodeVersion)) {
      Logger.warn(
        `You are using Node.js version ${this.currentNodeVersion}, Please consider upgrading to Node.js ${this.suggestNodeVersion} or higher.`,
      );
    }
  }

  public run() {
    const program = new Command();

    program
      .version(this.cliVersion, '-v, --verbose', 'Output the current version.')
      .option('-h, --help', 'Output usage information.')
      .usage('[options]');

    program
      .command('help')
      .description(`❓ ${color.cyan('Get Help.')}`)
      .action(HelpHandler.outputUsage);

    program
      .command('new')
      .usage('[command]')
      .description(`🚀 ${color.cyan('Generating a new application.')}`)
      .action(AppGenerator.download);

    program
      .command('g <type> [name]')
      .usage('[command]')
      .description(`🏭 ${color.cyan('Generates a file of the specified type.')}`)
      .action(FileGenerator.build);

    program
      .command('types')
      .description(`📚 ${color.green('Get Help for view the types that can be generated.')}`)
      .action(HelpHandler.outputTypes);

    program.parse(process.argv);
  }
}

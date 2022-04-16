import { inquirer } from '../common';

export class Input {
  public static async getAnswer(questions: any[]) {
    const answers = await inquirer.prompt(questions);
    return answers;
  }
}

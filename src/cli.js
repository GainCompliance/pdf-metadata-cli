import inquirer from 'inquirer';
import {pdfStats} from './index';

async function promptForOptions(options) {
  const defaultReadLocation = 'Local';

  const questions = [];

  questions.push({
    type: 'list',
    name: 'location',
    message: 'Where would you like to read the file from',
    choices: ['Local', 'URL'],
    default: defaultReadLocation
  });

  questions.push({
    type: 'string',
    name: 'path',
    message: 'What is the path you would like to read'
  });

  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    location: options.location || answers.location,
    path: options.path || answers.path
  };
}

export async function cli() {
  const options = await promptForOptions({});

  await pdfStats(options);
}

import * as fs from 'fs';
import inquirer from 'inquirer';
import chalk from 'chalk';

interface VariableChange {
  oldName: string;
  newName: string;
}

function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

function getVariableChanges(content: string): VariableChange[] {
  const regex = /\$[a-z][a-zA-Z0-9]*\b/g;
  const matches = content.match(regex) || [];
  const changes: VariableChange[] = [];
  const processedVariables = new Set<string>();

  matches.forEach(match => {
    if (!processedVariables.has(match)) {
      const snakeCase = camelToSnake(match);
      if (snakeCase !== match) {
        changes.push({ oldName: match, newName: snakeCase });
      }
      processedVariables.add(match);
    }
  });

  return changes;
}

function applyChange(content: string, match: VariableChange): string {
  const regExp = new RegExp(`\\${match.oldName}\\b`, 'g');
  return content.replace(regExp, match.newName);
}

async function convertFile(filePath: string): Promise<void> {
  const content = fs.readFileSync(filePath, 'utf8');
  let convertedContent = content;
  const uniqueMatches = getVariableChanges(content);

  for (const match of uniqueMatches) {
    console.log(`Found variable: ${chalk.magenta(match.oldName)}`);
    console.log(`Suggested change: ${chalk.magenta(match.newName)}`);
    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'applyChange',
        message: chalk.yellow('Do you want to apply this change?'),
        default: false
      }
    ]);
    if (answers.applyChange) {
      convertedContent = applyChange(convertedContent, match)
      console.log('Change applied.\n');
    } else {
      console.log('Change skipped.\n');
    }
  }

  if (convertedContent !== content) {
    fs.writeFileSync(filePath, convertedContent, 'utf8');
    console.log(chalk.green('All changes applied to file.'));
  } else {
    console.log(chalk.green('No changes applied to file.'));
  }
}

async function run(): Promise<void> {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('Please provide a file path');
    process.exit(1);
  }

  await convertFile(filePath);
}

run();

import { execSync } from 'node:child_process';
import inquirer from 'inquirer';

const checkIfBranchExists = (branchName: string): boolean => {
  try {
    execSync(`git rev-parse --verify ${branchName}`);
    return true;
  } catch (error) {
    return false;
  }
};

const promptForBranchChange = async (adaptorName: string) => {
  const currentBranch = execSync('git branch --show-current').toString().trim();

  if (currentBranch === 'main') {
    const branchExists = checkIfBranchExists(adaptorName);

    if (branchExists) {
      console.log(`Branch "${adaptorName}" already exists.`);
    } else {
      const answers = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'createBranch',
          message: `You are on the main branch. Would you like to create and switch to a new branch named "${adaptorName}"?`,
          default: true,
        },
      ]);

      if (answers.createBranch) {
        execSync(`git checkout -b ${adaptorName}`);
        console.log(`Switched to new branch: ${adaptorName}`);
      }
    }
  }
};

export default promptForBranchChange;

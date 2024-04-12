import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

export const handler = async (url: string) => {
  try {
    const { stdout } = await execAsync(`subfinder -d ${url} -silent -nW`);

    const subdomains = stdout.split('\n');

    console.log(subdomains);
  } catch (error) {
    console.log(error);
  }
};

handler('rampart.ao');

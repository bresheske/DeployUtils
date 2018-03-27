let afs = require('async-file');
let exec = require('child_process').exec;
let process = require('process');

import { write } from './write';
import { EOL } from 'os';

export async function killAll(folder:string): Promise<boolean> {
    return new Promise<boolean>(async (res, rej) => {
        // first check if the file/folder exists.
        let exists = await afs.exists(folder);
        if (!exists) {
            write(`Error [KillAll]: Folder does not exist. "${folder}"`, null, false);
            res(false);
        }

        let exepath = `handle64`;
        write(`KillAll: Calling handle in path: ${exepath}`, null, false);

        exec(`${exepath} ${folder} -accepteula`, (err:string, stdout:string, stderr:string) => {
            if (stderr)
                res(false);
            else {
                
                // Filter out explorer.exe.
                let lines = stdout.split(EOL)
                    .filter((l) => !l.startsWith('explorer.exe'))
                    .join(EOL);

                // Grab all of the PIDs of the processes we wish to kill.
                let regexp = /pid:\s(\d+)/g;
                let matches = getMatches(lines, regexp);
                if (!matches || matches.length == 0) {
                    write(`KillAll: Found nothing to kill.`, null, false);
                    res(true);
                }

                // Filter for simply uniqueness.
                matches = matches.filter((e, i) => (matches.indexOf(e) == i));
                write(`KillAll: Found ${matches.length} processes.`, null, false);
                matches.forEach(async (m) => {
                    write(`KillAll: Killing process ${m}.`, null, false);
                    await process.kill(m);
                });
                res(true);
            }
        });
    
    });
}

// utility function to get all the matches in a regex
let getMatches = (string, regex, index?) => {
    index || (index = 1);
    var matches = [];
    var match;
    while (match = regex.exec(string)) {
      matches.push(match[index]);
    }
    return matches;
  }
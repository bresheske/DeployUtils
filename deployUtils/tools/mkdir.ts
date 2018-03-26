let exec = require('child_process').exec;
let afs = require('async-file');

import { write } from './write';

export async function mkdir(folder:string): Promise<boolean> {
    return new Promise<boolean>(async (res, rej) => {

        // first check if the folder doesn't already exist.
        let exists = await afs.exists(folder);
        if (exists) {
            res(true);
        }
        else {
            exec(`mkdir "${folder}"`, (err:string, stdout:string, stderr:string) => {
                if (err)
                    res(false);
                else if (stderr)
                    res(false);
                else
                    res(true);
            });
        }

    });
}
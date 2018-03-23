let fs = require('fs');
let afs = require('async-file');
let ncp = require('ncp').ncp;

import { write } from './write';

export async function copy(file:string, dest:string): Promise<boolean> {
    return new Promise<boolean>(async (res, rej) => {
        // first check if the file/folder exists.
        let exists = await afs.exists(file);
        if (!exists) {
            write(`Error: Attempted to copy file that does not exist. "${file}"`, null, false);
            res(false);
        }
    
        // if we have just 1 file, copy it over.
        let stats = await afs.lstat(file);
        if (stats.isFile()) {
            fs.createReadStream(file).pipe(fs.createWriteStream(dest));
            res(true);
        }
    
        // else if we have a directory, deep copy.
        if (stats.isDirectory()) {
            ncp(file, dest, (err) => {
                if (err && err.length > 0) {
                    write(err, null, false);
                    res(false);
                }
                res(true);
            });
        }
    });
}
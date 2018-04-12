let fs = require('fs');
let afs = require('async-file');
let fse = require('fs-extra');

import { write } from './write';
import { mkdir } from './mkdir';

export async function copy(file:string, dest:string, failonnonexist:boolean = true, filter:(src:string, dest:string) => Promise<boolean> = null): Promise<boolean> {
    return new Promise<boolean>(async (res, rej) => {
        // first check if the file/folder exists.
        let exists = await afs.exists(file);
        if (!exists && failonnonexist) {
            write(`copy: Attempted to copy file that does not exist, marked as failure. "${file}"`, null, false);
            res(false);
            return;
        }
        else if (!exists) {
            write(`copy: Attempted to copy file that does not exist, continuing as normal. "${file}"`, null, false);
            res(true);
            return;
        }
    
        // if we have just 1 file, copy it over.
        let stats = await afs.lstat(file);
        if (stats.isFile()) {
            fs.createReadStream(file).pipe(fs.createWriteStream(dest));
            res(true);
        }
    
        // else if we have a directory, deep copy.
        else if (stats.isDirectory()) {
            try {
                await mkdir(dest);
                fse.copy(file, dest, { filter: filter }, (err) => {
                    if (err) {
                        write(err, null, false);
                        res(false);
                    }
                    res(true);
                })
            }
            catch (err) {
                write(`copy: error copying using ncp. ${err}`, null, false);
                res(false);
            }
        }
    });
}
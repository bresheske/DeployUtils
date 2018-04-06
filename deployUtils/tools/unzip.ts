import { write } from "./write";
import { mkdir } from "./mkdir";

let zip = require('unzipper');
let fs = require('fs');

// Function to unzip a zip file.
export async function unzip(filename:string, destfolder:string) : Promise<boolean> {
    return new Promise<boolean>(async (res, rej) => {
        fs.createReadStream(filename)
            .pipe(zip.Extract({ path: destfolder }))
            .promise()
            .then(() => res(true), (e) => {
                write(`unzip: Error extracting file ${filename}. ${e}`, null, false);
                res(false);
            });
    });
}
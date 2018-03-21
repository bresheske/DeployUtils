let fs = require('async-file');
let zip = require('decompress');

// Function to unzip a zip file.
export async function unzip(filename:string, destfolder:string) : Promise<boolean> {
    await zip(filename, destfolder);
    return true;
}
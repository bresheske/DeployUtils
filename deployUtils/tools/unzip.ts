let zip = require('decompress');

// Function to unzip a zip file.
export async function unzip(filename:string, destfolder:string) : Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
        zip(filename, destfolder).then(() => { res(true); });
    });
}
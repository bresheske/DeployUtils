var fs = require('fs');

export async function copy(file:string, dest:string): Promise<boolean> {
    fs.createReadStream(file).pipe(fs.createWriteStream(dest));
    return true;
}
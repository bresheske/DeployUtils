let fs = require('fs');
let path = require('path');

// This tool unpacks a file from a nexe resource.
// You can add them with the -r option with nexe.
export async function unpack (name:string, dest:string): Promise<boolean> {
    let file = fs.readFileSync(path.resolve(name));
    fs.writeFileSync(dest, file);
    return true;
}
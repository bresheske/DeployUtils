import { write } from "./write";

let fs = require('fs');
let path = require('path');

// This tool unpacks a file from a nexe resource.
// You can add them with the -r option with nexe.
export async function unpack (name:string, dest:string): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
        try {
            let file = fs.readFileSync(path.resolve(name));
            fs.writeFileSync(dest, file);
            res(true);
        }    
        catch {
            write(`unpack: File "${name}" does not exist. You should include it in a nexe build using the -r flag.`, null, false);
            res(false);
        }    
    });
}
let eol = require('os').EOL;
let afs = require('async-file');
let logfile = 'installlog.txt';

// Just a helper function to write colors to the console.
export async function write(text:string, color:string = '\x1b[37m', verbose = true, newline: boolean = true) : Promise<boolean> {
    if (verbose) {
        process.stdout.write(`${color}${text}\x1b[37m`);
        if (newline)
            process.stdout.write(eol);
    }
    await afs.appendFile(logfile, `${text}${eol}`);
    return true;
}
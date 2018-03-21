let eol = require('os').EOL;

// Just a helper function to write colors to the console.
export async function write(text:string, color:string = '\x1b[37m', newline: boolean = true) : Promise<boolean> {
    process.stdout.write(`${color}${text}\x1b[37m`);
    if (newline)
        process.stdout.write(eol)
    return true;
}
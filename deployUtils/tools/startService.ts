import { write } from "./write";

let exec = require('child_process').exec;

export async function startService(name:string): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
        exec(`net start ${name}`, (err:string, stdout:string, stderr:string) => {
            if (err) {
                write(`startService: Could not start "${name}". ${err}`);
                res(false);
            }
            else if (stderr)
                res(false);
            else
                res(true);
        });
    });
}
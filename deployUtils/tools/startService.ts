import { write } from "./write";

let exec = require('child_process').exec;

export async function startService(name:string, failonalreadystarted:boolean = false): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
        exec(`net start ${name}`, (err:string, stdout:string, stderr:string) => {
            if (err) {
                let r = /has already been started/;
                if (r.test(stdout)) {
                    write(`startService: Service "${name}" has already been started.`, null, false);
                    res(!failonalreadystarted);
                }
                else {
                    write(`startService: Could not start "${name}". ${err}`, null, false);
                    res(false);
                }
            }
            else if (stderr)
                res(false);
            else
                res(true);
        });
    });
}
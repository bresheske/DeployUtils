import { write } from './write';
let exec = require('child_process').exec;


export async function stopService(name:string, failonnotstarted:boolean = true, failonnotexist:boolean = true): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
        exec(`net stop "${name}"`, (err:string, stdout:string, stderr:string) => {
            if (err) {
                // check to see if the service
                // - was not started previously.
                // - was not installed previously.
                if (/service is not started./.test(err)) {
                    write(`stopService: service '${name}' was not previously started.`, null, false);
                    res(!failonnotstarted);
                }
                else if (/service name is invalid./.test(err)) {
                    write(`stopService: service '${name}' was not previously installed.`, null, false);
                    res(!failonnotexist);
                }
                else {
                    write(`stopService: service '${name}' failed to stop.`, null, false);
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
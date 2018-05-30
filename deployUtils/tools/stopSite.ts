import { write } from "./write";

let exec = require('child_process').exec;

export async function stopSite(name:string): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
        exec(`%systemroot%\\system32\\inetsrv\\AppCmd.exe stop sites "${name}"`, (err:string, stdout:string, stderr:string) => {
            if (err) {
                write(`stopSite: Error starting site ${name}. ${err}`, null, false);
                res(false);
            }
            else if (stderr) {
                write(`stopSite: Error starting site ${name}. ${stderr}`, null, false);
                res(false);
            }
            else
                res(true);
        });
    });
}
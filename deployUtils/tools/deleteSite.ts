import { write } from "./write";

let exec = require('child_process').exec;
export async function deleteSite(name:string, failonnotexist:boolean=true): Promise<boolean> {
    return new Promise<boolean>(async (res, rej) => {
        exec(`%systemroot%\\system32\\inetsrv\\AppCmd.exe delete site "${name}"`, 
            (err:string, stdout:string, stderr:string) => {
            if (err) {
                let r = /Cannot find SITE object with identifier/;
                if (r.test(stdout)){
                    write(`deleteSite: site ${name} does not exist.`, null, false);
                    res(!failonnotexist);
                }
                else {
                    write(`deleteSite: could not delete site ${name}. ${err}`, null, false);
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
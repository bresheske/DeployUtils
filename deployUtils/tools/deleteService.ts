import { write } from "./write";

let exec = require('child_process').exec;

export async function deleteService(name:string, failonnotexists:boolean=true): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
        exec(`sc delete ${name}`, (err:string, stdout:string, stderr:string) => {
            if (err) {
                let r = /service does not exist as an installed service/;
                if (r.test(stdout)) {
                    write(`deleteService: service "${name}" does not exist.`, null, false);
                    res(!failonnotexists);
                }
                else
                    res(false);
            }
            else if (stderr)
                res(false);
            else
                res(true);
        });
    });
}
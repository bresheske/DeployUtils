import { write } from "./write";

let exec = require('child_process').exec;
export async function newAppPool(name:string, version:string="v4.0", pipeline:string="Integrated", failonduplicate:boolean = true): Promise<boolean> {
    return new Promise<boolean>(async (res, rej) => {
        exec(`%systemroot%\\system32\\inetsrv\\AppCmd.exe add apppool /name:"${name}" /managedRuntimeVersion:"${version}" /managedPipelineMode:"${pipeline}"`, 
        (err:string, stdout:string, stderr:string) => {

            if (err) {
                let r = /duplicate collection element/;
                if (r.test(stdout)) {
                    write(`newAppPool: AppPool ${name} already exists.`, null, false);
                    res(!failonduplicate);
                }
                else {
                    write(`newAppPool: ${err}`, null, false);
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
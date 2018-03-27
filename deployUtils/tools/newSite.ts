import { write } from "./write";

let exec = require('child_process').exec;
export async function newSite(name:string, poolname:string, path:string, bindings:string, failonduplicate:boolean=true): Promise<boolean> {
    return new Promise<boolean>(async (res, rej) => {
        exec(`%systemroot%\\system32\\inetsrv\\AppCmd.exe add site /name:"${name}" /physicalPath:"${path}" /bindings:"${bindings}"`, 
            (err:string, stdout:string, stderr:string) => {
            if (err) {
                if (/duplicate collection element/.test(stdout)) {
                    write(`newSite: Site ${name} already exists.`, null, false);
                    if (failonduplicate)
                        res(false);
                }
                else {
                    write(`newSite: ${err}`, null, false);
                    res(false);
                }
            }
            else if (stderr)
                res(false);
            
            // Now we set the application pool
            exec(`%systemroot%\\system32\\inetsrv\\AppCmd.exe set app "${name}/" /applicationPool:${poolname}`, 
                (err:string, stdout:string, stderr:string) => {
                    if (err) {
                        write(`newSite: Could not set application pool.`, null, false);
                        res(false);
                    }
                    else if (stderr) {
                        res(false);
                    }
                    else {
                        res(true);
                    }

                });
            
        });
    });
}
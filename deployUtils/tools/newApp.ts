import { write } from "./write";

let exec = require('child_process').exec;
export async function newApp(sitename:string, apppool:string, path:string, filepath:string, failonduplicate:boolean=true): Promise<boolean> {
    return new Promise<boolean>(async (res, rej) => {
        exec(`%systemroot%\\system32\\inetsrv\\AppCmd.exe add app /site.name:"${sitename}" /path:"${path}" /physicalPath:"${filepath}" /apppool.name:"${apppool}"`, 
            (err:string, stdout:string, stderr:string) => {
            if (err) {
                if (/duplicate collection element/.test(stdout)) {
                    write(`newApp: App ${sitename} already exists.`, null, false);
                    if (failonduplicate)
                        res(false);
                }
                else {
                    write(`newApp: ${err}`, null, false);
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
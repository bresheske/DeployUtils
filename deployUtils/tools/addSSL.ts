import { write } from "./write";

let exec = require('child_process').exec;

export async function addSSL(port:number, certhash:string, appid:string): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
        exec(`netsh http add sslcert ipport=0.0.0.0:${port} certhash=${certhash} appid=${appid}`, (err:string, stdout:string, stderr:string) => {
            if (err) {
                write(`addSSL: Error adding SSL to port ${port}. ${err}`, null, false);
                res(false);
            }
            else if (stderr) {
                write(`addSSL: Error adding SSL to port ${port}. ${stderr}`, null, false);
                res(false);
            }
            else
                res(true);
        });
    });
}
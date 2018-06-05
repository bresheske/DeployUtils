const execcmd = require('child_process').exec;
import { write } from './write';

export function exec(cmd:string, verbose: boolean = true, failonerror: boolean = true): Promise<boolean> {
    return new Promise((res, rej) => {
        execcmd(cmd, (err:string, stdout:string, stderr:string) => {
            if ((err && err.length > 0) || (stderr && stderr.length > 0)) {
                const e = err || stderr;
                write(`exec: error running command: '${cmd}'. ${e}`);
                res(!failonerror);
            }
            else {
                write(stdout, null, verbose);
                res(true);
            }
        });
    });
}
let exec = require('child_process').exec;

export async function stopService(name:string): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
        exec(`net stop ${name}`, (err:string, stdout:string, stderr:string) => {
            if (err) {
                // check to see if the service was not previously started. If so, not a big deal.
                if (/service is not started./.test(err)) {
                    res(true);
                }
                else {
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
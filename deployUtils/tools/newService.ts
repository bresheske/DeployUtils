let exec = require('child_process').exec;

export async function newService(name:string, exepath:string): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
        exec(`sc create ${name} binpath="${exepath}"`, (err:string, stdout:string, stderr:string) => {
            if (err)
                res(false);
            else if (stderr)
                res(false);
            else
                res(true);
        });
    });
}
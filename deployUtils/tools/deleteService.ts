let exec = require('child_process').exec;

export async function deleteService(name:string, exepath:string): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
        exec(`sc delete ${name}`, (err:string, stdout:string, stderr:string) => {
            if (err)
                res(false);
            else if (stderr)
                res(false);
            else
                res(true);
        });
    });
}
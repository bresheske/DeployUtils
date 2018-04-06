import { write } from "./write";
const web = require('web-request');
const fs = require('fs');

export async function downloadFile(url:string, file:string): Promise<boolean> {
    return new Promise<boolean>(async (res, rej) => {
        try {
            let req = web.stream(url);
            let stream = fs.createWriteStream(file);
            req.pipe(stream);
            await req.response;
            stream.on('finish', () => res(true));
        }
        catch (e) {
            write(`downloadFile: Error downloading file ${url}. ${e}`, null, false);
            res(false);
        }
    });
}
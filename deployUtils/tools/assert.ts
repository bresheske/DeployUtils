import { write } from './write';

export function assert(expression:boolean, errormessage:string): Promise<boolean> {
    return new Promise((res, rej) => {
        if (!expression) {
            write(`assert: ${errormessage}.`, null, false);
            res(false);
        }
        else
            res(true);
    });
}
import { write } from './tools/write';

export class Engine {

    describe(name:string): Build {
        return new Build(name, this);
    }

    async exec(build:Build): Promise<boolean> {

        // Kick out early if we don't have any build steps defined.
        if (!build.steps || build.steps.length == 0) {
            await write(`Warning: No build steps defined for ${build.name}.`);
            return true;
        }

        let result = true;
        write(`${build.name} - ${build.steps.length} steps.`, '\x1b[32m');
        for (let i = 0; i < build.steps.length; i++) {
            let step = build.steps[i];
            let name = `Build Step ${i+1}${step.name ? `: ${step.name}` : ''}`;
            await write(`${name}... `, undefined, false);
            let r = await step.work();
            let text = r ? 'success' : 'failure';
            let color = r ? "\x1b[32m" : "\x1b[31m";
            await write(text, color);
            result = result && r;

            // Kick out early if something broke.
            if (!result) {
                return false;
            }
        }
        return result;
    }
}

export class Build {
    name: string = "";
    engine: Engine;
    steps: Step[] = [];

    constructor(name:string, engine: Engine) {
        this.name = name;
        this.engine = engine;
    }

    step(step: () => Promise<boolean>, name?:string): Build {
        this.steps.push(new Step(step, name));
        return this;
    }

    exec(): Promise<boolean> {
        return this.engine.exec(this);
    }

}

export class Step {
    work: () => Promise<boolean>;
    name?: string;
    constructor(work:() => Promise<boolean>, name?:string) {
        this.work = work;
        this.name = name;
    }
}
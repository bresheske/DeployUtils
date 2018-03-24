# DeployUtils
Designed to be a *very* simple way to deploy a windows application. The tools are written in typescript.

## Usage

1. Include the dependencies.

```
npm i nexe nexe-deploy-utils
```

2. Create a TS or JS main file for your node application, and add in some build steps:

```typescript
import { Engine, write } from 'nexe-deploy-utils';

(async() => {
    let engine = new Engine();
    await engine.describe('my sample package')
        .step(() => write('This is step 1 in the deployment.'))
        .exec();
})();
```

That's it! You can test it by running 'node index.js'. 

## A more Useful Example

Say you had a few steps that looked like this:

```typescript
(async () => {

    let engine = new Engine();
    await engine.describe("Install Example Product")
        .step(() => unpack('./resources/samplezip.zip', 'release.zip'), "Unpacking Release Zip")
        .step(() => unzip('release.zip', 'release'), "Unzipping Release")
        .step(() => copy('release/example.txt', 'release/test.txt'), 'Copying Configuration')
        .step(() => stopService('bthserv'), 'Stopping Bluetooth Service')
        .step(() => startService('bthserv'), 'Starting Bluetooth Service')
        .exec();

})();
```

So in order to create a useful "install.exe", we'll need to tell nexe to package up the zip file inside of our resources folder.  We can do that by the following NPM script:

```json
"build": "nexe -r resources/samplezip.zip -o dist/install.exe"
```

And now we can run 'npm run build' to create our dist/install.exe file.

Running the install.exe as an administrator produces this output:

```
Install Example Product - 5 steps.
Build Step 1: Unpacking Release Zip... success
Build Step 2: Unzipping Release... success
Build Step 3: Copying Configuration... success
Build Step 4: Stopping Bluetooth Service... success
Build Step 5: Starting Bluetooth Service... success
```

And we have successfully deployed our application!

## Features
Similar to 'write', as shown above, other deployment tools exist for the developer.

**copy**: Copies folders and files to a new location.

**deleteService**: Deletes a windows service.

**killAll**: Given a folder, kills all processes that have a handle (or file lock) on the folder's children. This tool uses [handle](https://docs.microsoft.com/en-us/sysinternals/downloads/handle).

**newService**: Adds a new windows service.

**startService**: Starts a windows service.

**stopService**: Stops a windows service.

**unpack**: Unpacks a nexe-packed file inside of your executable to a new location. You can pack a file into your nexe-build executable using the '-r' switch.

**unzip**: Unzips a zip file to a new location.

**write**: Just a simple console logging tool that has some options for colors and newline characters.

More features to come!
# DeployUtils
Designed to be a *very* simple way to deploy a windows application. 

## Usage

1. Edit index.ts and add in the steps you need for your project. Sample code:

```typescript
// Just some simple build steps.
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

2. Add the resource files in the package.json file you wish to include:

```json
"build": "nexe -r resources/samplezip.zip -o dist/install.exe"
```

3. Run the build command:
```bash
npm run build
```

4. Your install.exe has been created in the dist folder. All you need to do is run it (probably with elevated permissions) and the build steps will be executed in order.

You might see output that looks something like this:
```bash
c:\projects\DeployUtils\dist>install.exe
Install Example Product - 5 steps.
Build Step 1: Unpacking Release Zip... success
Build Step 2: Unzipping Release... success
Build Step 3: Copying Configuration... success
Build Step 4: Stopping Bluetooth Service... success
Build Step 5: Starting Bluetooth Service... success

c:\projects\DeployUtils\dist>
```

## Features
All features are stored in the deploysUtils/tools folder.  They contain some async wrappers around some common deployment functions like copying files, unpacking files from the executable, unzipping files, and starting and stopping windows services.  The list is surely to grow!
// Usable objects
import { Engine } from './deployUtils/engine';

// Functions we want.
import { unpack } from './deployUtils/tools/unpack';
import { unzip } from './deployUtils/tools/unzip';
import { write } from './deployUtils/tools/write';
import { copy } from './deployUtils/tools/copy';

// Just some simple build steps.
(async () => {

    let engine = new Engine();
    await engine.describe("Install Example Product")
        .step(unpack('./resources/samplezip.zip', 'release.zip'), "Unpacking Release Zip")
        .step(unzip('release.zip', 'release'), "Unzipping Release")
        .step(copy('release/example.txt', 'release/test.txt'), 'Copying Configuration')
        .exec();

})();
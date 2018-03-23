// Usable objects
import { Engine } from '../deployUtils/engine';

// Functions we want.
import { unpack } from '../deployUtils/tools/unpack';
import { unzip } from '../deployUtils/tools/unzip';
import { write } from '../deployUtils/tools/write';
import { copy } from '../deployUtils/tools/copy';
import { stopService } from '../deployUtils/tools/stopService';
import { startService } from '../deployUtils/tools/startService';

// Just some simple build steps.
(async () => {

    let engine = new Engine();
    await engine.describe("Install Example Product")
        .step(() => unpack('examples/samplezip.zip', 'release.zip'), "Unpacking Release Zip")
        .step(() => unzip('release.zip', 'release'), "Unzipping Release")
        .step(() => copy('release/example.txt', 'release/test.txt'), 'Copying Configuration')
        .step(() => stopService('bthserv'), 'Stopping Bluetooth Service')
        .step(() => startService('bthserv'), 'Starting Bluetooth Service')
        .exec();

})();
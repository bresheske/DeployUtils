// Usable objects
import { Engine } from '../deployUtils/engine';

// Functions we want.
import { unpack } from '../deployUtils/tools/unpack';
import { unzip } from '../deployUtils/tools/unzip';
import { write } from '../deployUtils/tools/write';
import { copy } from '../deployUtils/tools/copy';
import { stopService } from '../deployUtils/tools/stopService';
import { startService } from '../deployUtils/tools/startService';
import { newService } from '../deployUtils/tools/newService';
import { deleteService } from '../deployUtils/tools/deleteService';
import { killAll } from '../deployUtils/tools/killAll';

// Just some simple build steps.
(async () => {

    let engine = new Engine();
    await engine.describe("Install Example Product")
        .step(() => killAll('C:\\projects\\DeployUtils\\npmdist'), "Killing all running processes")
        // .step(() => unpack('examples/samplezip.zip', 'release.zip'), "Unpacking Release Zip")
        // .step(() => unzip('release.zip', 'release'), "Unzipping Release")
        // .step(() => copy('release/example.txt', 'release/test.txt'), 'Copying Configuration')
        // .step(() => copy('release', 'release.1.0.0'), 'Deep Copying Release')
        // .step(() => stopService('fax'), 'Stopping Fax Service')
        // .step(() => deleteService('fax'), 'Deleting Fax Service')
        // .step(() => newService('fax', 'C:\\WINDOWS\\system32\\fxssvc.exe'), 'Creating Fax Service')
        // .step(() => startService('fax'), 'Starting Fax Service')
        // .step(() => stopService('fax'), 'Stopping Fax Service')
        .exec();

})();
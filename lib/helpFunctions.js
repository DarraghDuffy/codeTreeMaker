/* global process, console, module, dirToWalk, destDir, numDirectories, numDirectoriesRemoved,totalDirectories
 */

/*Helper methods*/
 function printHelp () {
    console.error("");
    console.error("CodeTreeMaker.js (c) Darragh Duffy");
    console.error("");
    console.error("usage: ");
    console.error("--help             prints this help");
    console.error("--scan={NAME}      scan the directory {NAME}");
    console.error("");
}

function stats (o) {
    console.log( '--------------------------------------------');
    console.info( 'Source directory              '  + o.dirToWalk );
    console.info( 'Destination directory         '  + o.destDir );
    console.info( 'Created                       '  + o.numDirectories + ' directories');
    console.info( 'Excluded                      '  + o.numDirectoriesRemoved + ' directories');
    console.info( 'Total directories             '  + o.totalDirectories);
    console.timeEnd('Total-Time');
    console.log( '---------------------------------------------');
}

function error (msg) {
    console.error("");
    console.error(msg);
    console.error("");
    process.exit(1);
}

module.exports.printHelp = printHelp;
module.exports.stats = stats;
module.exports.error = error;
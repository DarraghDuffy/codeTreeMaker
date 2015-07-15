/*
Add in come JSHint Globals to pass hint rules.
*/
/* global require, process, console*/

/*Variables and Declarations*/
console.time('Total-Time');
var f = require("file"),
helpLib = "./lib/helpFunctions.js",
options = "./options/options.json",
fs = require("fs"),
h = require(helpLib),
args = require("minimist")(process.argv.slice(2), {string : "scan"}),
ex, allDirs =[],args,exclusions,

o = {
    numDirectoriesRemoved : 0,
    totalDirectories : 0,
    numDirectories : 0,
    dirToWalk : "",
    destDir : ""
};
/*
test if the options file exists, if it cant open
it will throw an error. Not really opening the file
for reading jsut checking it is exists.
*/
try {
    fs.openSync(options,'r', function () {});
} catch(e){
    h.error("unable to locate options.json file");
    process.exit(1);
}
ex = require(options);
o.destDir = ex.destinationDirectory || './codeTree';
exclusions = ex.excluded;
o.dirToWalk = args.scan || ex.scanDirectory || './source';


/*Main Processing Begins
First determine if the help menu needs to be displayed
and then check if the source directory exists
*/
if (args.help ||  !o.dirToWalk ) {
    h.printHelp();
    process.exit(1);
}
if (!fs.existsSync(o.dirToWalk)) {
    h.error("Directory "+o.dirToWalk+" does not exist");
}
/*
Walk the directory and finding all the different directories
determine if they should be included or not
*/
f.walkSync(o.dirToWalk, function (dir) {
    var rootDir = o.dirToWalk,
    startPos = rootDir.length, hasBeenExcluded = false,
    next;
    o.totalDirectories++;

    /*
    filter out excluded list of items, use .some to stop iterating once
    an item has been found to exclude this directory
    */
    hasBeenExcluded = exclusions.some(function (excluded) {
        return  (dir.search(excluded) === -1) ? false : true;
    });
    /*
    determine what to execute next depends on what has been excluded.
    either add to the array and update the number of directories
    or dont add to the array and update the number of directores
    that have been removed
    */
    next = !hasBeenExcluded ?
                function () {
                    allDirs.push(dir.slice(startPos));
                    o.numDirectories++;
                }
                    :
                function () {
                    o.numDirectoriesRemoved++;
                };
    next();
});

/*
Create the directories, checking each has not already been created
*/
allDirs.forEach(function (dir){
    if (!fs.existsSync(o.destDir)) {
        fs.mkdirSync(o.destDir);
    }
    if (!fs.existsSync(o.destDir+dir) ) {
        fs.mkdirSync(o.destDir+dir);
    }
});

h.stats(o);

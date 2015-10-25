# codeTreeMaker
Darragh Duffy

A simple app pointing at a route directory, crawls directory / sub-directories
and creates an exmpty code tree minus all the files, effectively creating a code tree.

##Basic Usage

run command `node codeTreeMaker`

run command `node codeTreeMaker --scan yourDirectory

`node codetreemaker --scan ../codeTest`

##Some Options

./options/options.json

directories are relative to route directory. you can define scan and destination directories by setting following parameters in `options.json`

scanDirectory - you should identify the directory to scan

destinationDirectory - you should define where to place resulting code tree, defaults to code tree



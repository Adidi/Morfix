const fs = require('fs'),
    archiver = require('archiver');

const path = __dirname + '/morfix.zip';
const output = fs.createWriteStream(path);
const archive = archiver('zip', {
    zlib: { level: 9 }
});

// pipe archive data to the file
archive.pipe(output);

archive.glob('**/*.*', {
    cwd: 'src',
    ignore: ['js/**/*.*', 'scss/**/*.*']
});

// finalize the archive (ie we are done appending files but streams have to finish yet)
archive.finalize();

console.log('Successfully created zip at ' + path);
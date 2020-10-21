const fs = require('fs');
const data = require('./data');
var es = require('event-stream');

const streamFile = (stream) => {
   return new Promise((resolve, reject) => {
      const chunks = [];

      // This will wait until we know the readable stream is actually valid before piping
      stream.on('open', function () {
         // This just pipes the read stream to the response object (which goes to the client)
         stream.pipe(es.split())                  //split stream to break on newlines
            .pipe(es.map(function (data, cb) { //turn this async function into a stream
               cb(null, data)
            }))
            .on('data', function (data) {
               chunks.push(data);
            })
            .on('end', function () {
               resolve(chunks.join());
            })
            .on('error', function (err) {
               reject(err);
            })
      });
   });
};

//change this to get id 0 file
const readData = (id) => {
   return new Promise((resolve, reject) => {
      fs.readFile(data.fileList[id], (err, data) => {
         if (err) reject(Error(err));
         console.log('The file has been read!');
         resolve(data.toString());
      });
   });
};

const writeData = (input) => {
   return new Promise((resolve, reject) => {
      fs.writeFile(file, input, (err) => {
         if (err) reject(Error(err));
         resolve(readData());
      });
   });
};

const updateData = (input) => {
   return new Promise((resolve, reject) => {
      fs.appendFile(file, input, (err) => {
         if (err) reject(Error(err));
         resolve(readData());
      });
   });
};

module.exports = {
   readData,
   writeData,
   updateData,
   streamFile
}
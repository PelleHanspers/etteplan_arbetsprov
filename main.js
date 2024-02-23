import { readFile } from 'fs';
import { Parser } from 'xml2js';
import path from 'path';
import { fileURLToPath } from 'url';
import { writeFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function parseXml() {
  var parser = new Parser();
  readFile(__dirname + "/sma_gentext.xml", function (err, data) {
    console.log(err);
    parser.parseString(data, function (err, result) {
      console.log(err);
      console.log("Done");
      findObjects(result);
    });
  });
}

let answer;
async function findObjects(data) {
  let obj = data.root;

  obj.file.forEach(fileObj => {
    fileObj.body.forEach(bodyObj => {
      bodyObj['trans-unit'].forEach(transObj => {
//        console.log(transObj.$.id);
//        console.log(transObj.target);
//        console.log(transObj.source);

        if (parseInt(transObj.$.id) === 42007) {
          console.log(transObj.target);
          answer = transObj.target[0];
          console.log(answer);
          writeToFile(answer);
        }
      })
  //    console.log(bodyObj['trans-unit']);
  })
//  console.log(fileObj.body);
})
  //console.log(obj.file);
}

async function writeToFile(answer) {
  await writeFile(__dirname + '/Output.txt', answer, (err) => {

    if (err) throw err;
    console.log('File has been saved!');
  });
}

parseXml();

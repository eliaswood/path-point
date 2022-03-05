const fs = require('fs');

const data = fs.readFileSync(`./${process.argv[2]}`, 'utf8');
const addQuotes = data.replace(/(['"])?([a-zA-Z0-9_=]+)(['"])?:/g, '"$2":');
const addCommaBracket = addQuotes.replace(/}/g, "},");
const addCommaEqual = addCommaBracket.replace(/t ==/g, 't ==",');
const addCommaQuote = addCommaEqual.replace(/===/g, '"===');
const removeTrailing = addCommaQuote.slice(0, -1);
const addObjBrackets = "{" + removeTrailing + "}";
const parse = JSON.parse(addObjBrackets);

const sortKeys = Object.keys(parse).sort((a, b) => b - a);
const sliceInputAmount = sortKeys.slice(0, process.argv[3]);

if (sortKeys.length < process.argv[3]) {
  throw new Error('Input is larger than data length');
};

const highestNumberList = sliceInputAmount.map(score => {
  if (!parse[score].id) {
    throw new Error('invalid json format No JSON object could be decoded THIS IS NOT JSON');
  };

  return {
    score,
    "id": parse[score].id
  };
});

console.log(highestNumberList);

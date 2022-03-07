const fs = require('fs');

const data = fs.readFileSync(`./${process.argv[2]}`, 'utf8');
const addQuotes = data.replace(/(['"])?([a-zA-Z0-9_=]+)(['"])?:/g, '"$2":');
const addCommas = addQuotes.replace(/\n/g, ",\n");

const addStartQuoteToNonBracket = addCommas.replace(/:\s(?!{|\d|")/g, ': "');

const addEndQuoteToNonBracket = addStartQuoteToNonBracket.replace(/(?<!}|\d|")(,(?!\s\w))/g, '",');
const addObjBrackets = "{" + addEndQuoteToNonBracket + "}";

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
    "score": parseInt(score),
    "id": parse[score].id
  };
});

console.log(JSON.stringify(highestNumberList));

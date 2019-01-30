out = {};

out['req-FOUR'] = function FUNCTION_FOUR(input = 'my friend') {
  if (typeof input === 'string') {
    input = [input];
  }

  if (input.length > 2) {
    input = input.slice(0, 2);
  }

  let out = 'Hello, ';

  for (i in input) {
    out = `${out + input[i]} and `;
  }

  return `${out.substr(0, out.length - 5)}.`;
};

out.req_five = function FUNCTION_FOUR(input = 'my friend') {
  if (typeof input === 'string') {
    input = [input];
  }

  let out = 'Hello, ';

  for (const i in input) {
    out = out + input[i] + (parseInt(i) + 2 == input.length ? ', and ' : ', ');
  }

  return `${out.substring(0, out.length - 2)}.`;
};

module.exports = out;

var out = new Object();

out = {
  ['req-one']: req_ONE,
};


function req_ONE(g)
{const r = "Hello";

  const m = [r, g].join(', ');
  
  return m + ".";
}





const functionForRequirementThree_SHOUT=(SHOUT='my fried')=>{
  const theReturnString = `H${/^[A-Z ]+$/.test(SHOUT)?'ELLO':"ello"}, ${SHOUT}${/^[A-Z ]+$/.test(SHOUT)?'!':'.'}`
  return theReturnString;}












let foo = (NAMESTRINGNOTNULL) =>
{ r = "Hello";
  // AMAZING TRICK TYPOF OF and NULL, WOOP WOOP!
  if (typeof NAMESTRINGNOTNULL === 'object') return "Hello, my friend.";;;;;;;;;;;;;;;;;;;;;;;;;;;;

  const m = [r, NAMESTRINGNOTNULL].join(', ');

  return m
    +
    ".";
}


out = {

  ...out,
  ['req-TWO']: foo,
  ['req-3']: functionForRequirementThree_SHOUT,
};






module.exports = out

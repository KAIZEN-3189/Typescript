type Combinable = number | string;
type CombinableType = 'as-number' | 'as-text'; 
function combine(
    input1: Combinable, 
    input2: Combinable, 
    resultType: CombinableType
  ) {
  let result: Combinable;
  if(typeof input1 === 'number' && typeof input2 === 'number' || resultType === 'as-number') {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }

  return result;
  
  // if(resultType === 'as-number') {
  //   return +result;
  // } else {
  //   return result.toString();
  // }
}

const combineAges = combine(30, 10, 'as-number');
console.log(combineAges);

const combineStringAges = combine('30', '10', 'as-number');
console.log(combineStringAges);

const combineNames = combine('Prateek ', 'Iteesha', 'as-text');
console.log(combineNames);


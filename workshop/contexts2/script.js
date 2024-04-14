hljs.highlightAll();

('use strict');

console.log('\n');
console.log('**************************************************************');
console.log('***  Functional Programming Techniques and Scope Creation  ***');
console.log('**************************************************************');

console.log('\n \n');
console.log('********************************************************');
console.log('***     Factory Function for Partial Application     ***');
console.log('********************************************************');

function createTaxCalculator(taxRate) {
  function calculateTaxAmount(amount) {
    return (taxRate * amount) / 100;
  }
  return calculateTaxAmount;
}

const calcTax1 = createTaxCalculator(10);
console.log(`Tax Amount: ${calcTax1(250)}`);
const calcTax2 = createTaxCalculator(15);
console.log(`Tax Amount: ${calcTax2(1000)}`);

console.log('\n \n');
console.log('********************************************************');
console.log('***  Function Currying (Partial Application) w/bind  ***');
console.log('********************************************************');

function createTaxCalculator2(taxRate, amount) {
  return (taxRate * amount) / 100;
}

calcTax3 = createTaxCalculator2.bind(null, 10);
console.log(`Tax Amount: ${calcTax3(250)}`);
calcTax4 = createTaxCalculator2.bind(null, 15);
console.log(`Tax Amount: ${calcTax4(1000)}`);

console.log('\n \n');
console.log('********************************************************');
console.log('***      Simple Curried Functions using Closures     ***');
console.log('********************************************************');
const multiply = (x, y, z) => x * y * z;

const curriedMultiply = (x) => (y) => (z) => x * y * z;

console.log('Simple Multiply 2 * 3 * 4 = ', multiply(2, 3, 4));
console.log('curriedMultiply(2) = ', curriedMultiply(2));
console.log('curriedMultiply(2)(3) = ', curriedMultiply(2)(3));
console.log('curriedMultiply(2)(3)(4) = ', curriedMultiply(2)(3)(4));

const pizzaIngredients = (ing1) => (ing2) => (ing3) =>
  `${ing1}, ${ing2}, ${ing3}`;
console.log(
  'I want a pizza with',
  pizzaIngredients('cheese')('sausage')('mushrooms')
);

console.log('\n \n');
console.log('********************************************************');
console.log('*** Creating a Private Scope Using an IIFE (old way) ***');
console.log('********************************************************');

let var1 = 4;
let var2 = 3;

(function () {
  let var1 = 7;
  let var2 = 5;
  console.log(`IIFE private value - ${var1 * var2}`);
})();

console.log('\n \n');
console.log('********************************************************');
console.log('***    Creating a Private Scope Using Block Scope    ***');
console.log('********************************************************');

let var3 = 4;
let var4 = 3;

{
  let var3 = 7;
  let var4 = 5;
  console.log(`Block scope private value - ${var3 * var4}`);
}

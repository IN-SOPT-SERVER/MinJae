/**
 * function scope
 */
if (true) {
  var test = "var !";
  console.log(test);
}
console.log(test);

/**
 * block scope
 */
if (true) {
  let test2 = "let !";
  console.log(test2);
}
console.log(test2);

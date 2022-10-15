const test1: number = 7;
console.log(typeof test1, test1);

const test2: string = "31기 서버파트 화이팅!";
console.log(typeof test2, test2);

const test3: boolean = true;
console.log(typeof test3, test3);

const test4: number = 5;

let aaa: number[] = [1, 2];
const arr3: Array<string> = ["h", "a", "d"];

/**
 * Object vs object
 */

const foo1 = (a: Object) => {
  console.log(a);
};

const foo2 = (a: object) => {
  console.log(a);
};

foo1("hello");
// foo2("hello");  //! Argument of type 'string' is not assignable to parameter of type 'object'.

//? null
const a: null = null;
// let oops: null = 2;  //! Type '2' is not assignable to type 'null'.

//? undefined
let b: undefined = undefined;
//let c: undefined = null; //! Type 'null' is not assignable to type 'undefined'.

/**
 * function type
 */
const hi = (name: string): void => {
  console.log(`${name}아 안녕!`);
};

const sum2 = (a: number, b: number): number => {
  return a + b;
};

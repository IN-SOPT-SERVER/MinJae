//^ === 원시 타입 ===

//? Number
let num = 10;
console.log(typeof num);

//?String
//? ES6부터 지원하는 Template literal!
const mbti = "ENFP";
console.log(`제 mbti는 ${mbti}입니다.`);

//? boolean

//? Symbol
const sym1 = Symbol();
const sym2 = Symbol();
const sym3 = Symbol("foo");
const sym4 = Symbol("foo");

console.log(sym1 === sym1); // true

console.log(sym1 === sym2); // false
console.log(sym3 === sym4); // false

//^ === 객체 타입 ===

//? object
const user = {
  name: "강민재",
  age: 24,
  email: "rkdalswo1021@naver.com",
  favorite: ["스시", "피자", "치킨"],
  introduce: function () {
    console.log(`${this.name}입니다. ${this.age}살 이에요`);
  },
  favoriteFoods: function () {
    this.favorite.forEach((food) => {
      console.log(`${food}는 진짜 맛있어!`);
    });
  },
};

//? array

const arr1 = ["강민재", "스시", 24, true];
const arr2 = Array();

arr1.map((item) => console.log(`${item} 무야호!`));

//? function

//& 함수 선언식 (호이스팅에 영향을 받는다)
function hello(name) {
  console.log(`안녕 ${name}`);
}

//& 함수 표현식 (호이스팅에 영향을 받지 않는다)
const sum1 = (num1, num2) => {
  const result = num1 + num2;
  console.log(result);
};

hello("민재");
sum(4, 5);

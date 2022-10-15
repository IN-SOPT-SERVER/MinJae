//* 타입 단언 as

const president: any = "이종현";
const nameLength = (president as string).length;
console.log(nameLength);

//* angle bracket

const vicePresident: any = "현세빈";
const nameLength2 = (<string>vicePresident).length;
console.log(nameLength2);

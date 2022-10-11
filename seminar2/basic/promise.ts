const falseCondition: boolean = false;

//* 최초 생성 시점
const falsePromise = new Promise((resolve, reject) => {
  if (falseCondition) {
    resolve("우와 Promise다!");
  } else {
    reject(new Error("비동기 처리 도중 실패!"));
  }
});

//* 비동기 처리 성공(then), 비동기 처리 실패(catch)
falsePromise
  .then((resolvedData): void => console.log(resolvedData))
  .catch((error): void => console.log(error));

const trueCondition: boolean = true;

//* 최초 생성 시점
const truePromise = new Promise((resolve, reject) => {
  if (trueCondition) {
    resolve("우와 Promise다!");
  } else {
    reject(new Error("비동기 처리 도중 실패!"));
  }
});

//* 비동기 처리 성공(then), 비동기 처리 실패(catch)
truePromise
  .then((resolvedData): void => console.log(resolvedData))
  .catch((error): void => console.log(error));

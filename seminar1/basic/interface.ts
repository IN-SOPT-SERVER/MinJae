interface SOPT {
  name: string;
  age: number;
  isSopt?: boolean;
}

const introduce: SOPT = {
  name: "강민재",
  age: 24,
  isSopt: true,
};

const introduces: SOPT[] = [
  {
    name: "권세훈",
    age: 18,
    isSopt: true,
  },
  {
    name: "최승빈",
    age: 24,
    isSopt: true,
  },
  {
    name: "남지윤",
    age: 23,
    isSopt: true,
  },
];

/**
 * 선택적 프로퍼티
 */
const info: SOPT = {
  name: "강민재",
  age: 24,
};

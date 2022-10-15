interface CodeReviewGroup {
  name: string;
  age: number;
  region: string;
  mbti: string;
  isStaff?: boolean;
  isSopt: boolean;
  OBYB: string;
}

const members: CodeReviewGroup[] = [
  {
    name: "현세빈",
    age: 24,
    region: "신당",
    mbti: "ENTP",
    isStaff: true,
    isSopt: true,
    OBYB: "OB",
  },
  {
    name: "김규원",
    age: 25,
    region: "안암",
    mbti: "ISTP",
    isSopt: true,
    OBYB: "YB",
  },
  {
    name: "강수현",
    age: 24,
    region: "서울역",
    mbti: "INTP",
    isSopt: true,
    OBYB: "OB",
  },
];

members.map((member) =>
  console.log(
    `안녕하세요 ${member.OBYB} ${member.name} 입니다. 나이는 ${member.age} 살입니다. 사는 곳은 ${member.region}이구요, mbti는 ${member.mbti}입니다! 잘 부탁드려요!`
  )
);

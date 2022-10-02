import Dinner from "./interface/Dinner";

const dinner: Dinner = {
  members: [
    {
      name: "권세훈",
      group: "ob",
    },
    {
      name: "강민재",
      group: "ob",
    },
    {
      name: "현세빈",
      group: "ob",
    },
    {
      name: "강수현",
      group: "ob",
    },
    {
      name: "김규원",
      group: "yb",
    },
    {
      name: "최윤한",
      group: "yb",
    },
    {
      name: "천호영",
      group: "yb",
    },
  ],
  shuffle(members) {
    members.sort(() => Math.random() - 0.5);
    return members;
  },
  organize(members) {
    this.shuffle(members);

    const ob = members.find((member) => member.group == "ob");
    const yb = members.find((member) => member.group == "yb");

    console.log(`오늘 서버파트 저녁 모임은 ${ob?.name},${yb?.name} 입니다!`);
  },
};

dinner.organize(dinner.members);

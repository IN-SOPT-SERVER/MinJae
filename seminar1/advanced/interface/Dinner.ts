//import { Members } from "./Members"; default를 안 적은 경우!
import Members from "./Members";

export default interface Dinner {
  members: Members[];
  menu: string[];
  //shuffle(members: Members[]): Members[];
  organize(members: Members[], menu: string[]): void;
}

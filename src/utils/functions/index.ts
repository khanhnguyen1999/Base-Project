import moment, { Moment } from "moment";
export const findPosition = (subMenu: any[], url: string): number[] => {
  const position = subMenu.flatMap((sub: any, indexSub: number) => {
    const indexInList = sub.list.findIndex((itemList: any) => itemList.url === url);
    return indexInList > -1 ? [indexSub, indexInList] : [];
  });
  return position;
};
export const validatePassword = (input: string) => {
  const regForPassword =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/;
  return regForPassword.test(input);
};
export const validatePhone = (input: string) => {
  const regForPhone =
    /^(^\+251|^251|^0)?9\d{8}$/;
  return regForPhone.test(input);
};
export const momentToString = (moment: Moment) => {
  return moment.toISOString();
};
export const stringToMoment = (input: string) => {
  return moment.toString();
};

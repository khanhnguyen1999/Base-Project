import { CLEAR_USER_INFO, SET_USER_INFO } from "@store/actions/user";

import { AnyAction } from "redux";
import { User } from "@core/interfaces";

const userState: User = {} as User;

export default function customer(state = userState, action: AnyAction) {
  switch (action.type) {
  case SET_USER_INFO: {
    const { info } = action.payload;

    return { ...info };
  }
  case CLEAR_USER_INFO: {
    return {};
  }
  default:
    return state;
  }
}

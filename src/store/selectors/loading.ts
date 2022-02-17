import { RootState } from "@core/interfaces";

export const loading_by_action = (action: string) => {
  return (state: RootState) => state.loading[action];
};

export const loading_by_actions = (actions = [] as string[]) => {
  return (state: RootState) => actions.some((action) => state.loading[action]);
};

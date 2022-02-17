import * as actions from "@store/actions/table";

import { AnyAction } from "redux";

export const get_action_table = (identity: string, origin: string) =>
  `${identity}_${origin}`;

const table = (identity: string) => {
  const initialState = {
    ids: [],
    hash: {},
    dataSource: [],
    pagination: {
      total: 0,
      current: 1,
      pageSize: 50,
      pageSizeOptions: ["10", "20", "50", "100"],
      showSizeChanger: true,
    },
  };

  return function(state = initialState, action: AnyAction) {
    switch (action.type) {
    case get_action_table(identity, actions.GET_TABLE_DATA_SOURCE_SUCCESS): {
      const { dataSource, pagination } = action.payload;

      /* Hash data for find item faster */
      const ids = [] as number[];
      const hash = dataSource.reduce(
        (prev: Record<string, any>, data: { id: number }) => {
          ids.push(data.id);
          prev[data.id] = data;
          return prev;
        },
        {},
      );

      return {
        ...state,
        hash,
        ids,
        dataSource,
        pagination: { ...state.pagination, ...pagination },
      };
    }
    default:
      return state;
    }
  };
};

export default table;

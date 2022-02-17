import * as actions from "@store/actions/table";

import { call, put, takeEvery } from "redux-saga/effects";

import { Action } from "@core/interfaces";
import { get_action_table } from "@store/reducers/pattern/table";

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

function* get_table_data_source_worker(
  action: Action<string, actions.GetTableDataSourcePayload>,
) {
  const { identity, api, method, pageIndex, pageSize, sorter, filters } =
    action.payload!;
  yield put({
    type: get_action_table(identity, actions.GET_TABLE_DATA_SOURCE_REQUEST),
  }); // trigger loading

  const newFilters = { ...filters };

  try {
    const params = { pageIndex, pageSize, sorter, filters: newFilters };
    const res: ThenArg<ReturnType<typeof api.getList>> = yield call(
      api[method],
      params,
    );

    const payload = {
      dataSource: res.items,
      pagination: { total: res.total, current: pageIndex, pageSize },
    };
    yield put({
      type: get_action_table(identity, actions.GET_TABLE_DATA_SOURCE_SUCCESS),
      payload,
    });
  } catch (error) {
    yield put({
      type: get_action_table(identity, actions.GET_TABLE_DATA_SOURCE_FAILURE),
    });
  }
}

export function* get_table_data_source_watcher() {
  yield takeEvery(
    actions.GET_TABLE_DATA_SOURCE_REQUEST,
    get_table_data_source_worker,
  );
}

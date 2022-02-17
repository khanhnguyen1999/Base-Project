import { all } from "redux-saga/effects";
import { get_table_data_source_watcher } from "./statics/table";

const rootSaga = (listSagas: any[] = []) =>
  function* () {
    yield all([
      get_table_data_source_watcher(),
      ...listSagas,
    ]);
  };

export default rootSaga;

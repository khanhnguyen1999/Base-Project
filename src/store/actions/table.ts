export const GET_TABLE_DATA_SOURCE_REQUEST = "GET_TABLE_DATA_SOURCE_REQUEST";
export const GET_TABLE_DATA_SOURCE_SUCCESS = "GET_TABLE_DATA_SOURCE_SUCCESS";
export const GET_TABLE_DATA_SOURCE_FAILURE = "GET_TABLE_DATA_SOURCE_FAILURE";

interface ApiFunction {
  [key: string]: any;
  getList: (params: Record<string, any>) => Promise<{ items: any[]; total: number }>;
  deleteByIds?: (ids: string[]) => Promise<{ deletedIds: string[] }>;
}

export interface GetTableDataSourcePayload {
  identity: string;
  api: ApiFunction;
  method: string;
  pageIndex: number;
  pageSize: number;
  sorter: string[];
  filters: Record<string, any>;
  defaultFilters: Record<string, any>;
}

export function get_table_data_source(
  identity: string,
  api: ApiFunction,
  method: string,
  pageIndex: number,
  pageSize: number,
  sorter: string[],
  filters: Record<string, any>,
) {
  return {
    type: GET_TABLE_DATA_SOURCE_REQUEST,
    payload: {
      identity,
      api,
      method,
      pageIndex,
      pageSize,
      sorter,
      filters,
    },
  };
}

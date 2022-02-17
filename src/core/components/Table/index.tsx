import Action, { CustomActions } from "./Action";
import { Modal, Spin, message } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@core/interfaces";
import RootTable from "./RootTable";
import { get_table_data_source } from "@store/actions/table";
import { loading_by_action } from "@store/selectors/loading";
import useTranslate from "@core/hooks/useTranslate";

export interface CommonTableProps {
  columns: any[];
  identity: string;
  rowKeys?: string[];
  rowKeysChange?: (ids: string[]) => void;
  modeRowKeys?: "radio" | "checkbox";
  mappingRowKey?: (record: any) => string | number;
  api: {
    [key: string]: any;
    getList: (
      params: Record<string, any>,
    ) => Promise<{ items: any[]; total: number }>;
    deleteByIds?: (ids: string[]) => Promise<{ deletedIds: string[] }>;
    deleteById?: (id: string) => Promise<{ deletedId: string }>;
  };
  methodList?: string;
  methodDelete?: string;
  methodRestore?: string;
  rowKey?: any;
  defaultPageSize?: number;
  defaultSorter?: string[];
  showSelection?: boolean;
  filters?: Record<string, any>;
  afterDeleteSuccess?: (deletedIds: string[]) => void;
  scroll?: {
    x: number;
    y?: number;
  };
  scrollToFirstRowOnChange?: boolean;
  customActions?: CustomActions[];
  currentId?: string;
  modalVisible?: boolean;
  setVisible?: (bool: boolean) => void;
}

const CommonTable = ({
  columns,
  identity,
  api,
  methodList = "getList",
  methodDelete = "deleteById",
  methodRestore = "restore",
  rowKey,
  defaultPageSize,
  defaultSorter,
  filters = {},
  showSelection = true,
  afterDeleteSuccess,
  scroll,
  scrollToFirstRowOnChange,
  customActions = [],
  currentId,
  modalVisible,
  setVisible,
}: CommonTableProps) => {
  const [t] = useTranslate();

  /* Redux */
  const dispatch = useDispatch();

  /* Selector */
  const loading = useSelector(
    loading_by_action(`${identity}_GET_TABLE_DATA_SOURCE`),
  );

  const { dataSource, pagination } = useSelector((state: RootState) => {
    return state[identity];
  });
  console.log("====", dataSource);
  /* State */
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);

  const get_data = useCallback(
    (pageIndex, pageSize, sorter) => {
      dispatch(
        get_table_data_source(
          identity,
          api,
          methodList,
          pageIndex,
          pageSize,
          sorter,
          filters,
        ),
      );
    },
    [dispatch, identity, api, methodList, JSON.stringify(filters)],
  );
  // const restore = async (id: string) => {
  //   api[methodRestore](id);
  // };
  useEffect(() => {
    // if (currentId) {
    //   restore(`${currentId}`);
    // } else {
    //   restore("1");
    // }
    // api["deleteById"]();
  }, []);
  useEffect(() => {
    const current = 1;
    const pageSize = defaultPageSize;
    get_data(current, pageSize, defaultSorter);
  }, [get_data, defaultPageSize, defaultSorter]);

  // Trigger scroll to top when change pagination, filters, sorter
  useEffect(() => {
    const table = document.querySelector(".ant-table-body");
    if (
      scrollToFirstRowOnChange &&
      !loading &&
      table &&
      table.scrollTop !== 0
    ) {
      table.scrollTop = 0;
    }
  }, [JSON.stringify(pagination), JSON.stringify(filters), defaultSorter]);

  pagination.position = ["bottomCenter"];
  pagination.showTotal = (total: number, range: number[]) =>
    t("table:show_of_row", undefined, {
      range_one: range[0],
      range_two: range[1],
      total,
    });

  const onChangeTable = useCallback(
    (nextPagination, _, nextSorter) => {
      const current = nextPagination.current;
      const pageSize = nextPagination.pageSize;
      let sorter = defaultSorter;

      if (nextSorter.columnKey && nextSorter.order) {
        sorter = [
          nextSorter.columnKey,
          nextSorter.order === "ascend" ? "ASC" : "DESC",
        ];
      }

      get_data(current, pageSize, sorter);
    },
    [get_data, defaultSorter],
  );

  const onSelectRowKeys = (record: any[], selected: boolean) => {
    if (selected) {
      const newSelectedRowKeys = [...selectedRowKeys, record[rowKey]];
      setSelectedRowKeys(newSelectedRowKeys);
      return;
    }

    const newSelectedRowKeys = selectedRowKeys.filter(
      (rowKeyValue) => rowKeyValue !== record[rowKey],
    );
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const onSelectAllRowKeys = (selected: boolean, selectedRows: any[]) => {
    if (selected) {
      const newSelectedRowKeys = selectedRows.map((record) => record[rowKey]);
      setSelectedRowKeys(newSelectedRowKeys);
      return;
    }

    setSelectedRowKeys([]);
  };

  const resetAfterDeleteSuccess = (ids: any[]) => {
    if (afterDeleteSuccess) {
      afterDeleteSuccess(ids);
    }

    setSelectedRowKeys([]);
    get_data(1, defaultPageSize, defaultSorter);
  };
  const onOk = async () => {
    const result = await api[methodDelete](currentId);
    if (result?.deleted) {
      message.success(t("common:delete-success"));
    }
    get_data(1, defaultPageSize, defaultSorter);
    onCancel();
  };
  const onCancel = () => {
    setVisible?.(false);
  };

  return (
    <div className="admin-table">
      <Spin
        className="loading"
        spinning={true}
        style={{ display: loading ? "flex" : "none" }}
      />
      <Action
        t={t}
        selectedRowKeys={selectedRowKeys}
        deleteAction={api[methodDelete]}
        resetAfterDeleteSuccess={resetAfterDeleteSuccess}
        customActions={customActions}
      />
      <RootTable
        rowKey={rowKey}
        columns={columns}
        dataSource={dataSource}
        scroll={scroll}
        // Pagination
        pagination={pagination}
        onChangeTable={onChangeTable}
        // Selection
        showSelection={showSelection}
        selectedRowKeys={selectedRowKeys}
        onSelectRowKeys={onSelectRowKeys}
        onSelectAllRowKeys={onSelectAllRowKeys}
      />
      <Modal
        visible={modalVisible}
        onCancel={onCancel}
        onOk={onOk}
        title={t("modal:title:delete")}
        className="modal-delete"
        okText={t("common:ok")}
        cancelText={t("common:cancel")}
      >
      </Modal>

    </div>
  );
};

CommonTable.defaultProps = {
  methodList: "getList",
  methodDelete: "deleteById",
  rowKey: "id",
  defaultPageSize: 50,
  defaultSorter: ["created_at", "DESC"],
  showSelection: true,
  scroll: {},
  scrollToFirstRowOnChange: true,
};

export default React.memo(CommonTable);

import React from "react";
import { Table } from "antd";

interface RootTableProps {
  rowKey: any;
  columns: any[];
  dataSource: any[];
  pagination: any;
  onChangeTable: any;
  showSelection: boolean;
  selectedRowKeys: any[];
  onSelectRowKeys: (record: any[], selected: boolean, selectedRows: any[]) => void;
  onSelectAllRowKeys: (selected: boolean, selectedRows: any[], changeRows: any[]) => void;
  scroll: any;
}

const RootTable = ({
  rowKey,
  columns,
  dataSource,
  pagination,
  onChangeTable,
  showSelection,
  selectedRowKeys,
  onSelectRowKeys,
  onSelectAllRowKeys,
  scroll,
}: RootTableProps) => {
  // Scroll
  const tableScroll = {
    ...scroll,
    scrollToFirstRowOnChange: false,
  };

  // Pagination
  // const rowSelection = {
  //   fixed: true,
  //   selectedRowKeys,
  //   onSelect: onSelectRowKeys,
  //   onSelectAll: onSelectAllRowKeys,
  // };

  return (
    <Table
      size="small"
      rowKey={(record) => record[rowKey]}
      className="table-striped"
      columns={columns}
      dataSource={dataSource}
      bordered={true}
      pagination={pagination}
      onChange={onChangeTable}
      // rowSelection={showSelection ? rowSelection : undefined}
      scroll={tableScroll}
    />
  );
};

export default React.memo(RootTable);

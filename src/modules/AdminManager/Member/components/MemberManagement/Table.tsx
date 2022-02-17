import { Button, Tag } from "antd";

import { Link } from "react-router-dom";
import Table from "@core/components/Table";
import { TranslateFn } from "@core/hooks/useTranslate";
import { name as identity } from "@modules/AdminManager/Member/reducers/member-management";
import memberApi from "@modules/AdminManager/Member/service/member-management";
import { useState } from "react";

interface Props {
  t: TranslateFn;
  filters: Record<string, any>;
}

const TableMemberManagement = ({ t, filters }: Props) => {
  const [currentId, changeId] = useState<any>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const onPressDeleteCompany = (id: string) => {
    changeId(id);
    setVisible(true);
  };

  const columns = [
    {
      title: t("table:store-business:id"),
      dataIndex: "id",
      width: 50,
    },
    {
      title: "Approval",
      dataIndex: "status",
      width: 100,
      render: (status: string) => (
        <Tag color={status === "ACTIVE" ? "blue" : "yellow"}>{status}</Tag>
      ),
    },
    {
      title: t("common:full-name"),
      dataIndex: "fullName",
      width: 150,
    },
    {
      title: t("common:email"),
      dataIndex: "email",
      width: 250,
    },
    {
      title: t("common:phone-number"),
      dataIndex: "phone",
      width: 150,
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      width: 200,
    },
    {
      title: "Action",
      dataIndex: "none",
      width: 150,
      render: (text: string, record: any) => (
        <>
          <Button className="table-btn" style={{ marginLeft: 5 }}>
            <Link to={`/admin/member/member-management/${record.id}`}>
              {t("common:edit")}
            </Link>
          </Button>
          <Button className="table-btn" style={{ marginLeft: 5 }} onClick={e => onPressDeleteCompany(record.id)}>
            {t("common:delete")}
          </Button>
        </>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      identity={identity}
      api={memberApi}
      filters={filters}
      currentId={currentId}
      modalVisible={visible}
      setVisible={setVisible}
    />
  );
};

export default TableMemberManagement;

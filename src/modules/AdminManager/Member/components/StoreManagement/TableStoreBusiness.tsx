import { Button } from "antd";
import { Link } from "react-router-dom";
import Table from "@core/components/Table";
import { TranslateFn } from "@core/hooks/useTranslate";
import companyApi from "@modules/AdminManager/Member/service/store-bussiness";
import { name as identity } from "@modules/AdminManager/Member/reducers/store-bussiness";
import { useState } from "react";

interface Props {
  t: TranslateFn;
  filters: Record<string, any>;
}

const TableStoreBusiness = ({ t, filters }: Props) => {
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
      fixed: "left",
      width: 150,
    },
    {
      title: t("table:store-business:company-name"),
      dataIndex: "name",
      width: 150,
    },
    {
      title: t("table:store-business:representative"),
      dataIndex: "ceoName",
      width: 150,
    },
    {
      title: t("table:store-business:phone-number"),
      dataIndex: "phone",
      width: 150,
    },
    {
      title: t("table:store-business:contact-email"),
      dataIndex: "email",
      width: 150,
    },
    {
      title: t("table:store-business:contact-person"),
      dataIndex: "number",
      width: 150,
    },
    {
      title: t("table:store-business:registration-date"),
      dataIndex: "createdAt",
      width: 150,
    },
    {
      title: t("table:store-business:management"),
      dataIndex: "none",
      render: (text: string, record: any) => (
        <>
          <Button className="table-btn" style={{ marginLeft: 5 }}>
            <Link to={`/admin/member/storemanager/${record.id}`}>
              {t("table:correction")}
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
    <div className="table-store-business">
      <Table
        columns={columns}
        identity={identity}
        api={companyApi}
        filters={filters}
        scroll={{ x: 1300 }}
        customActions={[
          {
            text: t("table:excel-download"),
            icon: <img src="/icons/icon_excel.png" />,
            action: () => { },
          },
        ]}
        currentId={currentId}
        modalVisible={visible}
        setVisible={setVisible}
      />
    </div>
  );
};

export default TableStoreBusiness;

import { Button, Tag } from "antd";

import { Link } from "react-router-dom";
import Table from "@core/components/Table";
import { TranslateFn } from "@core/hooks/useTranslate";
import basicSettingApi from "@StoreManager/Preferences/services/basic-setting";
import { name as identity } from "@StoreManager/Preferences/reducers/basic-setting";
import { useState } from "react";

interface Props {
  t: TranslateFn;
  filters: Record<string, any>;
}

const ListTable = ({ t, filters }: Props) => {
  const [currentId, changeId] = useState<any>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const onPressDeleteRegistration = (id: string) => {
    changeId(id);
    setVisible(true);
  };
  const typeOptions = [
    {
      value: 10,
      label: t("company:basic-setting:purchase"),
    },
    {
      value: 20,
      label: t("company:basic-setting:possible"),
    },
    {
      value: 30,
      label: t("company:basic-setting:not-possible"),
    },
  ];

  const columns = [
    {
      title: t("product:category:table:NO"),
      dataIndex: "id",
      width: 50,
    },
    {
      title: t("company:basic-setting:registration-category"),
      dataIndex: "type",
      render: (type: number) => {
        const typeName = typeOptions.filter((item: any) => item.value === type);
        return <div>{typeName[0].label}</div>;
      },
      width: 300,
    },
    {
      title: t("company:basic-setting:basic-exposure"),
      dataIndex: "isDefault",
      render: (isDefault: boolean) =>
        isDefault ? (
          <Tag color="grey">Select</Tag>
        ) : (
          <Tag color="blue">Basic</Tag>
        ),
    },
    {
      title: t("common:title"),
      dataIndex: "title",
      width: 300,
    },
    {
      title: t("company:basic-setting:last-modified-exposure"),
      dataIndex: "updatedAt",
    },
    {
      title: t("common:registration-date"),
      dataIndex: "createdAt",
    },
    {
      title: t("table:store-business:management"),
      dataIndex: "management",
      render: (text: string, record: any) => (
        <>
          <Button size="small">
            <Link to={`/company/preferences/product-usage-infor/${record.id}`}>
              {t("common:edit")}
            </Link>
          </Button>
          <Button
            className="table-btn"
            size="small"
            style={{ marginLeft: 5 }}
            onClick={(e) => onPressDeleteRegistration(record.id)}
          >
            {t("common:delete")}
          </Button>
        </>
      ),
      width: 150,
    },
  ];

  return (
    <Table
      filters={filters}
      columns={columns}
      identity={identity}
      api={basicSettingApi}
      currentId={currentId}
      modalVisible={visible}
      setVisible={setVisible}
    />
  );
};

export default ListTable;

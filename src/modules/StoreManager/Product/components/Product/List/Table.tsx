import { Button, Tag } from "antd";

import Avatar from "@core/components/Avatar";
import { Link } from "react-router-dom";
import Table from "@core/components/Table";
import { TranslateFn } from "@core/hooks/useTranslate";
import { name as identity } from "@StoreManager/Product/reducers/products";
import productApi from "@StoreManager/Product/services/products";

interface Props {
  t: TranslateFn;
  filters: Record<string, any>;
}

const ListTable = ({ t, filters }: Props) => {
  const columns = [
    {
      title: t("table:company:exposure"),
      dataIndex: "view",
      render: (view: string) => (
        <Tag color="blue">
          {t(`common:${view === "Y" ? "show" : "hidden"}`)}
        </Tag>
      ),
    },
    {
      title: t("table:company:product-code"),
      dataIndex: "code",
      width: 175,
    },
    {
      title: t("table:company:product-name"),
      dataIndex: "name",
      width: 200,
    },
    {
      title: t("table:company:image"),
      dataIndex: "img_list_square",
      render: (image: string) => <Avatar src={image} />,
    },
    {
      title: t("table:company:price"),
      dataIndex: "price",
    },
    {
      title: t("table:company:stock"),
      dataIndex: "stock",
    },
    {
      title: t("common:registration-date"),
      dataIndex: "created_at",
    },
    {
      title: t("table:store-business:management"),
      dataIndex: "management",
      render: (text: string, record: any) => (
        <>
          <Button size="small">
            <Link to={`/company/product-registration/${record.id}`}>
              {t("common:edit")}
            </Link>
          </Button>
        </>
      ),
    },
  ];

  return (
    <Table
      filters={filters}
      columns={columns}
      identity={identity}
      api={productApi}
    />
  );
};

export default ListTable;

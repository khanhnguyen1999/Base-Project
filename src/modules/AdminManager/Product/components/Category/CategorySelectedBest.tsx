import { Button, Table, Typography } from "antd";

import Avatar from "@core/components/Avatar";
import { TranslateFn } from "@core/hooks/useTranslate";
import { useState } from "react";

interface Props {
  t: TranslateFn;
  title: string;
  name: string;
}

const { Title } = Typography;

const CategorySelectedBest = ({ t, title, name }: Props) => {
  const columns = [
    {
      title: `${t("product:category:table:NO")}`,
      dataIndex: "no",
      key: "no",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: `${t("product:category:table:image")}`,
      dataIndex: "image",
      key: "image",
      render: (text: string, record: any) => <Avatar size={64} src={record.image} />,
    },
    {
      title: `${t("product:category:table:product-name")}`,
      dataIndex: "product_name",
      key: "product_name",
      width: 350,
    },
    {
      title: `${t("product:category:table:product-price")}`,
      dataIndex: "product_price",
      key: "product_price",
    },
    {
      title: `${t("product:category:table:stock")}`,
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: `${t("product:category:table:supplier")}`,
      dataIndex: "supplier",
      key: "supplier",
    },
    {
      title: `${t("product:category:table:PC")}`,
      dataIndex: "PC",
      key: "PC",
    },
    {
      title: `${t("product:category:table:Mobile")}`,
      dataIndex: "Mobile",
      key: "Mobile",
    },
  ];

  const data = [
    {
      key: "1",
      no: "1",
      image: "https://img-19.ccm2.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg",
      product_name: "Cosa Suede Middle Heel/ Beige",
      product_price: "12.000",
      stock: "normal",
      supplier: "Hisense 3.0",
      PC: "exposure",
      Mobile: "exposure",
    },
    {
      key: "2",
      no: "2",
      image: "https://img-19.ccm2.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg",
      product_name: "John Brown",
      product_price: "10.000",
      stock: "normal",
      supplier: "Hisense 3.0",
      PC: "exposure",
      Mobile: "exposure",
    },
    {
      key: "3",
      no: "3",
      image: "https://img-19.ccm2.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg",
      product_name: "John Brown",
      product_price: "12.000",
      stock: "normal",
      supplier: "Hisense 3.0",
      PC: "exposure",
      Mobile: "exposure",
    },
  ];
  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (selectedRowKeys: any) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div className="selected-best-product">
      <Title level={5}>{title}</Title>
      <Table pagination={false} rowSelection={rowSelection} bordered columns={columns} dataSource={data} />
      <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
        {t("common:delete")}
      </Button>
    </div>
  );
};

export default CategorySelectedBest;

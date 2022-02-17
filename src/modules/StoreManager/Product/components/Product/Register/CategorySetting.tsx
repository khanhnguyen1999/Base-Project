import {
  Button,
  Cascader,
  Descriptions,
  Form,
  Table,
} from "antd";
import { useEffect, useState } from "react";

import { TranslateFn } from "@core/hooks/useTranslate";
import categoriesApi from "@AdminManager/Product/service/categories";

interface Props {
  t: TranslateFn;
  categoriesHierarchy: any[];
  addCategoriesHierarchy: () => void;
}

const ProductCategorySetting = ({
  t,
  categoriesHierarchy,
  addCategoriesHierarchy,
}: Props) => {
  /* State */
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    categoriesApi
      .getList()
      .then((res) => {
        setCategories(res.rows);
      })
      .catch((e) => {});
  }, []);

  const columns = [
    {
      title: t("common:name"),
      render: (value: any, record: any) => {
        return (
          <Form.Item>
            <Cascader
              defaultValue={record}
              options={categories}
              fieldNames={{ value: "id", label: "name" }}
              disabled={true}
            />
          </Form.Item>
        );
      },
    },
    {
      title: t("common:action"),
      width: 200,
      render: (index: number) => (
        <Button size="small">{t("common:delete")}</Button>
      ),
    },
  ];

  return (
    <div className="product-category-setting">
      <Descriptions
        bordered
        title={t("common:filter:product-category-setting")}
        size="small"
      >
        <Descriptions.Item label={t("common:filter:category")}>
          <div className="d-flex">
            <Form.Item name="category">
              <Cascader
                options={categories}
                fieldNames={{ value: "id", label: "name" }}
              />
            </Form.Item>
            <Button type="primary" onClick={addCategoriesHierarchy}>
              {t("common:add")}
            </Button>
          </div>
          <Table
            rowKey={(record) => record.join("-")}
            dataSource={categoriesHierarchy}
            columns={columns}
            pagination={false}
          />
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default ProductCategorySetting;

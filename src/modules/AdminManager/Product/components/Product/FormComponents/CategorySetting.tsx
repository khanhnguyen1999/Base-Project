import {
  Button,
  Cascader,
  Descriptions,
  Form,
  Modal,
  Table,
} from "antd";
import { useEffect, useState } from "react";

import { TranslateFn } from "@core/hooks/useTranslate";
import categoryApi from "@modules/AdminManager/Product/service/categories";

interface Props {
  t: TranslateFn;
  categoriesHierarchy: any[];
  addCategoriesHierarchy: () => void;
  removeCategoriesHierarchy: (index: number) => void;
}

const ProductCategorySetting = ({
  t,
  categoriesHierarchy,
  addCategoriesHierarchy,
  removeCategoriesHierarchy,
}: Props) => {
  /* State */
  const [categories, setCategories] = useState([]);
  const [indexToDelete, setIndex] = useState<number>(-1);
  const [modalVisible, setVisible] = useState(false);
  const onOk = () => {
    removeCategoriesHierarchy(indexToDelete);
    onCancel();
  };
  const onCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    categoryApi
      .getList()
      .then((res) => {
        setCategories(res);
      })
      .catch((e) => { });
  }, []);
  const onPressDeleteCategory = (index: number) => {
    setIndex(index);
    setVisible(true);
  };

  const getCategoryNameByRecursive: any = (arrInitial: any[], arrSearch: number[]) => {
    const id = arrSearch.shift();
    const cate = arrInitial.find((item: any) => item.id === id);
    if (cate && cate.children) {
      const hierarchyName = getCategoryNameByRecursive(cate.children, arrSearch);
      return cate.name + (hierarchyName === "" ? "" : ` > ${hierarchyName}`);
    }
    return "";
  };
  const columns = [
    {
      title: t("common:name"),
      render: (value: any, record: any) => {
        const recordAlias = [...record];
        const cateJoinName = getCategoryNameByRecursive(categories, recordAlias);
        return (
          <Form.Item>
            {cateJoinName}
          </Form.Item>
        );
      },
    },
    {
      title: t("common:action"),
      width: 200,
      render: (text: string, record: any, index: number) => (
        <Button size="small" onClick={(e) => onPressDeleteCategory(index)}>{t("common:delete")}</Button>
      ),
    },
  ];
  return (
    <>
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
            &nbsp;
            <Button type="primary" onClick={addCategoriesHierarchy}>
              {t("common:add")}
            </Button>
          </div>
          <div className="product-registration-inner">
            <Table
              rowKey={(record) => record.join("-")}
              dataSource={categoriesHierarchy}
              columns={columns}
              pagination={false}
            />
          </div>
        </Descriptions.Item>
      </Descriptions>
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
    </>
  );
};

export default ProductCategorySetting;

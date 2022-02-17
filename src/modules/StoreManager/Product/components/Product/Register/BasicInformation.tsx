import { Descriptions, Form, Input, InputNumber } from "antd";
import { useEffect, useState } from "react";

import Selector from "@core/components/Input/Selector";
import { TranslateFn } from "@core/hooks/useTranslate";
import selectorApi from "@StoreManager/Product/services/options-for-selector";

const layoutInput = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

interface Props {
  t: TranslateFn;
}

const ProductBasicInformation = ({ t }: Props) => {
  /* State */
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    selectorApi
      .getBrands()
      .then((res) => {
        setBrands(res.rows);
      })
      .catch((e) => {});
  }, []);

  return (
    <div className="product-basic-information">
      <Descriptions
        bordered
        title={t("common:filter:product-basic-information")}
        size="small"
        column={2}
      >
        <Descriptions.Item span={2} label={t("common:filter:product-code")}>
          <Form.Item name="code">
            <Input />
          </Form.Item>
        </Descriptions.Item>
        <Descriptions.Item span={2} label={t("common:filter:brand")}>
          <Selector
            name="brand"
            data={brands}
            fieldNames={{ value: "id", label: "name" }}
          />
        </Descriptions.Item>
        <Descriptions.Item span={2} label={t("common:filter:product-name")}>
          <Form.Item
            name="name"
            rules={[{ required: true }]}
            {...layoutInput}
            label={t("common:filter:product-representative")}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="sub_name"
            {...layoutInput}
            label={t("common:filter:product-additional")}
          >
            <Input />
          </Form.Item>
        </Descriptions.Item>
        <Descriptions.Item span={2} label={t("common:filter:product-price")}>
          <div className="product-basic-information-price">
            <Form.Item
              name="normal_price"
              {...layoutInput}
              label={t("common:filter:product-normal-price")}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              name="price"
              {...layoutInput}
              label={t("common:filter:product-price")}
            >
              <InputNumber />
            </Form.Item>
          </div>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default ProductBasicInformation;

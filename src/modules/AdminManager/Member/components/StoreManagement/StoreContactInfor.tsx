/* eslint-disable react/jsx-no-undef */

import { Descriptions, Form, Input } from "antd";

import { CheckOutlined } from "@ant-design/icons";
import { TranslateFn } from "@core/hooks/useTranslate";

interface Props {
  t: TranslateFn;
}

const StoreAccountInfor = ({ t }: Props) => {
  /* State */
  return (
    <Descriptions
      title={t("company:title:contact")}
      bordered
      column={2}
      size="small"
    >
      <Descriptions.Item label={t("company:manager")}>
        <Form.Item name="manager">
          <Input />
        </Form.Item>
      </Descriptions.Item>
      <Descriptions.Item label={t("company:cellphone")}>
        <Form.Item name="cellPhone">
          <Input />
        </Form.Item>
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <>
            {t("company:email")}
            <CheckOutlined />
          </>
        }>
        <Form.Item name="email"
          rules={[
            {
              required: true,
              message: t("validate:required", undefined, {
                value: t("company:email"),
              }),
            },
            {
              whitespace: true,
              message: t("validate:required", undefined, {
                value: t("common:email"),
              }),
            },
            {
              type: "email",
              message: t("validate:input-not-valid", undefined, {
                value: t("common:email"),
              }),
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Descriptions.Item>
    </Descriptions>
  );
};

export default StoreAccountInfor;

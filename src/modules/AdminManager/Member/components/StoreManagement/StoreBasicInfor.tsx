/* eslint-disable react/jsx-no-undef */

import { CheckOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Descriptions, Form, Input } from "antd";
import { validatePassword, validatePhone } from "@utils/functions";

import { TranslateFn } from "@core/hooks/useTranslate";

interface Props {
  t: TranslateFn;
  handleOpenModal: () => void;
}
const StoreBasicInfor = ({ t, handleOpenModal }: Props) => {
  /* State */
  // const validatePassword = (input: string) => {
  //   const regForPassword =
  //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/;
  //   return regForPassword.test(input);
  // };
  // const validatePhone = (input: string) => {
  //   const regForPhone =
  //     /^(^\+251|^251|^0)?9\d{8}$/;
  //   return regForPhone.test(input);
  // };
  return (
    <Descriptions
      title={t("company:title:basic")}
      bordered
      column={2}
      size="small"
    >
      {/* <Descriptions.Item
        label={
          <>
            ID
            <CheckOutlined />
          </>
        }
      >
        <Form.Item rules={[
          {
            required: true,
            message: t("validate:required", undefined, {
              value: "ID",
            }),
          },
        ]} name="ID">
          <Input />
        </Form.Item>
      </Descriptions.Item> */}
      <Descriptions.Item
        label={
          <>
            {t("company:name")}
            <CheckOutlined />
          </>
        }
      >
        <Form.Item
          rules={[
            {
              required: true,
              message: t("validate:required", undefined, {
                value: t("company:name"),
              }),
            },
          ]}
          name="name"
        >
          <Input />
        </Form.Item>
      </Descriptions.Item>
      <Descriptions.Item label="Password">
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: t("validate:required", undefined, {
                value: t("common:password"),
              }),
            },
            {
              validator: (_, value) =>
                value && validatePassword(value)
                  ? Promise.resolve()
                  : Promise.reject("Password does not match criteria."),
            },
          ]}
        >
          <Input type="password" />
        </Form.Item>
        <span className="tip_box">
          <ExclamationCircleOutlined />
          {t("company:password-condition")}
        </span>
      </Descriptions.Item>
      <Descriptions.Item label="Verify password">
        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!"),
                );
              },
            }),
          ]}
        >
          <Input type="password" />
        </Form.Item>
        <span className="tip_box">
          <ExclamationCircleOutlined />
          Please re-enter the password you entered.
        </span>
      </Descriptions.Item>
      <Descriptions.Item label={t("company:ceo-name")}>
        <Form.Item name="ceoName">
          <Input />
        </Form.Item>
      </Descriptions.Item>
      <Descriptions.Item label={t("company:business-number")}>
        <Form.Item name="businessNumber">
          <Input />
        </Form.Item>
      </Descriptions.Item>
      <Descriptions.Item label={t("company:business-status")}>
        <Form.Item name="businessStatus">
          <Input />
        </Form.Item>
      </Descriptions.Item>
      <Descriptions.Item label={t("company:sectors")}>
        <Form.Item name="sectors">
          <Input />
        </Form.Item>
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <>
            {t("company:telephone")}
            <CheckOutlined />
          </>
        }>
        <Form.Item rules={[
          {
            validator: (_, value) =>
              value && validatePhone(value)
                ? Promise.resolve()
                : Promise.reject("Phone does not match criteria."),
          },
        ]} name="phone">
          <Input />
        </Form.Item>
      </Descriptions.Item>
      <Descriptions.Item label={t("company:fax")}>
        <Form.Item name="fax">
          <Input />
        </Form.Item>
      </Descriptions.Item>
      <Descriptions.Item label={t("company:homepage")}>
        <Form.Item name="homepage">
          <Input />
        </Form.Item>
      </Descriptions.Item>
      <Descriptions.Item label={
        <>
          {t("company:address")}
          <CheckOutlined />
        </>
      }>
        <Form.Item rules={[
          {
            required: true,
            message: t("validate:required", undefined, {
              value: t("company:address"),
            }),
          },
        ]} name="address">
          <Input />
        </Form.Item>
      </Descriptions.Item>
      <Descriptions.Item label={t("company:mail-number")}>
        <Form.Item name="mailOrderNumber">
          <Input />
        </Form.Item>
      </Descriptions.Item>
    </Descriptions>
  );
};

export default StoreBasicInfor;

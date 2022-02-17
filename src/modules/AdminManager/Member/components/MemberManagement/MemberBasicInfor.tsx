/* eslint-disable react/jsx-no-undef */
import { Button, DatePicker, Descriptions, Form, Input } from "antd";
import { CheckOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

import RadioOption from "@core/components/Input/Radio";
import Selector from "@core/components/Input/Selector";
import { TranslateFn } from "@core/hooks/useTranslate";
import membership from "@modules/AdminManager/Member/service/membership-levels";

interface Props {
  t: TranslateFn;
  handleOpenModal: () => void;
}

const MemberBasicInfor = ({ t, handleOpenModal }: Props) => {
  /* State */
  const [membershipLevels, setMembershipLevels] = useState([]);

  const validatePassword = (input: string) => {
    const regForPassword =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/;
    return regForPassword.test(input);
  };

  useEffect(() => {
    getMembership();
  }, []);

  const getMembership = () => {
    membership
      .getList()
      .then((res) => {
        setMembershipLevels(res.items);
      })
      .catch(() => {
        // message.error(t("common:message:error"));
      });
  };

  const optionApproval = [
    {
      value: "ACTIVE",
      label: "Approval",
    },
    {
      value: "PENDING",
      label: "Not approved",
    },
  ];

  const optionGender = [
    {
      value: "MALE",
      label: "Male",
    },
    {
      value: "FEMALE",
      label: "Female",
    },
  ];

  return (
    <Descriptions
      title="Member Basic Information"
      bordered
      column={2}
      size="small"
    >
      <Descriptions.Item
        label={
          <>
            {t("promotion:coupon-list:membership-level")} <CheckOutlined />
          </>
        }
      >
        <div className="option-member">
          <Selector
            name="membershipLevelId"
            data={membershipLevels}
            fieldNames={{ value: "id", label: "name" }}
            rules={[
              {
                required: true,
                message: t("validate:required-option", undefined, {
                  value: "Membership",
                }),
              },
            ]}
          />
        </div>
      </Descriptions.Item>
      <Descriptions.Item label="Approval">
        <RadioOption name="status" data={optionApproval} />
      </Descriptions.Item>

      {/* <Descriptions.Item
                label={
                  <>
                    ID
                    <CheckOutlined />
                  </>
                }
              >
                <Form.Item rules={[{ required: true }]} name="ID">
                  <Input />
                </Form.Item>
              </Descriptions.Item> */}
      <Descriptions.Item
        label={
          <>
            {t("common:name")}
            <CheckOutlined />
          </>
        }
      >
        <Form.Item
          rules={[
            {
              required: true,
              message: t("validate:required", undefined, {
                value: t("common:name"),
              }),
            },
          ]}
          name="fullName"
        >
          <Input />
        </Form.Item>
      </Descriptions.Item>
      <Descriptions.Item label="Gender">
        <RadioOption name="gender" data={optionGender} />
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

      <Descriptions.Item
        label={
          <>
            {t("common:email")}
            <CheckOutlined />
          </>
        }
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: t("validate:required", undefined, {
                value: t("common:email"),
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
      <Descriptions.Item label="Date of birth">
        <Form.Item name="birthday">
          <DatePicker />
        </Form.Item>
      </Descriptions.Item>
      <Descriptions.Item label="Address">
        <div className="zone-code">
          <Form.Item name="zoneCode">
            <Input disabled />
          </Form.Item>
          <Button onClick={handleOpenModal} className="btn-search">
            Find postal code
          </Button>
        </div>
        <div className="address">
          <Form.Item name="street">
            <Input disabled />
          </Form.Item>
        </div>
        <Form.Item name="name">
          <Input placeholder="The remaining address" />
        </Form.Item>
      </Descriptions.Item>
      <Descriptions.Item label="Lot address">
        <Form.Item name="address">
          <Input disabled placeholder="Default address" />
        </Form.Item>
        <span className="tip_box">
          <ExclamationCircleOutlined />
          It is automatically entered through address search.
        </span>
      </Descriptions.Item>
      <Descriptions.Item label="Phone number">
        <Form.Item name="phone">
          <Input />
        </Form.Item>
      </Descriptions.Item>
    </Descriptions>
  );
};

export default MemberBasicInfor;

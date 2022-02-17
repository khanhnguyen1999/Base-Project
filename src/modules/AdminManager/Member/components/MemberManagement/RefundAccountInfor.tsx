/* eslint-disable react/jsx-no-undef */
import { Descriptions, Form, Input } from "antd";
import { useEffect, useState } from "react";

import Selector from "@core/components/Input/Selector";
import { TranslateFn } from "@core/hooks/useTranslate";
import banksApi from "@modules/AdminManager/Member/service/banks";

interface Props {
  t: TranslateFn;
}

const RefundAccountInfor = ({ t }: Props) => {
  /* State */
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    getBanks();
  }, []);

  const getBanks = () => {
    banksApi
      .getList()
      .then((res) => {
        setBanks(res.items);
      })
      .catch(() => {
        // message.error(t("common:message:error"));
      });
  };

  return (
    <Descriptions
      title="Refund account information"
      bordered
      column={1}
      size="small"
    >
      <Descriptions.Item label="Refund bank">
        <div className="option-member">
          <Selector
            name="refundBankId"
            data={banks}
            fieldNames={{ value: "id", label: "name" }}
          />
        </div>
      </Descriptions.Item>
      <Descriptions.Item label="Refund account number">
        <Form.Item name="refundBankAccountNumber">
          <Input />
        </Form.Item>
      </Descriptions.Item>
      <Descriptions.Item label="Refund account holder name">
        <Form.Item name="refundBankAccountName">
          <Input />
        </Form.Item>
      </Descriptions.Item>
    </Descriptions>
  );
};

export default RefundAccountInfor;

/* eslint-disable react/jsx-no-undef */

import { Descriptions } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import RadioOption from "@core/components/Input/Radio";
import { TranslateFn } from "@core/hooks/useTranslate";

interface Props {
  t: TranslateFn;
}
const optionApproval = [
  {
    value: "ACTIVE",
    // label:"common:used",
    label: "Used",
  },
  {
    value: "PENDING",
    // label: "common:information-use:not-used",
    label: "Not used",
  },
];
const StoreShippingInfor = ({ t }: Props) => {
  /* State */
  return (
    <Descriptions
      title={t("company:title:shipping")}
      bordered
      column={1}
      size="small"
    >
      <Descriptions.Item label={t("company:use-or-not")}>
        <RadioOption name="usePolicy" data={optionApproval} />
        <span className="tip_box">
          <ExclamationCircleOutlined />
          The current shopping mall delivery policy is default delivery cost: <u>2,500 won</u>, Free shipping: from <u>50,000 won</u>
        </span>
      </Descriptions.Item>
    </Descriptions >
  );
};

export default StoreShippingInfor;

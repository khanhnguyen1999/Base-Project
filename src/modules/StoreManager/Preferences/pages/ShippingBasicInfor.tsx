import { Button, Descriptions, Form, Input, InputNumber } from "antd";
import { Content, Header } from "antd/lib/layout/layout";

import { ExclamationCircleOutlined } from "@ant-design/icons";
import PageTop from "@core/components/PageTop";
import RadioOption from "@root/core/components/Input/Radio";
import Selector from "@root/core/components/Input/Selector";
import useTranslate from "@core/hooks/useTranslate";

interface Props {}

const breadcrumbList = [
  {
    label: "navmenu:store:preferences",
  },
  {
    label: "navmenu:store:preferences",
  },
  {
    label: "sidebar:store:shipping-basic-infor",
  },
];

const ShippingBasicInfor = (props: Props) => {
  const [t] = useTranslate();

  const [form] = Form.useForm();

  const optionApproval = [
    {
      value: "ACTIVE",
      label: t("common:used"),
    },
    {
      value: "PENDING",
      label: t("common:information-use:not-used"),
    },
  ];

  const optionDesignated = [
    {
      value: "1",
      label: "1",
    },
    {
      value: "2",
      label: "2",
    },
  ];

  /* State */
  return (
    <>
      <Header>
        <PageTop
          t={t}
          title={t("sidebar:store:shipping-basic-infor")}
          breadcrumbList={breadcrumbList}
        />
      </Header>
      <Content>
        <div className="basic-setting-inner">
          <Form form={form}>
            <Descriptions column={2} bordered size="small">
              <Descriptions.Item
                span={2}
                label="Whether to use the shipping policy"
              >
                <RadioOption name="shipping-policy" data={optionApproval} />
                <span className="ml-0 tip_box">
                  <ExclamationCircleOutlined />
                  If you set whether to use the shipping policy, the shopping
                  mall default shipping policy is applied.
                </span>{" "}
                <span className="ml-0 tip_box">
                  <ExclamationCircleOutlined />
                  The current shopping mall delivery policy is basic shipping:
                  2,500 won, free shipping: 50,000 won .
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="basic shipping cost">
                <Form.Item>
                  <Form.Item>
                    <InputNumber /> won
                  </Form.Item>
                  <span className="tip_box">
                    <ExclamationCircleOutlined />
                    Enter 0 for free shipping
                  </span>
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item label="free shipping">
                <Form.Item>
                  <Form.Item>
                    <InputNumber /> won
                  </Form.Item>
                  <span className="tip_box">
                    <ExclamationCircleOutlined />
                    Enter 0 when unconditional shipping cost is applied.
                  </span>
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item
                span={2}
                label="Additional shipping cost setting"
              >
                <RadioOption name="shipping-cost" data={optionApproval} />
                <span className="ml-0 tip_box">
                  <ExclamationCircleOutlined />
                  used When set to , additional shipping cost is applied
                  according to the setting of additional shipping cost between
                  islands.
                </span>{" "}
                <span className="ml-0 tip_box">
                  <ExclamationCircleOutlined />
                  not used When set to , the additional shipping cost is not
                  applied regardless of the setting of the additional shipping
                  cost between islands.
                </span>
                <span className="dash-line"></span>
              </Descriptions.Item>
              <Descriptions.Item label="Designated courier">
                <Selector name="designated" data={optionDesignated} />
              </Descriptions.Item>
              <Descriptions.Item label="Average delivery time">
                <Form.Item>
                  <InputNumber />
                </Form.Item>
              </Descriptions.Item>
              <Descriptions.Item span={2} label="return address">
                <Form.Item>
                  <Input />
                </Form.Item>
              </Descriptions.Item>
            </Descriptions>
            <div className="btn-group">
              <Form.Item>
                <Button htmlType="submit" className="btn-danger">
                  {t("common:confirm")}
                </Button>
              </Form.Item>
            </div>
            ˝
          </Form>
        </div>
      </Content>
    </>
  );
};

export default ShippingBasicInfor;

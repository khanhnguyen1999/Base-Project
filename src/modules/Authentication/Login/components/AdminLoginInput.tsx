import { Button, Form, Input, Popover, Typography } from "antd";
import {
  LockOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";

import useTranslate from "@core/hooks/useTranslate";

interface Props {
  loading?: boolean;
}

const { Title } = Typography;

const LoginForm = ({ loading }: Props) => {
  const [t] = useTranslate();

  const guide_box = () => (
    <div className="question-popover">
      <Title level={5}>{t("login:title-forgot-password")}</Title>
      <p>{t("login:question-option-1")}</p>
      <p>{t("login:question-option-2")}</p>
    </div>
  );

  return (
    <>
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
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder={t("common:email")}
        />
      </Form.Item>
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
            min: 6,
            max: 15,
            message: t("validate:field-mlte", undefined, {
              min: 6,
              max: 15,
              value: t("common:password"),
            }),
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder={t("common:password")}
          suffix={
            <Popover placement="bottom" content={guide_box}>
              <QuestionCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
            </Popover>
          }
        />
      </Form.Item>
      <Form.Item>
        <Button
          className="btn-danger"
          type="primary"
          htmlType="submit"
          block={true}
          loading={loading}
        >
          {t("common:login")}
        </Button>
      </Form.Item>
    </>
  );
};

export default LoginForm;

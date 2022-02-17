import { Card, Col, Form, Row, Tabs, Typography, message } from "antd";
import { useContext, useState } from "react";

import AdminLoginInput from "@modules/Authentication/Login/components/AdminLoginInput";
import Auth from "@utils/helpers/auth";
import ResourceContext from "@utils/contexts/Resource";
import TotalAdmin from "@modules/Authentication/Login/components/TotalAdmin";
import { ValuesAdminLoginForm } from "@modules/Authentication/Login/interfaces";
import authApi from "@modules/Authentication/Login/services/auth";
import { set_user_info } from "@store/actions/user";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useTranslate from "@core/hooks/useTranslate";

interface Props {}

const { TabPane } = Tabs;
const { Title, Text } = Typography;

const Login = (props: Props) => {
  const [t] = useTranslate();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const { setResourceContext } = useContext(ResourceContext);

  /* State */
  const [loading, setLoading] = useState(false);
  const [tabs, setTabs] = useState("admin");

  const onFinish = async (values: ValuesAdminLoginForm) => {
    setLoading(true);
    try {
      const res = await authApi[
        tabs === "admin" ? "adminLogin" : "storeManagerLogin"
      ](values);

      const { accessToken, user } = res;
      const role = res.hasOwnProperty("admin") ? "admin" : "company";

      Auth.setToken(accessToken);
      Auth.setRole(role);
      dispatch(set_user_info(user));
      setResourceContext().then(() => {
        message.success(t("authentication:login-success"));
        if (role === "admin") history.push("/admin/product/brand");
        else history.push("/company/preference");
      });
    } catch (error: any) {
      const { response } = error;

      if (response && response.data) {
        if (response.status === 400) {
          message.error(response.data.message);
        }
      }
    }

    setLoading(false);
  };

  return (
    <div className="container login-page">
      <Row justify="space-around" align="middle">
        <Col className="title-login" span={16}>
          <Title>BRICKMALL</Title>
        </Col>
        <div className="login-form">
          <Col span={8}>
            <TotalAdmin />
          </Col>
          <Col span={8}>
            <Card>
              <Title level={3}>{t("login:title-login")}</Title>
              <Tabs
                onChange={(activeKey: string) => setTabs(activeKey)}
                defaultActiveKey={tabs}
                centered
              >
                <TabPane tab={t("login:integrated-admin")} key="admin">
                  <Form
                    form={form}
                    layout="vertical"
                    name="login-form"
                    className="login-form"
                    autoComplete="off"
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onFinish}
                  >
                    <AdminLoginInput loading={loading} />
                  </Form>
                </TabPane>
                <TabPane tab={t("login:company")} key="company">
                  <Form
                    form={form}
                    layout="vertical"
                    name="login-form"
                    className="login-form"
                    validateTrigger="onBlur"
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onFinish}
                  >
                    <AdminLoginInput loading={loading} />
                  </Form>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </div>
        <Col className="copyright" span={16}>
          <Text>ⓒ BRICKMALL ALL RIGHTS RESERVED.</Text>
        </Col>
      </Row>
    </div>
  );
};

export default Login;

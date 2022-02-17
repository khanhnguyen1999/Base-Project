import { Layout } from "antd";

const { Sider, Content, Header } = Layout;

interface Props {
  sider: JSX.Element;
  top: JSX.Element;
  content: JSX.Element;
}

const AdminLayout = ({ sider, top, content }: Props) => {
  return (
    <Layout className="admin-main-layout">
      <Sider className="admin-main-side" theme="light">
        {sider}
      </Sider>
      <Layout className="admin-main-content">
        <Header>
          {top}
        </Header>
        <Content>
          {content}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;

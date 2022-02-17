import { Content, Header } from "antd/lib/layout/layout";

import MemberManagementForm from "@modules/AdminManager/Member/components/MemberManagement/Form";
import PageTop from "@core/components/PageTop";
import { useParams } from "react-router-dom";
import useTranslate from "@core/hooks/useTranslate";

interface Props {}

interface ParamTypes {
  id: string;
}

const breadcrumbList = [
  {
    label: "menu:member-management",
  },
  {
    label: "menu:member-management",
  },
  {
    label: "menu:member-management",
  },
];

const MemberManagementRegister = (props: Props) => {
  const [t] = useTranslate();
  const { id } = useParams<ParamTypes>();
  return (
    <>
      <Header>
        <PageTop
          t={t}
          title={t("sidebar:member:member:store-management")}
          breadcrumbList={breadcrumbList}
        />
      </Header>
      <Content>
        <div className="member-management-inner">
          <MemberManagementForm
            id={id}
            formType={id === "create" ? "create" : "update"}
            t={t}
          />
        </div>
      </Content>
    </>
  );
};

export default MemberManagementRegister;

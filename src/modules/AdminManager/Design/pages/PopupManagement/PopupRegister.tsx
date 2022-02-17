import { Content, Header } from "antd/lib/layout/layout";

import PageTop from "@core/components/PageTop";
import PopupForm from "@root/modules/AdminManager/Design/components/popup/PopupForm";
import { useParams } from "react-router-dom";
import useTranslate from "@core/hooks/useTranslate";

const breadcrumbList = [
  {
    label: "sidebar:admin-promotion:promotion",
  },
  {
    label: "sidebar:admin-design:popup-banner",
    url: "/admin/promotion/coupon-list",
  },
  {
    label: "sidebar:admin-design:banner-management",
  },
];
interface ParamTypes {
  id: string;
}
const BannerRegister = () => {
  const [t] = useTranslate();
  const { id } = useParams<ParamTypes>();
  return (
    <>
      <Header>
        <PageTop
          breadcrumbList={breadcrumbList}
          title={t("sidebar:admin-design:banner-management")}
          t={t} />
      </Header>
      <Content>
        <div className="banner-management" >
          <PopupForm
            id={id}
            formType={id === "create" ? "create" : "update"}
          />
        </div>
      </Content>
    </>
  );
};

export default BannerRegister;

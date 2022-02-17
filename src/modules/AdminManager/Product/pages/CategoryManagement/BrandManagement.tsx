import { Content, Header } from "antd/lib/layout/layout";

import BrandList from "@root/modules/AdminManager/Product/components/Category/Brand";
import PageTop from "@core/components/PageTop";
import useTranslate from "@core/hooks/useTranslate";

const breadcrumbList = [
  {
    label: "common:products",
  },
  {
    label: "sidebar:admin-product:category-management",
  },
  {
    label: "sidebar:admin-product:brand-management",
  },
];
interface Props { }

const BrandManagement = (props: Props) => {
  const [t] = useTranslate();
  return (
    <>
      <Header>
        <PageTop t={t} title={t("sidebar:admin-product:brand-management")} breadcrumbList={breadcrumbList} />
      </Header>
      <Content>
        <div className="brand-management-inner">
          <BrandList t={t} />
        </div>
      </Content>
    </>
  );
};

export default BrandManagement;

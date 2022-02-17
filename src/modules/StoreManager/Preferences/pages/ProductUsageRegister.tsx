import { Content, Header } from "antd/lib/layout/layout";

import PageTop from "@core/components/PageTop";
import ProductUsageForm from "../components/ProductUsageForm";
import { useParams } from "react-router-dom";
import useTranslate from "@core/hooks/useTranslate";

interface Props {}

interface ParamTypes {
  id: string;
}

const breadcrumbList = [
  {
    label: "Preferences",
  },
  {
    label: "Basic setting",
  },
  {
    label: "Manage detailed product usage guide",
  },
];

const ProductUsageRegister = (props: Props) => {
  const [t] = useTranslate();
  const { id } = useParams<ParamTypes>();
  return (
    <>
      <Header>
        <PageTop
          t={t}
          title={t("sidebar:store:product-usage-infor")}
          breadcrumbList={breadcrumbList}
        />
      </Header>
      <Content>
        <div className="product-usage-inner">
          <ProductUsageForm
            id={id}
            formType={id === "create" ? "create" : "update"}
            t={t}
          />
        </div>
      </Content>
    </>
  );
};

export default ProductUsageRegister;

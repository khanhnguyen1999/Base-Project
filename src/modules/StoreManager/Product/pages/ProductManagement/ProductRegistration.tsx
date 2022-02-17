import { Content, Header } from "antd/lib/layout/layout";

import PageTop from "@core/components/PageTop";
import ProductRegisterForm from "@StoreManager/Product/components/Product/Register/Form";
import { useParams } from "react-router-dom";
import useTranslate from "@core/hooks/useTranslate";

interface Props {}

interface ParamTypes {
  id: string;
}

const breadcrumbList = [
  {
    label: "sidebar:store:product-management",
  },
  {
    label: "sidebar:store:product-list",
    url: "/store-manager/products",
  },
  {
    label: "sidebar:store:product-registration",
  },
];

const ProductRegistration = (props: Props) => {
  const [t] = useTranslate();
  const { id } = useParams<ParamTypes>();

  return (
    <>
      <Header>
        <PageTop
          t={t}
          title={t("sidebar:store:product-registration")}
          breadcrumbList={breadcrumbList}
        />
      </Header>
      <Content>
        <div className="product-registration-inner">
          <ProductRegisterForm
            t={t}
            id={id}
            formType={id === "create" ? "create" : "update"}
          />
        </div>
      </Content>
    </>
  );
};

export default ProductRegistration;

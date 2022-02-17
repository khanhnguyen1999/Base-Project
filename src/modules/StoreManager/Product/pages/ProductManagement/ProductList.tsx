import { Content, Header } from "antd/lib/layout/layout";

import PageTop from "@core/components/PageTop";
import ProductListFilter from "@modules/StoreManager/Product/components/Product/List/Filter";
import ProductListTable from "@modules/StoreManager/Product/components/Product/List/Table";
import { useState } from "react";
import useTranslate from "@core/hooks/useTranslate";

interface Props {}

const breadcrumbList = [
  {
    label: "sidebar:store:product-management",
  },
  {
    label: "sidebar:store:product-list",
  },
];

const ProductList = (props: Props) => {
  const [t] = useTranslate();

  /* State */
  const [filters, setFilters] = useState({});

  return (
    <>
      <Header>
        <PageTop
          t={t}
          title={t("sidebar:store:product-list")}
          breadcrumbList={breadcrumbList}
        />
      </Header>
      <Content>
        <div className="store-business-inner">
          <ProductListFilter t={t} setFilters={setFilters} />
          <ProductListTable t={t} filters={filters} />
        </div>
      </Content>
    </>
  );
};

export default ProductList;

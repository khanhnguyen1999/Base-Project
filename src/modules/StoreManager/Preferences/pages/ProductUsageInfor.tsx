import { Content, Header } from "antd/lib/layout/layout";

import PageTop from "@core/components/PageTop";
import ProductUsageInforFilter from "@StoreManager/Preferences/components/List/Filter";
import ProductUsageInforTable from "@StoreManager/Preferences/components/List/Table";
import { useState } from "react";
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
    label: "sidebar:store:product-usage-infor",
  },
];

const ProductUsageInfor = (props: Props) => {
  const [t] = useTranslate();

  /* State */
  const [filters, setFilters] = useState({});

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
          <ProductUsageInforFilter t={t} setFilters={setFilters} />
          <ProductUsageInforTable t={t} filters={filters} />
        </div>
      </Content>
    </>
  );
};

export default ProductUsageInfor;

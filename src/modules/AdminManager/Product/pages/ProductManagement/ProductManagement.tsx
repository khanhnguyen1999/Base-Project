import { Content, Header } from "antd/lib/layout/layout";

import Filter from "@root/modules/AdminManager/Product/components/Product/Filter";
import PageTop from "@core/components/PageTop";
import Table from "@root/modules/AdminManager/Product/components/Product/Table";
import { useState } from "react";
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
    label: "sidebar:admin-design:popup",
  },
];

const ProductManagement = () => {
  const [t] = useTranslate();

  /* State */
  const [filters, setFilters] = useState({});
  return (
    <>
      <Header>
        <PageTop
          breadcrumbList={breadcrumbList}
          title={t("sidebar:admin-design:popup")}
          t={t} />
      </Header>
      <Content>
        <div className="popup-management" >
          <Filter t={t} setFilters={setFilters} />
          <Table t={t} filters={filters} />
        </div>
      </Content>
    </>
  );
};

export default ProductManagement;

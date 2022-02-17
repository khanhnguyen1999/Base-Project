import { Content, Header } from "antd/lib/layout/layout";

import FilterBanner from "@modules/AdminManager/Design/components/banner/FilterBanner";
import PageTop from "@core/components/PageTop";
import TableBanner from "@modules/AdminManager/Design/components/banner/TableBanner";
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
    label: "sidebar:admin-design:banner-management",
  },
];

const BannerManagement = () => {
  const [t] = useTranslate();

  /* State */
  const [filters, setFilters] = useState({});
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
          <FilterBanner t={t} setFilters={setFilters} />
          <TableBanner t={t} filters={filters} />
        </div>
      </Content>
    </>
  );
};

export default BannerManagement;

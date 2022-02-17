import { Content, Header } from "antd/lib/layout/layout";

import FilterPopup from "@modules/AdminManager/Design/components/popup/FilterPopup";
import PageTop from "@core/components/PageTop";
import TablePopup from "@modules/AdminManager/Design/components/popup/TablePopup";
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

const PopupManagement = () => {
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
          <FilterPopup t={t} setFilters={setFilters} />
          <TablePopup t={t} filters={filters} />
        </div>
      </Content>
    </>
  );
};

export default PopupManagement;

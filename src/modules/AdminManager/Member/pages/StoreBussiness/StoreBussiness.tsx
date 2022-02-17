import { Content, Header } from "antd/lib/layout/layout";

import FilterStoreBusiness from "@modules/AdminManager/Member/components/StoreManagement/FilterStoreBusiness";
import PageTop from "@core/components/PageTop";
import TableStoreBusiness from "@modules/AdminManager/Member/components/StoreManagement/TableStoreBusiness";
import { useState } from "react";
import useTranslate from "@core/hooks/useTranslate";

interface Props { }

const breadcrumbList = [
  {
    label: "menu:member-management",
  },
  {
    label: "menu:member-management",
  },
  {
    label: "sidebar:member:member:store-management",
  },
];

const StoreBusiness = (props: Props) => {
  const [t] = useTranslate();

  /* State */
  const [filters, setFilters] = useState({});
  return (
    <>
      <Header>
        <PageTop t={t} title={t("sidebar:member:member:store-management")} breadcrumbList={breadcrumbList} />
      </Header>
      <Content>
        <div className="store-business-inner">
          <FilterStoreBusiness t={t} setFilters={setFilters} />
          <TableStoreBusiness t={t} filters={filters} />
        </div>
      </Content>
    </>
  );
};

export default StoreBusiness;

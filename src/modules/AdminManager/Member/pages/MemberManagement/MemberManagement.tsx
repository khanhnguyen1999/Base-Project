import { Content, Header } from "antd/lib/layout/layout";
import { useEffect, useState } from "react";

import FilterMemberManagement from "@modules/AdminManager/Member/components/MemberManagement/Filter";
import PageTop from "@core/components/PageTop";
import TableMemberManagement from "@modules/AdminManager/Member/components/MemberManagement/Table";
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
    label: "menu:member-management",
  },
];

const MemberManagement = (props: Props) => {
  const [t] = useTranslate();

  useEffect(() => {
    setFilters([]);
  }, []);

  /* State */
  const [filters, setFilters] = useState({});
  return (
    <>
      <Header>
        <PageTop t={t} title={t("menu:member-management")} breadcrumbList={breadcrumbList} />
      </Header>
      <Content>
        <div className="store-business-inner">
          <FilterMemberManagement t={t} setFilters={setFilters} />
          <TableMemberManagement t={t} filters={filters} />
        </div>
      </Content>
    </>
  );
};

export default MemberManagement;

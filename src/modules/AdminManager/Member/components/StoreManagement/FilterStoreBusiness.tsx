import { Button } from "antd";
import { Link } from "react-router-dom";
import Search from "@core/components/Search";
import { SearchFieldAttr } from "@core/interfaces";
import { TranslateFn } from "@core/hooks/useTranslate";

interface Props {
  t: TranslateFn;
  setFilters: (values: any) => void;
}

const FilterStoreBusiness = ({ t, setFilters }: Props) => {
  const fields: SearchFieldAttr[] = [
    {
      name: "id",
      label: t("common:filter:title-store"),
      type: "text",
      opt: "$eq",
    },
    {
      name: "name",
      label: t("common:filter:company-name"),
      type: "text",
      opt: "$like",
    },
    {
      name: "ceo_name",
      label: t("common:filter:representative"),
      type: "text",
      opt: "$like",
    },
    {
      name: "tel",
      label: t("common:filter:phone-call"),
      type: "text",
      opt: "$like",
    },
    {
      name: "email",
      label: t("common:filter:contact-email"),
      type: "text",
      opt: "$like",
    },
    {
      name: "number",
      label: t("common:filter:contact-person"),
      type: "text",
      opt: "$like",
    },
  ];

  const onSearch = (values: any) => {
    setFilters(values);
  };

  return (
    <div className="filter-store-business">
      <Search
        fields={fields}
        title={t("common:filter:title-store")}
        extra={
          <Button className="btn-danger btn-register" type="primary">
            <Link to="/admin/member/storemanager/create">
              {t("common:filter:registered-store")}
            </Link>
          </Button>
        }
        onSearch={onSearch}
      />
    </div>
  );
};

export default FilterStoreBusiness;

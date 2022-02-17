import { Button } from "antd";
import { Link } from "react-router-dom";
import Search from "@core/components/Search";
import { SearchFieldAttr } from "@core/interfaces";
import { TranslateFn } from "@core/hooks/useTranslate";

interface Props {
  t: TranslateFn;
  setFilters: (values: any) => void;
}

const ListFilter = ({ t, setFilters }: Props) => {
  const fields: SearchFieldAttr[] = [
    {
      label: t("common:title"),
      name: "title",
      opt: "$like",
      type: "text",
    },
    {
      label: t("company:basic-setting:registration-category"),
      name: "type",
      type: "selector",
      opt: "$eq",
      data: [
        {
          value: 10,
          label: t("company:basic-setting:purchase"),
        },
        {
          value: 20,
          label: t("company:basic-setting:possible"),
        },
        {
          value: 30,
          label: t("company:basic-setting:not-possible"),
        },
      ],
    },
  ];

  const onSearch = (values: any) => {
    setFilters(values);
  };

  return (
    <div className="filter-store-business">
      <Search
        column={2}
        fields={fields}
        title={t("company:basic-setting:user-guide-search")}
        extra={
          <Button className="btn-danger btn-register" type="primary">
            <Link to="/company/preferences/product-usage-infor/create">
              {t("company:basic-setting:user-guide-registration")}
            </Link>
          </Button>
        }
        onSearch={onSearch}
      />
    </div>
  );
};

export default ListFilter;

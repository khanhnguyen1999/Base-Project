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
      label: t("common:filter:product-code"),
      name: "code",
      opt: "$like",
      type: "text",
    },
    {
      label: t("common:filter:product-name"),
      name: "name",
      opt: "$like",
      type: "text",
    },
    {
      label: t("common:show"),
      name: "view",
      type: "selector",
      opt: "$eq",
      data: [
        {
          value: "all",
          label: t("common:all"),
        },
        {
          value: "Y",
          label: t("common:show"),
        },
        {
          value: "N",
          label: t("common:hidden"),
        },
      ],
    },
    {
      label: t("common:filter:naver-pay"),
      name: "naver_switch",
      type: "selector",
      opt: "$eq",
      data: [
        {
          value: "all",
          label: t("common:all"),
        },
        {
          value: "Y",
          label: t("common:show"),
        },
        {
          value: "N",
          label: t("common:hidden"),
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
        title={t("common:filter:title-store")}
        extra={
          <Button className="btn-danger btn-register" type="primary">
            <Link to="/company/product/product-registration/create">
              {t("common:filter:registered-store")}
            </Link>
          </Button>
        }
        onSearch={onSearch}
      />
    </div>
  );
};

export default ListFilter;

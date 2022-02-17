import { Button } from "antd";
import { Link } from "react-router-dom";
import Search from "@core/components/Search";
import { SearchFieldAttr } from "@core/interfaces";
import { TranslateFn } from "@core/hooks/useTranslate";

// import { positionList } from "../constants/ClassificationOptions";

interface Props {
  t: TranslateFn;
  setFilters: (values: any) => void;
}

const FilterBanner = ({ t, setFilters }: Props) => {
  // function getKeyByValue(object: any, value: string) {
  //   return Object.keys(object).find(key => object[key] === value);
  // }
  const fields: SearchFieldAttr[] = [
    {
      name: "view",
      label: t("common:filter:exposure"),
      type: "radio",
      removeWhenValueIsAll: true,
      data: [
        {
          value: "1",
          label: t("common:filter:radio-all"),
        },
        {
          value: "2",
          label: t("common:filter:exposure"),
        },
        {
          value: "3",
          label: t("common:brand:hiding"),
        },
      ],
      opt: "$like",
      className: "radio-group",
    },
    {
      name: "mode",
      label: t("common:filter:popup-type"),
      type: "radio",
      removeWhenValueIsAll: true,
      data: [
        {
          value: "all",
          label: t("common:filter:radio-all"),
        },
        {
          value: "IMAGE",
          label: t("popup:form:image"),
        },
        {
          value: "EDITOR",
          label: t("popup:form:editor"),
        },
      ],
      opt: "$like",
    },
    {
      name: "title",
      label: t("table:filter:title"),
      type: "text",
      opt: "$like",
    },
  ];

  const onSearch = (values: any) => {
    const dataOption: any = {
      "1": undefined,
      "2": true,
      "3": false,
    };
    const customValues = { ...values };
    const viewCustom = values.view ? dataOption[values.view["$like"].split("%").join("")] : undefined;
    customValues.view = viewCustom;
    console.log("====view custom===", viewCustom, values);
    setFilters(customValues);
  };

  return (
    <Search
      column={2}
      fields={fields}
      title={t("common:filter:search-popup")}
      extra={
        <div>
          <Button className="btn-danger" type="primary">
            <Link to="/admin/design/popup/create">
              {t("common:filter:popup-register")}
            </Link>
          </Button>
        </div>
      }
      onSearch={onSearch}
    />
  );
};

export default FilterBanner;

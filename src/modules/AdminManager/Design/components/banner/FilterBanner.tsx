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
  const optionSkin = [
    {
      value: "1",
      label: t("common:filter:select-hisense"),
    },
  ];
  // function getKeyByValue(object: any, value: string) {
  //   return Object.keys(object).find(key => object[key] === value);
  // }
  const optionClassification = [
    {
      value: "1",
      key: "common,mailing,not_set_view,not_set_term,not_set_link_target",
      label: t("common:filter:common"),
    },
    {
      value: "2",
      key: "basic2,site_top_logo",
      label: t("common:filter:banner-pc-1"),
    },
    {
      value: "3",
      key: "basic2,site_top_qr",
      label: t("common:filter:banner-pc-2"),
    },
    {
      value: "4",
      key: "basic2,site_main_visual",
      label: t("common:filter:banner-pc-3"),
    },
    {
      value: "5",
      key: "basic2,site_main_middle",
      label: t("common:filter:banner-pc-4"),
    },
    {
      value: "6",
      key: "basic2,site_product_middle",
      label: t("common:filter:banner-pc-5"),
    },
    {
      value: "7",
      key: "basic2,mobile_top_logo",
      label: t("common:filter:banner-mobile-1"),
    },
    {
      value: "8",
      key: "basic2,mobile_main_visual",
      label: t("common:filter:banner-mobile-2"),
    },
    {
      value: "9",
      key: "basic2,mobile_main_wide",
      label: t("common:filter:banner-mobile-3"),
    },
  ];
  const fields: SearchFieldAttr[] = [
    {
      name: "siteSkin",
      label: t("common:filter:skin"),
      type: "selector",
      data: optionSkin,
      opt: "$like",
    },
    {
      name: "positionSkin",
      label: t("common:filter:classification"),
      type: "selector",
      data: optionClassification,
      opt: "$like",
    },
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
    },
    {
      name: "title",
      label: t("common:filter:banner-name"),
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

    if (values.positionSkin) {
      const numberValue = values.positionSkin["$like"].split("%").join("");
      const positionSkinCustom = optionClassification[numberValue - 1];
      const key = positionSkinCustom?.key;
      customValues.positionSkin = { "$like": `%${key}%` };
    }
    setFilters(customValues);
  };

  return (
    <div className="filter-banner" >
      <Search
        column={2}
        fields={fields}
        title={t("common:filter:search-banner")}
        extra={
          <div>
            <Button className="btn-danger" type="primary">
              <Link to="/admin/design/banner/create">
                {t("common:filter:banner-register")}
              </Link>
            </Button>
          </div>
        }
        onSearch={onSearch}
      />
    </div>
  );
};

export default FilterBanner;

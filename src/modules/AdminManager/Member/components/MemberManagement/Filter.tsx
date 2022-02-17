import { Button } from "antd";
import { Link } from "react-router-dom";
import Search from "@core/components/Search";
import { SearchFieldAttr } from "@core/interfaces";
import { TranslateFn } from "@core/hooks/useTranslate";

interface Props {
  t: TranslateFn;
  setFilters: (values: any) => void;
}

const FilterMemberManagement = ({ t, setFilters }: Props) => {
  // const optionMembership = [
  //   {
  //     value: "1",
  //     label: "Normal",
  //   },
  //   {
  //     value: "2",
  //     label: "Facebook",
  //   },
  //   {
  //     value: "3",
  //     label: "Kakaotal",
  //   },
  //   {
  //     value: "4",
  //     label: "Naver",
  //   },
  // ];

  const optionMemberLevel = [
    {
      value: 1,
      label: "General member",
    },
    {
      value: 2,
      label: "Silver member",
    },
    {
      value: 3,
      label: "DIA member",
    },
  ];

  const optionApproval = [
    {
      value: "",
      label: "All",
    },
    {
      value: "ACTIVE",
      label: "Approval",
    },
    {
      value: "PENDING",
      label: "Not approved",
    },
  ];

  const fields: SearchFieldAttr[] = [
    {
      name: "fullName",
      label: t("product:frequently-options:search-word"),
      type: "text",
      opt: "$like",
    },
    // {
    //   name: "membership",
    //   label: t("common:filter:membership"),
    //   type: "checkbox",
    //   opt: "$like",
    //   data: optionMembership,
    // },
    {
      name: "membershipLevelId",
      label: t("promotion:coupon-list:membership-level"),
      type: "selector",
      opt: "$eq",
      data: optionMemberLevel,
    },
    {
      name: "status",
      label: "Approval",
      type: "radio",
      opt: "$eq",
      data: optionApproval,
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
        title="Member Search"
        extra={
          <Button className="btn-danger btn-register" type="primary">
            <Link to="/admin/member/member-management/create">
              {t("common:filter:registered-member")}
            </Link>
          </Button>
        }
        onSearch={onSearch}
      />
    </div>
  );
};

export default FilterMemberManagement;

import HeaderBar from "./HeaderBar";
import {
  MEMBER_MANAGEMENT,
} from "@core/constants/submenu";
import React from "react";

interface Props {
  authenticated: boolean;
}
const headerSystem = [
  // {
  //   title: "menu:order-management",
  //   subMenu: ORDER_MANAGEMENT,
  // },
  {
    title: "menu:member-management",
    subMenu: MEMBER_MANAGEMENT,
  },
  // {
  //   title: "menu:operation-management",
  //   subMenu: OPERATION_MANAGEMENT,
  // },
  // {
  //   title: "menu:my-home-page",
  // },
  // {
  //   title: "menu:manual",
  // },
];
const Header = ({ authenticated }: Props) => {
  return (
    <HeaderBar authenticated={authenticated} header={headerSystem} />
  );
};

export default React.memo(Header);

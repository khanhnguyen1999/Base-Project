import React from "react";
import Sidebar from "./index";
interface Props {
  title: string;
  menuList: any;
}

const AdminSidebar = (props: Props) => {
  const { title, menuList } = props;
  return (
    <Sidebar title={title} subMenuList={menuList} ></Sidebar>
  );
};
export default React.memo(AdminSidebar);

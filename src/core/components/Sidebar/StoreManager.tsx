import Sidebar from "./index";

interface Props {
  title: string;
  menuList: any;
}

const StoreSidebar = ({ title, menuList }: Props) => {
  return (
    <Sidebar title={title} subMenuList={menuList} ></Sidebar>
  );
};

export default StoreSidebar;

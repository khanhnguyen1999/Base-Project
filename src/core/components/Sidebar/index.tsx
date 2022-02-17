import { Divider, Menu, Typography } from "antd";
import React, { useState } from "react";

import { Link } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";
import { findPosition } from "@utils/functions";
import { useLocation } from "react-router-dom";
import useTranslate from "@core/hooks/useTranslate";

interface Props {
  title: string;
  subMenuList: any;
}

const Sidebar = ( {title, subMenuList }: Props) => {
  const [t] = useTranslate();
  const location = useLocation();
  const pos = findPosition(subMenuList, location.pathname);
  const rootSubmenuKeys = subMenuList.map((item: any) => item.title);
  const keys = pos[0] !== undefined ? rootSubmenuKeys[pos[0]] : [];
  const [openKeys, setOpenKeys] = useState<React.Key[]>([keys]);
  const selectedKey = pos[0] !== undefined
    ? [subMenuList[pos[0]].list[pos[1]].name
      + subMenuList[pos[0]].list[pos[1]].url] as string[]
    : [];

  const onOpenChange = (openKeys: React.Key[]) => {
    const latestOpenKey = openKeys.find(
      (key) => openKeys.indexOf(key) === -1,
    ) as string;
    if (rootSubmenuKeys.indexOf(latestOpenKey || "") === -1) {
      setOpenKeys(openKeys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <div className="sidebar">
      <Divider>
        <Typography.Text>{title}</Typography.Text>
      </Divider>
      <Menu
        mode="inline"
        openKeys={openKeys as string[]}
        selectedKeys={selectedKey}
        onOpenChange={onOpenChange}
      >
        {subMenuList.map((item: any) => (
          <SubMenu key={item.title} title={t(item.title)}>
            {item.list?.map((menuItem: any) => (
              <Menu.Item key={menuItem.name + menuItem.url}>
                <Link to={menuItem.url}>{t(menuItem.name)}</Link>
              </Menu.Item>
            ))}
          </SubMenu>
        ))}
      </Menu>
    </div>
  );
};
export default React.memo(Sidebar);

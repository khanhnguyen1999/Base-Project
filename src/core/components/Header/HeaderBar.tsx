import { ADMIN_NAV_MENU, STORE_NAV_MENU } from "@core/constants/nav-menu";
import {
  Button,
  Col,
  Dropdown,
  List,
  Menu,
  Row,
  Typography,
  message,
} from "antd";
import { Link, useHistory } from "react-router-dom";
import React, { useContext } from "react";

import Auth from "@utils/helpers/auth";
import { GlobalOutlined } from "@ant-design/icons";
import LocaleContext from "@utils/contexts/Locale";
import authApi from "@modules/Authentication/Login/services/auth";
import useTranslate from "@core/hooks/useTranslate";

interface Header {
  title: string;
  subMenu?: string[] | null;
}
interface Props {
  authenticated: boolean;
  header: Header[];
}

const Header = ({ authenticated, header }: Props) => {
  const [t] = useTranslate();
  const { setLocaleContext } = useContext(LocaleContext);
  const { Text } = Typography;
  const history = useHistory();
  const role = Auth.getRole();
  const changeLocale = (locale: string) => {
    setLocaleContext(locale);
    localStorage.setItem("lang", locale);
  };

  const goToPage = (path: string) => history.push(path);

  const adminLogout = () => {
    authApi[role === "admin" ? "adminLogout" : "storeManagerLogout"]()
      .then((res) => {
        Auth.clearToken();
        Auth.clearRefreshToken();
        Auth.clearRole();
        goToPage("/admin/login");
      })
      .catch(() => {
        message.error(t("common:message:error"));
      });
  };

  const menuLocale = (
    <Menu>
      <Menu.Item key="ko" onClick={() => changeLocale("ko")}>
        Korean
      </Menu.Item>
      <Menu.Item key="en" onClick={() => changeLocale("en")}>
        English
      </Menu.Item>
    </Menu>
  );

  const subMenu = (list: string[]) => (
    <Menu className="sub-menu">
      {list.map((item) => (
        <Menu.Item className="sub-menu-item" key={item}>
          <Link to="/">{t(item)}</Link>
        </Menu.Item>
      ))}
      <Menu.Item className="sub-menu-item sub-menu-item-last" key="setting">
        <Link to="/">
          {t("submenu:common:menu-management")}
          <Button>{t("submenu:common:settings")}</Button>
        </Link>
      </Menu.Item>
    </Menu>
  );

  const renderAdminOrStoreHeader = () => {
    return authenticated ? (
      <>
        <header className="header">
          <Row>
            <Col className="site_name" lg={6}>
              <Text onClick={() => goToPage("/")}>
                BRICKMALL{" "}
                {role === "company" && (
                  <strong>{t("common:company")}</strong>
                )}
              </Text>
            </Col>
            {role === "admin" ? (
              <Col lg={18} className="menu">
                <ul className="header-menu">
                  <li>
                    {t("menu:full-manager")} <span className="id">master</span>
                  </li>
                  {header.map((itemHeader: Header) => (
                    itemHeader.subMenu
                      ? <li className="shape" key={itemHeader.title}>
                        <Dropdown
                          overlay={subMenu(itemHeader.subMenu)}
                          placement="bottomCenter"
                          arrow
                        >
                          <Text>{t(itemHeader.title)}</Text>
                        </Dropdown>
                      </li>
                      : <li key={itemHeader.title}>{t(itemHeader.title)}</li>
                  ))}
                  <li onClick={adminLogout}>{t("common:logout")}</li>
                </ul>
              </Col>
            ) : (
              <Col lg={18} className="menu">
                <ul className="header-menu">
                  <li>
                    {t("menu:full-manager")} <span className="id">master</span>
                  </li>
                  <li>{t("menu:my-home-page")}</li>
                  <li onClick={adminLogout}>{t("common:logout")}</li>
                </ul>
              </Col>
            )}
          </Row>
          <Dropdown
            className="resource"
            trigger={["click"]}
            overlay={menuLocale}
          >
            <GlobalOutlined />
          </Dropdown>
        </header>
        <div className="nav-menu">
          <List
            itemLayout="horizontal"
            dataSource={role === "admin" ? ADMIN_NAV_MENU : STORE_NAV_MENU}
            renderItem={(item) => (
              <List.Item>
                <Link to={item.url}>
                  <Typography.Text>{t(item.name)}</Typography.Text>
                </Link>
              </List.Item>
            )}
          />
        </div>
      </>
    ) : null;
  };

  return renderAdminOrStoreHeader();
};

export default React.memo(Header);

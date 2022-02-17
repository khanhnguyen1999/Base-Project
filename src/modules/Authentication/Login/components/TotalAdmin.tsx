import { LockOutlined, RightOutlined } from "@ant-design/icons";

import { Button } from "antd";
import { useHistory } from "react-router-dom";
import useTranslate from "@core/hooks/useTranslate";

interface Props {
  loading?: boolean;
}

const TotalAdmin = (props: Props) => {
  const [t] = useTranslate();
  const history = useHistory();

  return (
    <div className="total-admin">
      <div className="visual">
        <LockOutlined />
        <div className="tt">{t("login:total-admin")}</div>
        <div className="st">{t("login:title-total-admin")}</div>
        <div className="cs">{t("login:service-center")} : 1544-0000</div>
        <div className="cs">E-MAIL : help@domain.com</div>
        <Button
          onClick={() => history.push("/")}
          className="shop_go" target="_blank"
          title="내 쇼핑몰 바로가기">
          <span className="txt">{t("login:button-total-admin")}<RightOutlined /></span>
        </Button>
      </div>
    </div>
  );
};

export default TotalAdmin;

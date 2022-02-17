import { Breadcrumb, Typography } from "antd";

import { BreadcrumbItem } from "@core/interfaces";
import { CURRENT_ENV } from "@core/configs/env";
import { LeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { TranslateFn } from "@core/hooks/useTranslate";

interface Props {
  t: TranslateFn;
  title: string;
  breadcrumbList: BreadcrumbItem[];
}

const PageTop = ({ t, title, breadcrumbList }: Props) => {
  return (
    <div className="page-top">
      <LeftOutlined className="close-btn" />
      <Typography.Text className="page-top-title">
        {title} <img src={`${CURRENT_ENV.PREFIX_IMG}/images/m_btn.gif`} />
      </Typography.Text>
      <Breadcrumb separator=">">
        {breadcrumbList.map((item: any) => (
          <Breadcrumb.Item key={item}>{item.url ? (<Link to={item.url}>{t(item.label)}</Link>) : t(item.label)}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
};

export default PageTop;

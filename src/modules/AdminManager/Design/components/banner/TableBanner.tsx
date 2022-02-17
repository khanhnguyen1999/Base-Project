import { Button, Tag } from "antd";

import { CURRENT_ENV } from "@core/configs/env";
import { Link } from "react-router-dom";
import Table from "@core/components/Table";
import { TranslateFn } from "@core/hooks/useTranslate";
import bannersApi from "@modules/AdminManager/Design/services/banner";
import { name as identity } from "@modules/AdminManager/Design/reducers/banners";
import { positionList } from "@modules/AdminManager/Design/constants/ClassificationOptions";
import { useState } from "react";

interface Props {
  t: TranslateFn;
  filters: Record<string, any>;
}
const optionLink: any = {
  NONE: "common:filter:no-link",
  SELF: "common:filter:same-window",
  BLANK: "common:filter:new-window",
};
const TableBanner = ({ t, filters }: Props) => {
  const columns = [
    {
      title: `${t("product:category:table:NO")}`,
      dataIndex: "id",
      key: "no",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: `${t("common:filter:exposure")}`,
      dataIndex: "view",
      key: "exposure",
      render: (text: boolean) => <Tag color="blue" > {text === true ? "Exposure" : "Hiding"} </Tag>,
    },
    {
      title: `${t("table:store-business:ranking")}`,
      dataIndex: "ranking",
      key: "ranking",
    },
    {
      title: `${t("table:design:image")}`,
      dataIndex: "img",
      key: "image",
      render: (text: string) => <div>
        <img
          className="img-banner"
          src={text.includes("https://") ? text : CURRENT_ENV.IMG_URL + text}
        />
      </div>,
    },
    {
      title: `${t("table:design:banner-pos")}`,
      dataIndex: "positionSkin",
      key: "banner_pos",
      render: (text: string, record: any) => {
        const positionName = positionList[text];
        return (
          <>
            {t(positionName)}
          </>
        );
      },
    },
    {
      title: `${t("common:filter:banner-name")}`,
      dataIndex: "title",
      key: "name",
    },
    {
      title: `${t("table:design:banner-date")}`,
      dataIndex: "endDate",
      key: "date",
      render: (text: string) => text !== null ? text : "Infinite",
    },
    {
      title: `${t("table:design:banner-link")}`,
      dataIndex: "linkAddress",
      key: "link",
    },
    {
      title: `${t("table:design:banner-link-form")}`,
      dataIndex: "linkTarget",
      key: "link_form",
      render: (text: string) => {
        const customText = t(optionLink[text]);
        return (
          <>
            {customText}
          </>
        );
      },
    },
    {
      title: `${t("table:filter:management")}`,
      dataIndex: "management",
      key: "management",
      render: (text: string, record: any) => <>
        {
          <div className="lineup-center">
            <Button size="small">
              <Link to={`/admin/design/banner/${record.id}`}>
                {t("table:correction")}
              </Link>
            </Button>
            <Button size="small" onClick={e => onPressDelete(record.id)}>{t("common:delete")}</Button>
          </div>
        }
      </>,
    },
  ];
  const [currentId, changeId] = useState<any>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const onPressDelete = (id: string) => {
    changeId(id);
    setVisible(true);
  };
  return (
    <div className="table-product-icon-list table-banner ">
      <Table
        filters={filters}
        columns={columns}
        identity={identity}
        api={bannersApi}
        currentId={currentId}
        modalVisible={visible}
        setVisible={setVisible}
      />

    </div>
  );
};

export default TableBanner;

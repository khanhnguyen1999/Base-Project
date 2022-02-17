import { Button, Tag } from "antd";

import { CURRENT_ENV } from "@core/configs/env";
import { Link } from "react-router-dom";
import Table from "@core/components/Table";
import { TranslateFn } from "@core/hooks/useTranslate";
import { name as identity } from "@modules/AdminManager/Design/reducers/popups";
import popupsApi from "@modules/AdminManager/Design/services/popup";
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
    },
    {
      title: `${t("common:filter:exposure")}`,
      dataIndex: "view",
      render: (text: boolean) => <Tag color="blue" > {text === true ? "Exposure" : "Hiding"} </Tag>,
    },
    {
      title: `${t("table:filter:exposure-position")}`,
      dataIndex: "position",
    },
    {
      title: `${t("table:store-business:ranking")}`,
      dataIndex: "ranking",
    },
    {
      title: `${t("table:design:image")}`,
      dataIndex: "img",
      render: (text: string) => <div>
        <img
          className="img-banner"
          src={text ? (text.includes("https://") ? text : CURRENT_ENV.IMG_URL + text) : undefined}
        />
      </div>,
    },
    {
      title: `${t("table:filter:title")}`,
      dataIndex: "title",
    },
    {
      title: `${t("table:design:banner-date")}`,
      dataIndex: "endDate",
      render: (text: string) => text !== null ? text : "Infinite",
    },
    {
      title: `${t("table:design:banner-link")}`,
      dataIndex: "linkAddress",
    },
    {
      title: `${t("table:design:banner-link-form")}`,
      dataIndex: "linkTarget",
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
      render: (text: string, record: any) => <>
        {
          <div className="lineup-center">
            <Button size="small">
              <Link to={`/admin/design/popup/${record.id}`}>
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
        api={popupsApi}
        currentId={currentId}
        modalVisible={visible}
        setVisible={setVisible}
      />

    </div>
  );
};

export default TableBanner;

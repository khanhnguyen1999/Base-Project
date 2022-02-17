import { Tabs, Typography } from "antd";

import Editor from "@core/components/Editor";
import RadioOption from "@core/components/Input/Radio";
import Selector from "@core/components/Input/Selector";
import { TranslateFn } from "@core/hooks/useTranslate";

interface Props {
  t: TranslateFn;
}
const { TabPane } = Tabs;
const { Title } = Typography;

const InformationUse = ({ t }: Props) => {
  const informationOption = [
    {
      value: "1",
      label: t("common:information-use:not-used"),
    },
    {
      value: "2",
      label: t("common:information-use:direct-input"),
    },
    {
      value: "3",
      label: t("common:information-use:select-input"),
    },
  ];

  const purchaseSelect = [
    {
      value: "1",
      label: t("common:information-use:select"),
    },
    {
      value: "2",
      label: t("common:information-use:purchase-some-products"),
    },
    {
      value: "3",
      label: t("common:information-use:purchase-basic"),
    },
  ];

  const possibleSelect = [
    {
      value: "1",
      label: t("common:information-use:select"),
    },
    {
      value: "2",
      label: t("common:information-use:possible-basic"),
    },
  ];

  const notPossibleSelect = [
    {
      value: "1",
      label: t("common:information-use:select"),
    },
    {
      value: "2",
      label: t("common:information-use:not-possible-basic"),
    },
  ];

  return (
    <div className="information-use">
      <Title level={5}>{t("common:information-use")}</Title>

      <Tabs defaultActiveKey="1">
        <TabPane tab={t("common:information-use:purchase")} key="1">
          <div className="information-use-top">
            <RadioOption
              key="information_use"
              name="information_use_purchase"
              data={informationOption}
            />
            <Selector
              label=""
              name="information_select_purchase"
              data={purchaseSelect}
            />
          </div>
          <Editor readOnly />
        </TabPane>
        <TabPane tab={t("common:information-use:possible")} key="2">
          <div className="information-use-top">
            <RadioOption
              key="information_use"
              name="information_use_possible"
              data={informationOption}
            />
            <Selector
              label=""
              name="information_select_possible"
              data={possibleSelect}
            />
          </div>
          <Editor readOnly />
        </TabPane>
        <TabPane tab={t("common:information-use:not-possible")} key="3">
          <div className="information-use-top">
            <RadioOption
              key="information_use"
              name="information_use_not_possible"
              data={informationOption}
            />
            <Selector
              label=""
              name="information_select_not_possible"
              data={notPossibleSelect}
            />
          </div>
          <Editor readOnly />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default InformationUse;

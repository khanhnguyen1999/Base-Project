import { Checkbox, Descriptions, Form, Radio } from "antd";

import { CURRENT_ENV } from "@core/configs/env";
import RadioOption from "@core/components/Input/Radio";
import { TranslateFn } from "@core/hooks/useTranslate";

interface Props {
  t: TranslateFn;
  title: string;
  name: string;
}

const CategoryDisplaySetting = ({ t, title, name }: Props) => {
  const statusOption = [
    {
      value: "Y",
      label: t("table:company:exposure"),
    },
    {
      value: "N",
      label: t("common:brand:hiding"),
    },
  ];

  return (
    <div className="product-display-setting">
      <Descriptions bordered title={title} column={2} size="middle">
        <Descriptions.Item label={t("product:category:pc-product-exposure")}>
          <RadioOption name={`${name}ProductView`} data={statusOption} />
          <Form.Item
            name={`${name}ProductAll`}
            valuePropName="checked"
          >
            <Checkbox>{t("product:category:subcategory")}</Checkbox>
          </Form.Item>
        </Descriptions.Item>
        <Descriptions.Item
          label={t("product:category:mobile-product-exposure")}
        >
          <RadioOption
            name={`${name}ProductMobileView`}
            data={statusOption}
          />
          <Form.Item
            name={`${name}ProductMobileAll`}
            valuePropName="checked"
          >
            <Checkbox>{t("product:category:subcategory")}</Checkbox>
          </Form.Item>
        </Descriptions.Item>
        <Descriptions.Item
          label={t("product:category:pc-product-display-setting")}
        >
          <Form.Item name={`${name}ProductDisplay`}>
            <Radio.Group className="radio-product">
              <div className="radio-product-inner">
                <img src={`${CURRENT_ENV.PREFIX_IMG}/images/type_6x1.gif`} />
                <div className="radio-img">
                  <Radio autoFocus key="1" value={6} />
                  <label className="type-img">6 x *</label>
                </div>
              </div>
              <div className="radio-product-inner">
                <img src={`${CURRENT_ENV.PREFIX_IMG}/images/type_5x1.gif`} />
                <div className="radio-img">
                  <Radio autoFocus key="2" value={5} />
                  <label className="type-img">5 x *</label>
                </div>
              </div>
            </Radio.Group>
          </Form.Item>
        </Descriptions.Item>
        <Descriptions.Item
          label={t("product:category:mobile-product-display-setting")}
        >
          <Form.Item name={`${name}ProductMobileDisplay`}>
            <Radio.Group className="radio-product">
              <div className="radio-product-inner">
                <img src={`${CURRENT_ENV.PREFIX_IMG}/images/type_2x1.gif`} />
                <div className="radio-img">
                  <Radio autoFocus key="1" value={2} />
                  <label className="type-img">2 x *</label>
                </div>
              </div>
              <div className="radio-product-inner">
                <img src={`${CURRENT_ENV.PREFIX_IMG}/images/type_m1x1s2.gif`} />
                <div className="radio-img">
                  <Radio autoFocus key="2" value={1} />
                  <label className="type-img">1 x *</label>
                </div>
              </div>
            </Radio.Group>
          </Form.Item>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default CategoryDisplaySetting;

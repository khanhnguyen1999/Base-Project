import { Descriptions, Form, Input, Typography } from "antd";

import { ExclamationCircleOutlined } from "@ant-design/icons";
import RadioOption from "@core/components/Input/Radio";
import { TranslateFn } from "@core/hooks/useTranslate";
import UploadImage from "@core/components/Upload/Image";
import categoriesApi from "@modules/AdminManager/Product/service/categories";

interface Props {
  t: TranslateFn;
  parent: any;
}

const CategoryProductSetting = ({ t, parent }: Props) => {
  const optionsView = [
    { value: "Y", label: t("common:show") },
    { value: "N", label: t("common:brand:hiding") },
  ];

  const optionsUse = [
    { value: "Y", label: t("promotion:coupon-settings:use") },
    { value: "N", label: t("common:information-use:not-used") },
  ];

  const optionsTarget = [
    { value: "NO", label: "no link" },
    { value: "SELF", label: "same window" },
    { value: "BLANK", label: "new window" },
  ];

  return (
    <div className="product-category-setting">
      <Descriptions title={t("product:setting")} column={2} bordered>
        <Descriptions.Item label={t("common:category-name")}>
          {parent && (
            <div className="category-upper">
              <span className="fr-bullet">Parent category</span>
              <span className="fr-tx">{parent.name}</span>
            </div>
          )}
          <Form.Item rules={[{
            required: true,
            message: t("error:category-name"),
          }]} name="name">
            <Input placeholder={t("common:category")} />
          </Form.Item>
          <span className="tip_box">
            <ExclamationCircleOutlined />
            {t("product:setting:category-name-tip")}
          </span>
        </Descriptions.Item>
        <Descriptions.Item label={t("table:company:exposure")}>
          <RadioOption
            name="view"
            data={optionsView}
          />
        </Descriptions.Item>
        <Descriptions.Item label={t("product:setting:address-external")}>
          <span className="tip_box">
            <ExclamationCircleOutlined />
            {t("product:setting:address-tip")}
          </span>
        </Descriptions.Item>
        <Descriptions.Item label={t("product:setting:address-internal")}>
          <span className="tip_box">
            <ExclamationCircleOutlined />
            {t("product:setting:address-tip")}
          </span>
        </Descriptions.Item>
        <Descriptions.Item label={t("product:setting:top-banner")}>
          <RadioOption
            name="imgTopBannerUse"
            data={optionsUse}
          />
          <div className="top-banner">
            <UploadImage
              name="imgTopBanner"
              onUploadImage={categoriesApi.uploadImage}
            ></UploadImage>
            <span style={{ paddingTop: "7px" }} className="tip_box">
              <ExclamationCircleOutlined />
              {t("common:product-image:recommended-size-free")}
            </span>
          </div>
          <div className="banner-link">
            <Typography.Text strong>
              {t("product:setting:banner-link")}
            </Typography.Text>
            <RadioOption
              name="imgTopBannerTarget"
              data={optionsTarget}
            />
            <Form.Item shouldUpdate={(prevValues, currentValues) =>
              prevValues["imgTopBannerTarget"] !== currentValues["imgTopBannerTarget"]
            }>
              {({ getFieldValue }) => {
                const value = getFieldValue("imgTopBannerTarget") || [];
                return (
                  <Form.Item name="imgTopBannerLink">
                    <Input
                      style={{ opacity: value === "NO" ? 0 : 1 }}
                      placeholder={t("product:setting:banner-link:placeholder")}
                    />
                  </Form.Item>
                );
              }}
            </Form.Item>
          </div>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default CategoryProductSetting;

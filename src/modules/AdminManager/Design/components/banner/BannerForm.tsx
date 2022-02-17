import {
  Button,
  DatePicker,
  Descriptions,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Space,
  Spin,
  message,
} from "antd";
import { momentToString, stringToMoment } from "@utils/functions";
import { useEffect, useState } from "react";

import UploadImage from "@core/components/Upload/Image";
import bannersApi from "@modules/AdminManager/Design/services/banner";
import { useHistory } from "react-router-dom";
import useTranslate from "@core/hooks/useTranslate";

const { Option } = Select;
interface Props {
  id: string;
  formType: "create" | "update";
}
const BannerForm = ({ formType, id }: Props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const [t] = useTranslate();
  const getOneBanner = async (id: string) => {
    try {
      const res = await bannersApi.getOne(id);
      return res;
    } catch (error) {
      message.error("Error when get banner");
    }
  };
  const modelFromApiToForm = (res: any) => {
    const {
      siteSkin,
      positionSkin,
      view,
      ranking,
      hasDeadline,
      startDate,
      endDate,
      title,
      linkTarget,
      linkAddress,
      img,
    } = res;
    const customImage = [{ response: { path: img } }];
    const fields = {
      ...res,
      link: linkAddress,
      target: linkTarget,
      title,
      start_date: startDate && stringToMoment(startDate),
      end_date: endDate && stringToMoment(endDate),
      location: positionSkin,
      view: view === true ? "Y" : "N",
      idx: ranking,
      none_limit: hasDeadline === true ? "Y" : "N",
      site_skin: siteSkin,
      img: customImage,
    };
    return fields;
  };
  useEffect(() => {
    if (formType === "update") {
      try {
        setLoading(true);
        getOneBanner(id)
          .then(res => {
            const dataFillForm = modelFromApiToForm(res);
            form.setFieldsValue(dataFillForm);
          });
      } catch (error) {
        message.error("Error");
      }
      finally {
        setLoading(false);
      }
    }
  }, []);


  const [form] = Form.useForm();
  const modelToSendApi = (fields: any) => {
    const {
      img,
      link,
      target,
      title,
      start_date,
      end_date,
      location,
      view,
      idx,
      none_limit,
      site_skin,
    } = fields;
    const body = {
      "linkTarget": target,
      "siteSkin": site_skin,
      "positionSkin": location,
      "view": view === "Y" ? true : false,
      "ranking": idx,
      "hasDeadline": none_limit === "Y" ? true : false,
      "startDate": start_date && momentToString(start_date),
      "endDate": end_date && momentToString(end_date),
      img,
      title,
      "linkAddress": link,
    };
    return body;
  };
  const onFinish = async (values: any) => {
    const { img = [] } = values;
    const file = img[0] || {};
    const { response = {} } = file;
    const customObject = {
      ...values,
      img: response.filename,
    };
    const body = modelToSendApi(customObject);
    try {
      if (formType === "create") {
        await bannersApi.create(body);
      } else {
        await bannersApi.update(id, body);
      }
      history.push("/admin/design/banner");
      message.success(
        t(`common:${formType}-value-success`, undefined, {
          value: "design",
        }),
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="create-icon-form">
      <Spin spinning={loading}>
        <Form form={form} onFinish={onFinish}>
          <Descriptions bordered column={2} size="small">
            <Descriptions.Item label={t("common:filter:skin")}>
              <Form.Item name="site_skin">
                <Select>
                  <Option key="basic2" value="basic2">
                    {t("common:filter:select-hisense")}
                  </Option>
                </Select>
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label={t("common:filter:classification")}>
              <Form.Item name="location">
                <Select>
                  <Option key="common,mailing,not_set_view,not_set_term,not_set_link_target"
                    value="common,mailing,not_set_view,not_set_term,not_set_link_target">
                    {t("common:filter:common")}
                  </Option>
                  <Option key="basic2,site_top_logo" value="basic2,site_top_logo">
                    {t("common:filter:banner-pc-1")}
                  </Option>
                  <Option key="basic2,site_top_qr" value="basic2,site_top_qr">
                    {t("common:filter:banner-pc-2")}
                  </Option>
                  <Option key="basic2,site_main_visual" value="basic2,site_main_visual">
                    {t("common:filter:banner-pc-3")}
                  </Option>
                  <Option key="basic2,site_main_middle" value="basic2,site_main_middle">
                    {t("common:filter:banner-pc-4")}
                  </Option>
                  <Option key="basic2,site_product_middle" value="basic2,site_product_middle">
                    {t("common:filter:banner-pc-5")}
                  </Option>
                  <Option key="basic2,mobile_top_logo" value="basic2,mobile_top_logo">
                    {t("common:filter:banner-mobile-1")}
                  </Option>
                  <Option key="basic2,mobile_main_visual" value="basic2,mobile_main_visual">
                    {t("common:filter:banner-mobile-2")}
                  </Option>
                  <Option key="basic2,mobile_main_wide" value="basic2,mobile_main_wide">
                    {t("common:filter:banner-mobile-3")}
                  </Option>
                </Select>
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label={t("common:filter:banner-exposure")}>
              <Form.Item name="view">
                <Radio.Group >
                  <Radio value="Y">{t("common:filter:exposure")}</Radio>
                  <Radio value="N">{t("common:brand:hiding")}</Radio>
                </Radio.Group>
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label={t("common:filter:banner-ranking")}>
              <Form.Item name="idx">
                <InputNumber />
              </Form.Item>
            </Descriptions.Item>
          </Descriptions>
          <Descriptions bordered column={1} size="small">
            <Descriptions.Item label={t("common:filter:set-deadline")}>
              <Form.Item name="none_limit">
                <Radio.Group >
                  <Radio value="Y">{t("common:filter:banner-indefinitely")}</Radio>
                  <Radio value="N">{t("common:filter:period-designation")}</Radio>
                </Radio.Group>
              </Form.Item>
              <br />
              <Form.Item shouldUpdate={(prevValues, currentValues) =>
                prevValues["none_limit"] !== currentValues["none_limit"]
              }>
                {({ getFieldValue }) => {
                  const value = getFieldValue("none_limit");
                  return (
                    <Space>
                      <Form.Item name="start_date" >
                        <DatePicker disabled={value === "Y"} />
                      </Form.Item>
                      <Form.Item name="end_date" >
                        <DatePicker disabled={value === "Y"} />
                      </Form.Item>
                    </Space>
                  );
                }}
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label={t("common:filter:banner-image")}>
              <UploadImage
                name="img"
                onUploadImage={bannersApi.uploadImage}
              />
            </Descriptions.Item>
            <Descriptions.Item label={t("common:filter:title")}>
              <Form.Item name="title">
                <Input />
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label={t("common:filter:link-target")}>
              <Form.Item name="target" >
                <Radio.Group >
                  <Radio value={"NONE"}>{t("common:filter:no-link")}</Radio>
                  <Radio value={"SELF"}>{t("common:filter:same-window")}</Radio>
                  <Radio value={"BLANK"}>{t("common:filter:new-window")}</Radio>
                </Radio.Group>
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label={t("table:design:banner-link")}>
              <Form.Item shouldUpdate={(prevValues, currentValues) =>
                prevValues["target"] !== currentValues["target"]
              }>
                {({ getFieldValue }) => {
                  const value = getFieldValue("target");
                  return <Form.Item name="link">
                    <Input disabled={value === "NONE"} />
                  </Form.Item>;
                }}
              </Form.Item>
            </Descriptions.Item>
          </Descriptions>
          <div className="btn-icon-group">
            <Button className="btn-danger" htmlType="submit" type="primary">
              {t("common:confirm")}
            </Button>
          </div>
        </Form>
      </Spin>
    </div>
  );
};

export default BannerForm;

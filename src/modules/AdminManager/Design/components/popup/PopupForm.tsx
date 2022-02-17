import {
  Button,
  DatePicker,
  Descriptions,
  Form,
  Input,
  InputNumber,
  Radio,
  Space,
  Spin,
  message,
} from "antd";
import { momentToString, stringToMoment } from "@utils/functions";
import { useEffect, useState } from "react";

import UploadImage from "@core/components/Upload/Image";
import popupsApi from "@modules/AdminManager/Design/services/popup";
import { useHistory } from "react-router-dom";
import useTranslate from "@core/hooks/useTranslate";

const defaultProps = {
  min: 0,
};

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
      const res = await popupsApi.getOne(id);
      return res;
    } catch (error) {
      message.error("Error when get banner");
    }
  };
  const modelFromApiToForm = (res: any) => {
    const {
      view,
      hasDeadline,
      img,
      startDate,
      endDate,
    } = res;
    const customImage = [{ response: { path: img } }];
    const fields = {
      ...res,
      view: view === true ? "Y" : "N",
      none_limit: hasDeadline === true ? "Y" : "N",
      img: customImage,
      startDate: startDate && stringToMoment(startDate),
      endDate: endDate && stringToMoment(endDate),
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
      view,
      startDate,
      endDate,
      none_limit,
    } = fields;
    const body = {
      ...fields,
      "view": view === "Y" ? true : false,
      "hasDeadline": none_limit === "Y" ? false : true,
      startDate: startDate && momentToString(startDate),
      endDate: endDate && momentToString(endDate),
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
        await popupsApi.create(body);
      } else {
        await popupsApi.update(id, body);
      }
      history.push("/admin/design/popup");
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
          <Descriptions bordered column={1} size="small">
            <Descriptions.Item label={t("common:filter:popup-type")}>
              <Form.Item name="mode">
                <Radio.Group >
                  <Radio value="IMAGE">{t("popup:form:image")}</Radio>
                  <Radio value="EDITOR">{t("popup:form:editor")}</Radio>
                </Radio.Group>
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label={t("common:filter:popup-exposure")}>
              <Form.Item name="view">
                <Radio.Group >
                  <Radio value="Y">{t("common:filter:exposure")}</Radio>
                  <Radio value="N">{t("common:brand:hiding")}</Radio>
                </Radio.Group>
              </Form.Item>
            </Descriptions.Item>
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
                      <Form.Item name="startDate" >
                        <DatePicker disabled={value === "Y"} />
                      </Form.Item>
                      <Form.Item name="endDate" >
                        <DatePicker disabled={value === "Y"} />
                      </Form.Item>
                    </Space>
                  );
                }}
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label={t("common:filter:popup-image")}>
              <UploadImage
                name="img"
                onUploadImage={popupsApi.uploadImage}
              />
            </Descriptions.Item>
            <Descriptions.Item label={t("common:filter:title")}>
              <Form.Item name="title">
                <Input />
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label={t("common:filter:link-target")}>
              <Form.Item name="linkTarget" >
                <Radio.Group >
                  <Radio value={"NONE"}>{t("common:filter:no-link")}</Radio>
                  <Radio value={"SELF"}>{t("common:filter:same-window")}</Radio>
                  <Radio value={"BLANK"}>{t("common:filter:new-window")}</Radio>
                </Radio.Group>
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label={t("table:design:banner-link")}>
              <Form.Item name="linkAddress">
                <Input />
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label={t("common:filter:banner-ranking")}>
              <Form.Item name="ranking">
                <InputNumber {...defaultProps} />
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label={t("table:filter:exposure-position")}>
              <Form.Item name="position" >
                <Radio.Group>
                  <Radio value={"ALL"}>{t("popup:form:position:full")}</Radio>
                  <Radio value={"PC"}>{t("popup:form:position:pc")}</Radio>
                  <Radio value={"MOBILE"}>{t("popup:form:position:mobile")}</Radio>
                </Radio.Group>
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label={t("popup:form:position:pc")} >
              <Form.Item shouldUpdate={(prevValues, currentValues) =>
                prevValues["position"] !== currentValues["position"]
              }>
                {({ getFieldValue }) => {
                  const value = getFieldValue("position");
                  return (
                    <Space>
                      from above
                      <Form.Item name="top">
                        <InputNumber  {...defaultProps} disabled={value === "MOBILE"} />
                      </Form.Item>
                      px, from the left
                      <Form.Item name="left">
                        <InputNumber  {...defaultProps} disabled={value === "MOBILE"} />
                      </Form.Item>
                      px
                    </Space>
                  );
                }}
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label={t("popup:form:position:mobile")}>
              <Form.Item shouldUpdate={(prevValues, currentValues) =>
                prevValues["position"] !== currentValues["position"]
              }>
                {({ getFieldValue }) => {
                  const value = getFieldValue("position");
                  return (
                    <Space>
                      from above
                      <Form.Item name="mobileTop">
                        <InputNumber  {...defaultProps} disabled={value === "PC"} />
                      </Form.Item>
                      px
                    </Space>
                  );
                }}
              </Form.Item>
            </Descriptions.Item>
            {/* {position !== "MOBILE" && <Descriptions.Item label={t("popup:form:position:pc")}>
              <div className="display-horizontal">
                from above&nbsp;
                <Form.Item name="top">
                  <InputNumber  {...defaultProps} />
                </Form.Item>
                &nbsp;px, from the left&nbsp;
                <Form.Item name="left">
                  <InputNumber  {...defaultProps} />
                </Form.Item>
                &nbsp;px
              </div>
            </Descriptions.Item>}
            {position !== "PC" && <Descriptions.Item label={t("popup:form:position:mobile")}>
              <div className="display-horizontal">
                from above&nbsp;
                <Form.Item name="mobileTop">
                  <InputNumber  {...defaultProps} />
                </Form.Item>
                &nbsp;px
              </div>
            </Descriptions.Item>} */}
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

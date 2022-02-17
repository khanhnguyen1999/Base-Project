import {
  Button,
  Checkbox,
  Descriptions,
  Form,
  Input,
  Spin,
  message,
} from "antd";
import { useEffect, useState } from "react";

import { CKEditor } from "ckeditor4-react";
import { Link } from "react-router-dom";
import Selector from "@root/core/components/Input/Selector";
import { TranslateFn } from "@core/hooks/useTranslate";
import productUsageApi from "@StoreManager/Preferences/services/basic-setting";
import { useHistory } from "react-router";

interface Props {
  t: TranslateFn;
  id: string;
  formType: "create" | "update";
}

const ProductUsageForm = ({ t, formType, id }: Props) => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const [form] = Form.useForm();
  const history = useHistory();

  useEffect(() => {
    if (formType === "update") {
      productUsageApi.getOne(id).then((res) => {
        const { content, ...product } = res;
        form.setFieldsValue(product);
        setContent(content);
      });
    }
  }, []);

  const typeOptions = [
    {
      value: 10,
      label: t("company:basic-setting:purchase"),
    },
    {
      value: 20,
      label: t("company:basic-setting:possible"),
    },
    {
      value: 30,
      label: t("company:basic-setting:not-possible"),
    },
  ];
  const onFinish = async (values: any) => {
    setLoading(true);

    const { content = {}, ...body } = values;
    body.content = content.editor ? content.editor.getData() : content;
    try {
      await productUsageApi[formType](formType === "create" ? body : id, body);
      history.push("/company/preferences/product-usage-infor");
      message.success(
        t(`common:${formType}-value-success`, undefined, {
          value: "product usage",
        }),
      );
    } catch (error: any) {
      const { response } = error;

      if (response && response.data) {
        const { message: data } = response.data;

        if (Array.isArray(data)) {
          message.error(data.join(", "));
        } else {
          message.error(data);
        }
      }
    }
    setLoading(false);
  };

  return (
    <Spin spinning={loading}>
      <Form form={form} onFinish={onFinish} autoComplete="off">
        <Descriptions bordered title="" size="small" column={1}>
          <Descriptions.Item
            label={t("company:basic-setting:registration-category")}
          >
            <div className="type-option">
              <Selector name="type" data={typeOptions} />
            </div>
          </Descriptions.Item>
          <Descriptions.Item label={t("company:basic-setting:basic-exposure")}>
            <Form.Item name="isDefault" valuePropName="checked">
              <Checkbox>
                {t("company:basic-setting:set-to-be-exposed")}
              </Checkbox>
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label={t("common:title")}>
            <div className="title">
              <Form.Item name="title">
                <Input />
              </Form.Item>
            </div>
          </Descriptions.Item>
          <Descriptions.Item label={t("company:basic-setting:detail")}>
            {formType === "create" && (
              <Form.Item name="content">
                <CKEditor />
              </Form.Item>
            )}
            {formType === "update" && content && (
              <Form.Item initialValue={content} name="content">
                <CKEditor initData={content} />
              </Form.Item>
            )}
          </Descriptions.Item>
        </Descriptions>
        <div className="btn-group">
          <Form.Item>
            <Button loading={loading} htmlType="submit" className="btn-danger">
              {t("common:confirm")}
            </Button>
          </Form.Item>
          <Button>
            <Link to={"/company/preferences/product-usage-infor"}>
              {t("common:list")}
            </Link>
          </Button>
        </div>
      </Form>
    </Spin>
  );
};

export default ProductUsageForm;

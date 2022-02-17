import { Form, Tabs, Typography } from "antd";

import { CKEditor } from "ckeditor4-react";
import { TranslateFn } from "@core/hooks/useTranslate";

interface Props {
  t: TranslateFn;
  formType: "create" | "update";
  ckEditor: {
    content: string;
    mobile_content: string;
  };
}
const { TabPane } = Tabs;
const { Title } = Typography;

const ProductDetailedDescription = ({ t, ckEditor, formType }: Props) => {
  return (
    <div className="product-detailed-description">
      <Title level={5}>{t("common:product-detailed:description")}</Title>
      <Tabs>
        <TabPane tab={t("common:product-detailed:PC")} key="pc">
          {formType === "create" && (
            <Form.Item name="ck_content" rules={[{ required: true }]}>
              <CKEditor />
            </Form.Item>
          )}
          {formType === "update" && ckEditor.content && (
            <Form.Item
              initialValue={ckEditor.content}
              name="ck_content"
              rules={[{ required: true }]}
            >
              <CKEditor initData={ckEditor.content} />
            </Form.Item>
          )}
        </TabPane>
        <TabPane
          forceRender={true}
          tab={t("common:product-detailed:MOBILE")}
          key="mobile"
        >
          {formType === "create" && (
            <Form.Item name="ck_mobile_content">
              <CKEditor />
            </Form.Item>
          )}
          {formType === "update" && ckEditor.mobile_content && (
            <Form.Item
              initialValue={ckEditor.mobile_content}
              name="ck_mobile_content"
            >
              <CKEditor initData={ckEditor.mobile_content} />
            </Form.Item>
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ProductDetailedDescription;

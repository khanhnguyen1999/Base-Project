import {
  Descriptions,
  Form,
  Radio,
} from "antd";

import AutomaticRegistration from "./AutomaticRegistration";
import DirectRegistration from "./DirectRegistration";
import { TranslateFn } from "@core/hooks/useTranslate";

interface Props {
  t: TranslateFn;
}

const ProductImageRegistration = ({ t }: Props) => {
  const options = [
    {
      value: "auto",
      label: `${t("common:product-image:automatic")}`,
    },
    {
      value: "direct",
      label: `${t("common:product-image:direct")}`,
    },
  ];

  return (
    <div className="product-image-registration">
      <Descriptions
        bordered
        title={t("common:product-image:registration")}
        size="small"
        column={2}
      >
        <Descriptions.Item
          span={2}
          label={t("common:product-image:registration")}
        >
          <Form.Item
            name="img_auto_resize_use"
            initialValue="auto"
          >
            <Radio.Group options={options} />
          </Form.Item>
        </Descriptions.Item>
        <Descriptions.Item
          span={2}
          label="Image"
        >
          <Form.Item
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.img_auto_resize_use !== currentValues.img_auto_resize_use
            }
          >
            {({ getFieldValue }) =>
              getFieldValue("img_auto_resize_use") === "auto" ? (
                <AutomaticRegistration t={t} />
              ) : (
                <DirectRegistration
                  t={t}
                />
              )
            }
          </Form.Item>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default ProductImageRegistration;

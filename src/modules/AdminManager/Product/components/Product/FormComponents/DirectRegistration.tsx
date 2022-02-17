import { Button, Form } from "antd";
import {
  ExclamationCircleOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import { TranslateFn } from "@core/hooks/useTranslate";
import UploadImage from "@core/components/Upload/Image";
import UploadImageDynamic from "@core/components/Upload/ImageDynamic";
import productApi from "@modules/AdminManager/Product/service/products";

interface Props {
  t: TranslateFn;
}

const DirectRegistration = ({ t }: Props) => {
  return (
    <>
      <UploadImage
        label="Main image"
        name="imgs_list_square"
        onUploadImage={productApi.uploadImage}
      />
      <span style={{ paddingTop: "7px" }} className="tip-box">
        <ExclamationCircleOutlined />
        {t("common:product-image:recommended-size-470")}
      </span>
      <Form.List name="images">
        {(fields, { add, remove }) => {
          return (
            <>
              <Button
                disabled={fields.length >= 5}
                style={{ margin: "10px 0" }}
                onClick={() => add()}
              >
                <PlusOutlined />
                {t("common:product-image:addition")}
              </Button>
              {fields.map((key, name, fieldKey, ...restField) => (
                <div className="flex-center-vertical" key={key.key}>
                  <UploadImageDynamic
                    {...restField}
                    field="images"
                    label={`Image ${name + 1}`}
                    name={[name, "square"]}
                    fieldKey={[fieldKey, "square"]}
                    onUploadImage={productApi.uploadImage}
                  />
                  <Button onClick={() => remove(name)}>
                    <MinusOutlined />
                    {t("common:delete")}
                  </Button>
                  <span style={{ paddingTop: "7px" }} className="tip-box">
                    <ExclamationCircleOutlined />
                    {t("common:product-image:recommended-size-470")}
                  </span>
                </div>
              ))}
            </>
          );
        }}
      </Form.List>
    </>
  );
};

export default DirectRegistration;

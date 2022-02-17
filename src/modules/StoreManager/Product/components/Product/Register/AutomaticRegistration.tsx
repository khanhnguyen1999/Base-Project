import { ExclamationCircleOutlined } from "@ant-design/icons";
import { TranslateFn } from "@core/hooks/useTranslate";
import UploadImage from "@core/components/Upload/Image";
import productApi from "@StoreManager/Product/services/products";

interface Props {
  t: TranslateFn;
}

const AutomaticRegistration = ({ t }: Props) => {
  return (
    <>
      <UploadImage
        name="imgs_list_square"
        onUploadImage={productApi.uploadImage}
      />
      <span style={{ paddingTop: "7px" }} className="tip-box">
        <ExclamationCircleOutlined />
        {t("common:product-image:recommended-size-470")}
      </span>
      <span className="tip-box">
        <ExclamationCircleOutlined />
        {t("common:product-image:tip")}
      </span>
    </>
  );
};

export default AutomaticRegistration;

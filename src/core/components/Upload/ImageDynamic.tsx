import { Form, Spin, Upload, message } from "antd";
import { RcFile, UploadChangeParam } from "antd/lib/upload";

import Avatar from "@core/components/Avatar";
import { UploadFile } from "antd/lib/upload/interface";
import { UploadOutlined } from "@ant-design/icons";
import { UploadRequestOption } from "rc-upload/lib/interface";
import useTranslate from "@core/hooks/useTranslate";

interface Props {
  limit?: number;
  label?: string;
  help?: string;
  field: string;
  name: any;
  fieldKey?: any;
  onUploadImage: (
    file: RcFile,
  ) => Promise<{ dir: string; filename: string; path: string }>;
}

const Image = ({
  limit = 3,
  label,
  help,
  field,
  name,
  fieldKey,
  onUploadImage,
  ...rest
}: Props) => {
  const [t] = useTranslate();

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    let isAcceptSize = true;

    if (!isJpgOrPng) {
      message.error(t("CORE.image_support"));
    }

    if (limit) {
      if (file.size / 1024 / 1024 > limit) {
        isAcceptSize = false;
        message.error(t("common:image_size", undefined, { value: limit }));
      }
    } else {
      isAcceptSize = true;
    }

    if (isJpgOrPng && isAcceptSize) {
      return true;
    } else {
      return false;
    }
  };

  const customRequest = async (options: UploadRequestOption) => {
    const { file, onSuccess } = options;
    const imageUpload = await onUploadImage(file as RcFile);
    onSuccess!(imageUpload, options.file as unknown as XMLHttpRequest);
  };

  const onChange = async (info: UploadChangeParam) => {
    if (info.file.status === "error") {
      message.error("Upload hình thất bại");
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Form.Item
      {...rest}
      label={label}
      help={help}
      name={name}
      fieldKey={fieldKey}
      valuePropName="fileList"
      getValueFromEvent={normFile}
    >
      <Upload
        listType="picture-card"
        accept=".jpg, .jpeg, .png"
        showUploadList={false}
        customRequest={customRequest}
        onChange={onChange}
        beforeUpload={beforeUpload}
        maxCount={1}
      >
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues[field] !== currentValues[field]
          }
        >
          {({ getFieldValue }) => {
            const fieldValue = getFieldValue(field);
            const files = fieldValue[name[0]]?.[name[1]] || [];
            const file: UploadFile = files[0] || {};
            const { response = {}, status } = file;

            return (
              <Spin spinning={status === "uploading"}>
                {response.path ? (
                  <Avatar
                    src={response.path}
                    base={true}
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <UploadOutlined className="icon-image-exists" />
                )}
              </Spin>
            );
          }}
        </Form.Item>
      </Upload>
    </Form.Item>
  );
};

export default Image;

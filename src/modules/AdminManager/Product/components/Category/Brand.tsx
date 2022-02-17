/* eslint-disable @typescript-eslint/indent */
import {
  Button,
  Card,
  Checkbox,
  Descriptions,
  Form,
  Input,
  Modal,
  Spin,
  Tag,
  Typography,
  message,
} from "antd";
import { useEffect, useState } from "react";

import { ExclamationCircleOutlined } from "@ant-design/icons";
import ModalDelete from "@core/components/Modal";
import { TranslateFn } from "@core/hooks/useTranslate";
import brandsApi from "@modules/AdminManager/Product/service/brands";

interface Props {
  t: TranslateFn;
}

const BrandList = ({ t }: Props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState<any[]>([]);
  const [formType, setFormType] = useState<"create" | "update">("create");
  const [idBrand, setIdBrand] = useState<number | undefined>();
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visible, setVisible] = useState(false);
  const [idDelete, setIdDelete] = useState("");

  useEffect(() => {
    getBrandList();
  }, []);

  const getBrandList = async () => {
    setLoading(true);
    try {
      const res = await brandsApi.getList();
      setBrands(res.items);
    } catch (error: any) {
      logError(error);
    }

    setLoading(false);
  };

  const onFinish = async () => {
    setLoading(true);
    const values = form.getFieldsValue();

    try {
      if (!idBrand) {
        const res = await brandsApi.create(values);
        setBrands([...brands, res]);
      } else {
        const oldBrand = {
          ...values,
          id: idBrand,
        };
        await brandsApi.update(idBrand, oldBrand);

        setIdBrand(undefined);
        getBrandList();
      }

      message.success(
        t(`common:${formType}-value-success`, undefined, {
          value: "brand",
        }),
      );
      form.resetFields();
      setVisible(false);
    } catch (error: any) {
      logError(error);
    }
    setLoading(false);
  };

  const logError = (error: any) => {
    const { response } = error;

    if (response && response.data) {
      let { message: data } = response.data;

      if (Array.isArray(data)) {
        data = data[0];
      }

      // message.error(data);
    }
  };

  const deleteBrand = (id: string) => {
    brandsApi
      .deleteById(id)
      .then((res) => {
        if (res) getBrandList();
        message.success(
          t("common:delete-value-success", undefined, {
            value: "brand",
          }),
        );
      })
      .catch(() => {
        // message.error(t("common:message:error"));
      });
  };

  const editBrand = (brand: any) => {
    setVisible(true);
    form.setFieldsValue(brand);
    setFormType("update");
    setIdBrand(brand.id);
  };

  const hiddenModalDelete = () => {
    setVisibleDelete(false);
  };

  const hiddenModal = () => {
    setVisible(false);
  };

  const setModal = () => {
    setVisible(true);
    setFormType("create");
    form.resetFields();
  };

  const setModalDelete = (id: string) => {
    setVisibleDelete(true);
    setIdDelete(id);
  };

  const onOk = () => {
    deleteBrand(idDelete);
    setVisibleDelete(false);
  };

  const changeStatusAllBrand = (status: string) => {
    const oldBrands = brands.map((user) => user.id);

    brandsApi[status === "publish" ? "publish" : "unpublish"](oldBrands)
      .then((res) => {
        getBrandList();
        message.success(
          t(`common:${status}-all-success`, undefined, {
            value: "brand",
          }),
        );
      })
      .catch(() => {
        // message.error(t("common:message:error"));
      });
  };
  return (
    <div className="brand">
      <Spin spinning={loading}>
        <Card title={t("common:filter:brand")}>
          <Descriptions
            column={2}
            extra={
              <>
                <div className="top">
                  <Button onClick={() => changeStatusAllBrand("publish")}>
                    {t("common:brand:show-all")}
                  </Button>
                  <Button onClick={() => changeStatusAllBrand("unpublish")}>
                    {t("common:brand:hide-all")}
                  </Button>
                </div>
                <div className="bottom-right">
                  <div className="bottom-right">
                    <Button onClick={setModal} className="black">
                      {t("common:brand:addition")}
                    </Button>
                  </div>
                </div>
              </>
            }
          >
            {brands?.map((brand: any) => (
              <Descriptions.Item key={brand.id} span={1}>
                <div className="left">
                  {brand.publish ? (
                    <Tag color="blue">{t("common:brand:exposure")}</Tag>
                  ) : (
                    <Tag color="gray">{t("common:brand:hiding")}</Tag>
                  )}
                  <Typography.Text>{brand.name}</Typography.Text>
                </div>
                <div className="right">
                  <Button
                    onClick={() => editBrand(brand)}
                    htmlType="button"
                    className="gray"
                  >
                    {t("common:edit")}
                  </Button>
                  <Button
                    onClick={() => setModalDelete(brand.id)}
                    htmlType="button"
                    className="gray"
                  >
                    {t("common:delete")}
                  </Button>
                </div>
              </Descriptions.Item>
            ))}
          </Descriptions>
          <span className="tip_box">
            <ExclamationCircleOutlined />
            {t("common:brand:brands")}{" "}
            <strong>{t("common:brand:alphabetically")}</strong>{" "}
            {t("common:brand:and-in")}{" "}
            <strong>{t("common:brand:abc-order")}</strong>{" "}
            {t("common:brand:on-the-user-page")}
          </span>
        </Card>
        <Form
          onFinish={onFinish}
          form={form}
          initialValues={{ publish: false }}
          name="brand"
        >
          <Modal
            title={formType === "create" ? "Create A Brand" : "Update A Brand"}
            destroyOnClose={true}
            centered
            visible={visible}
            onCancel={hiddenModal}
            closable={false}
            maskClosable={false}
            okText={
              formType === "create" ? t("common:create") : t("common:update")
            }
            className="brand-modal"
            footer={[
              <Button key="back" onClick={hiddenModal}>
                Cancel
              </Button>,
              <Button
                form="brand"
                key="submit"
                htmlType="submit"
                type="primary"
              >
                {formType === "create"
                  ? t("common:create")
                  : t("common:update")}
              </Button>,
            ]}
          >
            <Form.Item
              name="name"
              label={t("common:brand:addition")}
              rules={[
                {
                  required: true,
                  message: t("validate:required", undefined, {
                    value: t("common:filter:brand"),
                  }),
                },
              ]}
            >
              <Input placeholder={t("common:brand:enter-your-brand")} />
            </Form.Item>

            <div className="right">
              <Form.Item name="publish" valuePropName="checked">
                <Checkbox>{t("common:brand:exposure")}</Checkbox>
              </Form.Item>
            </div>
          </Modal>
        </Form>

        <ModalDelete
          text={t("modal:title:delete")}
          t={t}
          visible={visibleDelete}
          onCancel={hiddenModalDelete}
          onOk={onOk}
        />
      </Spin>
    </div>
  );
};

export default BrandList;

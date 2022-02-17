/* eslint-disable react/jsx-no-undef */
import { Button, Form, Spin, message } from "antd";
import { useEffect, useState } from "react";

import Modal from "antd/lib/modal/Modal";
import Postcode from "@core/components/Postcode/index";
import StoreAccountInfor from "./StoreContactInfor";
import StoreBasicInfor from "./StoreBasicInfor";
import StoreShippingInfor from "./StoreShippingInfor";
import { TranslateFn } from "@core/hooks/useTranslate";
import companyApi from "@modules/AdminManager/Member/service/store-bussiness";
import { useHistory } from "react-router-dom";

interface Props {
  t: TranslateFn;
  id: string;
  formType: "create" | "update";
}

const StoreManagementForm = ({ t, formType, id }: Props) => {
  const history = useHistory();
  const [form] = Form.useForm();

  useEffect(() => {
    if (formType === "update") {
      setLoading(true);
      companyApi
        .getOne(id)
        .then((res) => {
          form.setFieldsValue({ ...res, password: null, usePolicy: res.usePolicy ? "ACTIVE" : "PENDING" });
          setLoading(false);
        })
        .catch(() => {
          message.error(t("common:message:error"));
          setLoading(false);
        });
      // getAddress();
    } else {
      form.setFieldsValue({ usePolicy: "PENDING" });
    }
  }, []);

  /* State */
  const [loading, setLoading] = useState(false);
  const [isOpenModal, setIsModalOpen] = useState(false);

  const hiddenModal = () => {
    setIsModalOpen(false);
  };

  const visibleModal = () => {
    setIsModalOpen(true);
  };

  const onFinish = async () => {
    setLoading(true);

    const formValues = form.getFieldsValue();
    const { usePolicy } = formValues;
    const values = {
      ...formValues,
      usePolicy: usePolicy === "ACTIVE" ? true : false,
    };
    try {
      if (formType === "update") {
        await companyApi.update(id, values);
      } else {
        await companyApi.create(values);
      }
      history.push("/admin/member/storemanager");
      message.success(
        t(`common:${formType}-value-success`, undefined, {
          value: "member",
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

  const pullPostcode = (data: any) => {
    setIsModalOpen(false);
    form.setFieldsValue({
      zoneCode: data.zonecode,
      street: data.roadAddress,
      address: data.addressEnglish,
    });
  };

  // const getAddress = () => {
  //   companyApi
  //     .getAddress(id)
  //     .then((res) => {
  //       const { name, zoneCode, street, address } = res.items[0];

  //       form.setFieldsValue({ name, zoneCode, street, address });
  //       setLoading(false);
  //     })
  //     .catch(() => {
  //       message.error(t("common:message:error"));
  //       setLoading(false);
  //     });
  // };

  return (
    <div className="register-frequently-form">
      <Spin spinning={loading}>
        <Form form={form} onFinish={onFinish} autoComplete="off">
          <StoreBasicInfor t={t} handleOpenModal={visibleModal} />
          <StoreAccountInfor t={t} />
          <StoreShippingInfor t={t} />
          <div className="btn-group">
            <Form.Item>
              <Button
                loading={loading}
                htmlType="submit"
                className="btn-danger"
              >
                {t("common:confirm")}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Spin>
      <Modal
        title="Find postal code"
        destroyOnClose={true}
        centered
        visible={isOpenModal}
        onCancel={hiddenModal}
        footer={null}
      >
        <Postcode postCode={pullPostcode} />
      </Modal>
    </div>
  );
};

export default StoreManagementForm;

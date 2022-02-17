/* eslint-disable react/jsx-no-undef */
import { Button, Form, Spin, message } from "antd";
import { useEffect, useState } from "react";

import MemberBasicInfor from "./MemberBasicInfor";
import Modal from "antd/lib/modal/Modal";
import Postcode from "@core/components/Postcode/index";
import RefundAccountInfor from "./RefundAccountInfor";
import { TranslateFn } from "@core/hooks/useTranslate";
import memberApi from "@modules/AdminManager/Member/service/member-management";
import moment from "moment";
import { useHistory } from "react-router-dom";

interface Props {
  t: TranslateFn;
  id: string;
  formType: "create" | "update";
}

const MemberManagementForm = ({ t, formType, id }: Props) => {
  const history = useHistory();
  const [form] = Form.useForm();

  useEffect(() => {
    if (formType === "update") {
      setLoading(true);
      memberApi
        .getOne(id)
        .then((res) => {
          res.birthday = moment(res.birthday);
          form.setFieldsValue({ ...res, password: "" });
          setLoading(false);
        })
        .catch(() => {
          message.error(t("common:message:error"));
          setLoading(false);
        });
      getAddress();
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
    const { name, zoneCode, street, address } = formValues;
    const values = {
      ...formValues,
      address: { name, zoneCode, street, address },
    };

    try {
      if (formType === "update") {
        await memberApi.update(id, values);
      } else {
        await memberApi.create(values);
      }
      history.push("/admin/member/member-management");
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

  const getAddress = () => {
    memberApi
      .getAddress(id)
      .then((res) => {
        const { name, zoneCode, street, address } = res.items[0];

        form.setFieldsValue({ name, zoneCode, street, address });
        setLoading(false);
      })
      .catch(() => {
        message.error(t("common:message:error"));
        setLoading(false);
      });
  };

  return (
    <div className="register-frequently-form">
      <Spin spinning={loading}>
        <Form form={form} onFinish={onFinish} autoComplete="off">
          <MemberBasicInfor t={t} handleOpenModal={visibleModal} />
          <RefundAccountInfor t={t} />
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

export default MemberManagementForm;

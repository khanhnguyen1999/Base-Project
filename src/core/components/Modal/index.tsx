import { Modal, Typography } from "antd";

import { TranslateFn } from "@core/hooks/useTranslate";

interface Props {
  t: TranslateFn;
  text: string;
  onOk: () => void;
  visible: boolean;
  onCancel: () => void;
}

const { Title } = Typography;

const ModalDelete = ({ t, onOk, text, visible, onCancel }: Props) => {
  return (
    <Modal
      centered={true}
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      okText={t("common:delete")}
      cancelText={t("common:cancel")}
    >
      <Title level={4}>{text}</Title>
    </Modal>
  );
};

export default ModalDelete;

import { Button, Modal, message } from "antd";
import React, { useState } from "react";

import { DeleteOutlined } from "@ant-design/icons";
import { TranslateFn } from "@core/hooks/useTranslate";

export interface CustomActions {
  icon?: React.ReactNode;
  text: any;
  action: (e: React.MouseEvent<HTMLElement, MouseEvent>, selectedRowKeys: any[]) => void;
  danger?: boolean;
}

interface Props {
  t: TranslateFn;
  selectedRowKeys: any[];
  customActions?: CustomActions[];
  modeCustomActions?: "merge" | "overwrite";
  deleteAction: (selectedRowKeys: any[]) => void;
  resetAfterDeleteSuccess: (ids: any[]) => void;
}

const Action = ({
  t,
  selectedRowKeys,
  customActions = [],
  modeCustomActions = "merge",
  deleteAction,
  resetAfterDeleteSuccess,
}: Props) => {
  /* State */
  const [visible, seVisible] = useState(false);
  // const [confirmValue, seConfirmValue] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onOpen = () => {
    seVisible(true);
  };

  const onCancel = () => {
    seVisible(false);
  };

  const onOk = async () => {
    setConfirmLoading(true);

    try {
      await deleteAction(selectedRowKeys);

      // seConfirmValue("");
      setConfirmLoading(false);
      seVisible(false);
      resetAfterDeleteSuccess(selectedRowKeys);
    } catch (error) {
      setConfirmLoading(false);
      message.error(t("table:modal:message:delete_error"));
    }
  };

  // const onChangeConfirmValue = (value: string) => {
  //   seConfirmValue(value);
  // };

  const renderButtonAction = () => {
    const mergeActions = [
      {
        icon: <DeleteOutlined />,
        action: onOpen,
        text: t("common:delete"),
        danger: true,
      },
      ...customActions,
    ];
    const actions =
      modeCustomActions === "merge" ? mergeActions : customActions;

    return actions.map(({ icon, action, text, danger }) => (
      <Button
        type="text"
        icon={icon}
        onClick={(e) => action(e, selectedRowKeys)}
        danger={danger}
        key={text}
      >
        {text}
      </Button>
    ));
  };

  return (
    selectedRowKeys.length > 0 ? (
      <div className="actions">
        <div className="text">
          {t("table:action:selected_rows", undefined, {
            rows: selectedRowKeys.length,
          })}
        </div>
        {renderButtonAction()}
        <Modal
          visible={visible}
          onCancel={onCancel}
          onOk={onOk}
          title={t("table:modal:title:delete", undefined, {
            rows: selectedRowKeys.length,
          })}
          className="modal-delete"
          okText={t("common:ok")}
          cancelText={t("common:cancel")}
          confirmLoading={confirmLoading}
          okButtonProps={{
            disabled: selectedRowKeys.length === 0,
            loading: confirmLoading,
          }}
        >
          {/* <InputNumber style={{ width: "100%" }} onChange={onChangeConfirmValue} value={confirmValue} /> */}
        </Modal>
      </div>
    ) : null
  );
};

export default Action;

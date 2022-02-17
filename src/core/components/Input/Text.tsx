import { Form, Input } from "antd";

interface Props {
  name: string;
  className?: string;
  disabled?: boolean;
}

const Text = ({ name, className, disabled }: Props) => {
  return (
    <Form.Item name={name} className={className}>
      <Input disabled={disabled} />
    </Form.Item>
  );
};

export default Text;

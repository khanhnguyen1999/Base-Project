import { Form, Input } from "antd";

interface Props {
  name: string;
  className?: string;
}

const Text = ({ name, className }: Props) => {
  return (
    <Form.Item name={name} className={className}>
      <Input />
    </Form.Item>
  );
};

export default Text;

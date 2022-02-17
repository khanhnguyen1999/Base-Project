import { DatePicker, Form } from "antd";

interface Props {
  name: string;
  className?: string;
}

const DateTime = ({ name, className }: Props) => {
  return (
    <Form.Item name={name} className={className}>
      <DatePicker />
    </Form.Item>
  );
};

export default DateTime;

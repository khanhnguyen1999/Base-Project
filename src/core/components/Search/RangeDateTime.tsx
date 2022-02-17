import { DatePicker, Form } from "antd";

interface Props {
  name: string;
  className?: string;
}

const { RangePicker } = DatePicker;

const RangeDateTime = ({ name, className }: Props) => {
  return (
    <Form.Item name={name} className={className}>
      <RangePicker />
    </Form.Item>
  );
};

export default RangeDateTime;

import { Checkbox, Form } from "antd";

import { FilterOption } from "@core/interfaces";

interface Props {
  data: FilterOption[];
  name: string;
  className?: string;
}

const CheckBox = ({ data, name, className }: Props) => {
  return (
    <Form.Item name={name} className={className}>
      <Checkbox.Group options={data}/>
    </Form.Item>
  );
};

export default CheckBox;

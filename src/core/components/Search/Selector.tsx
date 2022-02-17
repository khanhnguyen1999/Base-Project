import { Form, Select } from "antd";

import { FilterOption } from "@core/interfaces";

interface Props {
  data: FilterOption[];
  name: string;
  className?: string;
}

const Selector = ({ data, name, className }: Props) => {
  return (
    <Form.Item name={name} className={className}>
      <Select>
        {data?.map((item: FilterOption) => (
          <Select.Option key={item.value} value={item.value}>
            {item.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Selector;

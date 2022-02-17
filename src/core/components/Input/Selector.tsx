import { Form, Select } from "antd";

import { FilterOption } from "@core/interfaces";
import { Rule } from "rc-field-form/lib/interface";

interface Props {
  data: FilterOption[];
  name: string;
  label?: string;
  rules?: Rule[];
  size?: "large" | "middle" | "small";
  fieldNames?: { value: string; label: string };
}

const Selector = ({ data, name, label, rules, size, fieldNames }: Props) => {
  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Select size={size}>
        {data?.map((item: FilterOption & { [key: string]: any }) =>
          fieldNames ? (
            <Select.Option
              key={item[fieldNames.value]}
              value={item[fieldNames.value]}
            >
              {item[fieldNames.label]}
            </Select.Option>
          ) : (
            <Select.Option key={item.value} value={item.value}>
              {item.label}
            </Select.Option>
          ),
        )}
      </Select>
    </Form.Item>
  );
};

Selector.defaultProps = {
  size: "middle",
};

export default Selector;

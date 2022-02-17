import { Form, Radio } from "antd";

import { FilterOption } from "@core/interfaces";
import { Rule } from "rc-field-form/lib/interface";

interface Props {
  data: FilterOption[];
  name: string;
  label?: string;
  convertHTML?: boolean;
  rules?: Rule[];
  disabled?: boolean;
  defaultValue?: FilterOption;
}

const RadioOption = ({ data, convertHTML, name, label, rules, disabled, defaultValue }: Props) => {
  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Radio.Group disabled={disabled} defaultValue={defaultValue?.value}>
        {data?.map((item: FilterOption) => (
          <Radio autoFocus key={item.value} value={item.value} disabled={item?.disabled}>
            {convertHTML ? <div dangerouslySetInnerHTML={{ __html: item.label! }} /> : item.label}
          </Radio>
        ))}
      </Radio.Group>
    </Form.Item>
  );
};

export default RadioOption;

import { Form, Radio } from "antd";

import { FilterOption } from "@core/interfaces";

interface Props {
  data: FilterOption[];
  name: string;
  convertHTML?: boolean;
  className?: string;
}

const RadioOption = ({ data, convertHTML, name, className }: Props) => {
  return (
    <Form.Item name={name} className={className}>
      <Radio.Group>
        {data?.map((item: FilterOption) => (
          <Radio autoFocus key={item.value} value={item.value}>
            {convertHTML ? (
              <div dangerouslySetInnerHTML={{ __html: item.label! }} />
            ) : (
              item.label
            )}
          </Radio>
        ))}
      </Radio.Group>
    </Form.Item>
  );
};

export default RadioOption;

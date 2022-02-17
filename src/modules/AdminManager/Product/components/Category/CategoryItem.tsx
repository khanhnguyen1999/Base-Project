import { Button, Tag, Typography } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

import { TranslateFn } from "@core/hooks/useTranslate";

interface Props {
  t: TranslateFn;
  item: any;
  getCategory: (item: any) => void;
  editCategory: (item: any) => void;
  moveCategory: (id: number, type: string, item: any) => void;
  currentFocus: number;
  list: any[];
}

const CategoryItem = ({
  t,
  item,
  getCategory,
  editCategory,
  moveCategory,
  currentFocus,
  list,
}: Props) => {
  return (
    <div className="category-product-item" style={{ backgroundColor: currentFocus === item.id ? "#ffe6e6" : "transparent" }}>
      <div
        onClick={() => getCategory(item)}
        className="category-product-item--left-side"
      >
        {item.view && (
          <Tag color="blue">{t("common:brand:exposure")}</Tag>
        )}
        {!item.view && (
          <Tag color="gray">{t("common:brand:hiding")}</Tag>
        )}
        <Typography.Text ellipsis={true}>{item.name}</Typography.Text>
      </div>
      <div className="category-product-item--right-side">
        <Button disabled={item.id === list[0].id} onClick={() => moveCategory(item.id, "up", item)} size="small">
          <UpOutlined />
        </Button>
        <Button disabled={item.id === list[list.length - 1].id} onClick={() => moveCategory(item.id, "down", item)} size="small">
          <DownOutlined />
        </Button>
        <Button onClick={() => editCategory(item)} size="small">
          {t("table:correction")}
        </Button>
      </div>
    </div>
  );
};

export default CategoryItem;

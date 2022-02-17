import { Button, Form, Spin, message } from "antd";
import { useEffect, useState } from "react";

import BasicInformation from "./BasicInformation";
import CategorySetting from "./CategorySetting";
import DetailedDescription from "./DetailedDescription";
import ImageRegistration from "./ImageRegistration";
import { TranslateFn } from "@core/hooks/useTranslate";
import productApi from "@StoreManager/Product/services/products";
import { useHistory } from "react-router-dom";

interface Props {
  t: TranslateFn;
  id: string;
  formType: "create" | "update";
}

const RegisterForm = ({ t, id, formType }: Props) => {
  const [form] = Form.useForm();
  const history = useHistory();

  /* State */
  const [loading, setLoading] = useState(false);
  const [categoriesHierarchy, setCategoriesHierarchy] = useState<any[]>([]);
  const [ckEditor, setCkEditor] = useState({ content: "", mobile_content: "" });

  useEffect(() => {
    if (formType === "update") {
      setLoading(true);
      productApi
        .getOne(id)
        .then((res) => {
          const {
            content,
            mobile_content,
            categories_hierarchy,
            img_list_square,
            ...product
          } = res;
          form.setFieldsValue(product);
          setCkEditor({ content, mobile_content });
          setCategoriesHierarchy(JSON.parse(categories_hierarchy || "[]"));
          handleImageRegistration(res);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          message.error(t("common:message:error"));
          setLoading(false);
        });
    }
  }, []);

  const handleImageRegistration = (res: any) => {
    if (res.img_list_square) {
      const imgs_list_square = [
        {
          uid: "-1",
          status: "done",
          response: {
            path: res.img_list_square,
          },
        },
      ];

      form.setFieldsValue({ imgs_list_square });
    }

    const images: any = [];
    for (let i = 1; i <= 5; i++) {
      if (res[`img_b${i}`]) {
        images.push({
          square: [
            {
              uid: "-1",
              status: "done",
              response: {
                path: res[`img_b${i}`],
              },
            },
          ],
        });
      }
    }

    if (res.img_b1) {
      form.setFieldsValue({ img_auto_resize_use: "direct", images });
    }
  };

  const extractImage = (images: any[] = []) => {
    const image = images[0] || {};
    return image.response?.filename;
  };

  const onFinish = async (values: any) => {
    const {
      ck_content = {},
      ck_mobile_content = {},
      imgs_list_square,
      images,
      ...body
    } = values;

    // handle categories
    body.categories_hierarchy = JSON.stringify(categoriesHierarchy);
    body.categories = categoriesHierarchy.map(
      (category) => category[category.length - 1],
    );
    // handle editor
    body.content = ck_content.editor ? ck_content.editor.getData() : ck_content;
    body.mobile_content = ck_mobile_content.editor
      ? ck_mobile_content.editor.getData()
      : ck_mobile_content;
    // handle image
    body.img_list_square = extractImage(imgs_list_square);
    // handle list image
    images.forEach((item: any, index: number) => {
      const image = extractImage(item.square);
      body[`img_b${index + 1}`] = image;
    });

    body.use_content = "N";
    body.relation_type = "none";
    body.shipping_fee_use = "N";

    try {
      if (formType === "update") {
        body.id = +id;
      }

      await productApi[formType](body);
      history.push("/company/products");
      message.success(
        t(`common:${formType}-value-success`, undefined, {
          value: "product",
        }),
      );
    } catch (error: any) {
      const { response } = error;

      if (response && response.data) {
        const { message: data } = response.data;

        if (Array.isArray(data)) {
          message.error(data.join(", "));
        } else {
          message.error(data);
        }
      }
    }
  };

  const addCategoriesHierarchy = () => {
    const category = form.getFieldValue("category");

    if (
      category &&
      !categoriesHierarchy.find((c) => c.join("-") === category.join("-"))
    ) {
      setCategoriesHierarchy([...categoriesHierarchy, category]);
      form.resetFields(["category"]);
    }
  };

  return (
    <Spin spinning={loading}>
      <Form form={form} onFinish={onFinish}>
        <CategorySetting
          t={t}
          categoriesHierarchy={categoriesHierarchy}
          addCategoriesHierarchy={addCategoriesHierarchy}
        />
        <BasicInformation t={t} />
        <DetailedDescription t={t} formType={formType} ckEditor={ckEditor} />
        {/* <InformationUse t={t} /> */}
        <ImageRegistration t={t} />
        <div className="btn-group">
          <Button htmlType="submit" className="btn-danger">
            {t("common:confirm")}
          </Button>
        </div>
      </Form>
    </Spin>
  );
};

export default RegisterForm;

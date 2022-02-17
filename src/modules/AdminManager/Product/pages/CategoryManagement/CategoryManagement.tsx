import { Button, Card, Col, Form, Row, Spin, message } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import { useEffect, useState } from "react";

import { CURRENT_ENV } from "@core/configs/env";
import ModalDelete from "@core/components/Modal";
import PageTop from "@core/components/PageTop";
import ProductCategoryItem from "@root/modules/AdminManager/Product/components/Category/CategoryItem";
import ProductDisplaySetting from "@root/modules/AdminManager/Product/components/Category/CategoryDisplaySetting";
import ProductSetting from "@root/modules/AdminManager/Product/components/Category/CategoryProductSetting";
import categoriesApi from "@modules/AdminManager/Product/service/categories";
import useTranslate from "@core/hooks/useTranslate";

// import ProductSelectedBest from "@modules/AdminManager/components/Product/CategorySelectedBest";
const breadcrumbList = [
  {
    label: "common:products",
  },
  {
    label: "sidebar:admin-product:category-management",
  },
  {
    label: "sidebar:admin-product:category-management",
  },
];
const CategoryManagement = () => {
  const [t] = useTranslate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [categoriesFirst, setCategoriesFirst] = useState<any[]>([]);
  const [categoriesSecond, setCategoriesSecond] = useState<any[]>([]);
  const [categoriesThird, setCategoriesThird] = useState<any[]>([]);
  const [parentSecond, setParentSecond] = useState<any>(null);
  const [parentThird, setParentThird] = useState<any>(null);
  const [parentId, setParentId] = useState<number | null>(null);
  const [formType, setFormType] = useState<"create" | "update">("create");
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [idCategory, setIdCategory] = useState("");
  const [parentDepth, setParentDepth] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [currentFocus, setFocus] = useState<any[]>([]);
  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    setLoading(true);
    try {
      categoriesApi.getList().then((res) => {
        setCategoriesFirst(res);
        if (parentSecond) {
          const { id } = parentSecond;
          const itemParentSecond = res.find((item: any) => item.id === id);
          setCategoriesSecond(itemParentSecond.children);
          if (parentThird) {
            const { id } = parentThird;
            const itemParentThird = itemParentSecond.find((item: any) => item.id === id);
            setCategoriesThird(itemParentThird.children);
          }
        }
      });
    } catch (error: any) {
      logError(error);
    }
    setLoading(false);
  };

  const getCategory = (item: any) => {
    switch (item.depth) {
    case 1: {
      const children = item.children;
      setCategoriesSecond(children);
      setCategoriesThird([]);
      setParentSecond(item);
      setParentThird(null);
      setFocus([item.id]);
      setIsOpenForm(false);
      break;
    }
    case 2: {
      const children = item.children;
      setCategoriesThird(children);
      setParentThird(item);
      setFocus(c => [c[0], item.id]);
      setIsOpenForm(false);
      break;
    }
    default:
      setIsOpenForm(false);
      return;
    }
  };
  const changeFormsToSendAPI = (values: any) => {
    const { imgTopBanner = [] } = values;
    const file = imgTopBanner[0] || {};
    const { response = {} } = file;
    const imgTopBannerLink = response.filename ? CURRENT_ENV.IMG_URL + response.path : values.imgTopBannerLink;
    const body = {
      ...values,
      parentId: parentId || null,
      id: idCategory,
      listProductAll: values.listProductAll === "Y",
      listProductMobileAll: values.listProductMobileAll === "Y",
      bestProductAll: values.bestProductAll === "Y",
      bestProductMobileAll: values.bestProductMobileAll === "Y",
      listProductMobileView: values.listProductMobileView === "Y",
      listProductView: values.listProductView === "Y",
      bestProductView: values.bestProductView === "Y",
      bestProductMobileView: values.bestProductMobileView === "Y",
      view: values.view === "Y",
      imgTopBannerUse: values.imgTopBannerUse === "Y",
      imgTopBanner: response.filename || "",
      imgTopBannerLink,
    };
    return body;
  };
  const addCategory = async () => {
    setLoading(true);
    const values = form.getFieldsValue();
    const body = changeFormsToSendAPI(values);
    try {
      await categoriesApi[formType](body);
      getCategories();
      setIsOpenForm(false);
      form.resetFields();
      message.success(
        t(`common:${formType}-value-success`, undefined, {
          value: "category",
        }),
      );
    } catch (error: any) {
      logError(error);
    }
    setLoading(false);
  };

  const logError = (error: any) => {
    const { response } = error;

    if (response && response.data) {
      let { message: data } = response.data;

      if (Array.isArray(data)) {
        data = data[0];
      }

      // message.error(data);
    }
  };
  const editCategory = async (item: any) => {
    const oldCategory = {
      ...item,
      listProductAll: item.listProductAll ? "Y" : "N",
      listProductMobileAll: item.listProductMobileAll ? "Y" : "N",
      bestProductAll: item.bestProductAll ? "Y" : "N",
      bestProductMobileAll: item.bestProductMobileAll ? "Y" : "N",
      listProductMobileView: item.listProductMobileView ? "Y" : "N",
      listProductView: item.listProductView ? "Y" : "N",
      bestProductView: item.bestProductView ? "Y" : "N",
      bestProductMobileView: item.bestProductMobileView ? "Y" : "N",
      view: item.view ? "Y" : "N",
      imgTopBannerUse: item.imgTopBannerUse ? "Y" : "N",
      imgTopBanner: [{ response: { path: item.imgTopBanner } }],
    };
    setFormType("update");
    setIdCategory(item.id);
    setParentDepth(item.depth);
    setIsOpenForm(true);
    form.setFieldsValue(oldCategory);
    const element = document.getElementById("form-scroll");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const deleteCategory = () => {
    setLoading(true);
    categoriesApi
      .deleteById(idCategory)
      .then((res) => {
        setIsOpenForm(false);
        setFormType("create");
        getCategories();
        message.success(
          t("common:delete-value-success", undefined, {
            value: "category",
          }),
        );
      })
      .catch((error) => {
        // console.log("====error===", error);
        // message.error(t("common:message:error"));
      });
    setLoading(false);
  };

  const moveCategory = async (id: number, type: string, item: any) => {
    try {
      await categoriesApi.move(id, { type: type.toUpperCase() });
      getCategories();
      message.success(
        t("common:move-value-success", undefined, {
          value: "category",
        }),
      );
    } catch (error: any) {
      logError(error);
    }
  };

  const handleOpenForm = (parentCategory?: any) => {
    setIsOpenForm(true);
    setFormType("create");
    setParentId(parentCategory?.id);
    form.resetFields();
  };

  const hiddenModalDelete = () => {
    setVisible(false);
  };
  const setModalDelete = () => {
    setVisible(true);
  };

  const onOk = () => {
    deleteCategory();
    setVisible(false);
  };
  return (
    <>
      <Header>
        <PageTop t={t} title={t("sidebar:admin-product:category-management")} breadcrumbList={breadcrumbList} />
      </Header>
      <Content>
        <div className="product-category-inner">
          <Spin spinning={loading}>
            <Row gutter={8}>
              <Col span={8}>
                <Card
                  title={
                    <>
                      {t("product:category:1st-menu")}
                      <Button
                        onClick={() => handleOpenForm()}
                        size="small"
                        style={{ marginLeft: "5px" }}
                      >
                        {t("common:product-image:addition")}
                      </Button>
                    </>
                  }
                >
                  {categoriesFirst?.map((item: any, index: number) => (
                    <ProductCategoryItem
                      moveCategory={moveCategory}
                      getCategory={getCategory}
                      editCategory={editCategory}
                      key={item.id}
                      t={t}
                      item={item}
                      currentFocus={currentFocus[0]}
                      list={categoriesFirst}
                    />
                  ))}
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  title={
                    <>
                      {t("product:category:2nd-menu")}
                      {parentSecond && (
                        <Button
                          onClick={() => handleOpenForm(parentSecond)}
                          size="small"
                          style={{ marginLeft: "5px" }}
                        >
                          {t("common:product-image:addition")}
                        </Button>
                      )}
                    </>
                  }
                >
                  {categoriesSecond?.map((item: any) => (
                    <ProductCategoryItem
                      moveCategory={moveCategory}
                      getCategory={getCategory}
                      editCategory={editCategory}
                      key={item.id}
                      t={t}
                      item={item}
                      currentFocus={currentFocus[1]}
                      list={categoriesSecond}
                    />
                  ))}
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  title={
                    <>
                      {t("product:category:3rd-menu")}
                      {parentThird && (
                        <Button
                          onClick={() => handleOpenForm(parentThird)}
                          size="small"
                          style={{ marginLeft: "5px" }}
                        >
                          {t("common:product-image:addition")}
                        </Button>
                      )}
                    </>
                  }
                >
                  {categoriesThird?.map((item: any) => (
                    <ProductCategoryItem
                      moveCategory={moveCategory}
                      getCategory={getCategory}
                      editCategory={editCategory}
                      key={item.id}
                      t={t}
                      item={item}
                      currentFocus={-1}
                      list={categoriesThird}
                    />
                  ))}
                </Card>
              </Col>
            </Row>
            {isOpenForm && (
              <Form
                id="form-scroll"
                form={form}
                layout="vertical"
                className="category-setting"
                validateTrigger="onBlur"
                initialValues={{
                  bestProductAll: "N",
                  bestProductDisplay: 5,
                  bestProductMobileAll: "N",
                  bestProductMobileDisplay: 2,
                  bestProductMobileView: "N",
                  bestProductView: "N",
                  imgTopBannerTarget: "SELF",
                  imgTopBannerUse: "N",
                  imgTopMobileBannerTarget: "SELF",
                  listProductAll: "N",
                  listProductDisplay: 5,
                  listProductMobileAll: "N",
                  listProductMobileDisplay: 2,
                  listProductMobileView: "N",
                  listProductView: "N",
                  view: "N",
                }}
                onFinish={(values: any) => {
                  // console.log("Success", values);
                }}
              >
                <ProductSetting
                  parent={
                    parentDepth === 2 ? parentSecond : parentDepth === 3 ? parentThird : null
                  }
                  t={t}
                />
                <ProductDisplaySetting
                  name="list"
                  title={t("product:category:list-product")}
                  t={t}
                />
                <ProductDisplaySetting
                  name="best"
                  title={t("product:category:best-product")}
                  t={t}
                />
                {/* <ProductSelectedBest
                  name="best-product"
                  title={t("product:category:selected-best-product")}
                  t={t}
                /> */}
                <div className="btn-group">
                  <Button htmlType="submit" className="btn-danger" onClick={addCategory}>
                    {t("common:save")}
                  </Button>
                  <Button onClick={() => setModalDelete()}>
                    {t("common:delete")}
                  </Button>
                </div>
              </Form>
            )}
            <ModalDelete
              text={t("modal:title:delete")}
              t={t}
              visible={visible}
              onCancel={hiddenModalDelete}
              onOk={onOk}
            />
          </Spin>
        </div>
      </Content>
    </>
  );
};

export default CategoryManagement;

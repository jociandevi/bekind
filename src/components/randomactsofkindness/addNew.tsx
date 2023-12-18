import React, { useEffect, useRef, useState } from "react";
import {
  CenterAlignedFlexbox,
  StyledGrid,
  StyledInput,
} from "../shared/sharedLayouts";
import { spacingS, spacingXxs } from "../../common/variables";
import styled from "styled-components";
import type { InputRef } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { Category, KindnessAction } from "../../common/interfaces";
import { categories } from "../../common/mockData";
import { useGetApi, usePostApi } from "../../common/apiCalls";
import Loading from "../shared/loading";
import PageError from "../shared/pageError";
import { usePut } from "../../hooks/usePut";
import Button from "antd/es/button";
import Form from "antd/es/form";
import InputNumber from "antd/es/input-number";
import Steps from "antd/es/steps";
import Radio from "antd/es/radio";

const StyledRadioButton = styled(Button)`
  margin: ${spacingXxs};
`;

const AddNew: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const input1Ref = useRef<InputRef>(null);
  const input2Ref = useRef<InputRef>(null);
  const input3Ref = useRef<InputRef>(null);
  const input4Ref = useRef<InputRef>(null);
  const input5Ref = useRef<any>(null);
  const [category, setCategory] = useState<Category | undefined>(undefined);
  const { callPostApi, loading, error } = usePostApi("api/Kindness");
  const params = useParams();
  const navigate = useNavigate();
  const { callGetApi } = useGetApi(`api/Kindness/${params.id}`);
  const [action, setAction] = useState<KindnessAction | undefined>(undefined);
  const [form] = Form.useForm();
  const { callPut } = usePut(`api/Kindness/${params.id}`);

  useEffect(() => {
    async function fetchData() {
      if (params.id !== "new") {
        const response = await callGetApi();
        setAction(response?.data);
      }
    }
    fetchData();
  }, [callGetApi, params.id]);

  useEffect(() => {
    form.setFieldsValue({
      title: action?.title,
      titleFirstWord: action?.titleFirstWord,
      description: action?.description,
      imageUrl: action?.imageUrl,
      imageCredit: action?.imageCredit,
      duration: action?.duration,
    });
    setCategory(categories.find((item) => item.id === action?.category));
  }, [action, form]);

  const onFinish = (values: KindnessAction) => {
    const { imageCredit } = values;
    const credit = `Photo by Unsplash - ${imageCredit}`;
    const now = new Date();
    const result = {
      ...values,
      imageCredit: credit,
      id: 1,
      createdDate: now.toISOString(),
    };
    callPostApi(result).then((res) => {
      if (res?.status === 201) {
        form.resetFields();
      }
    });
  };

  const onEdit = (values: KindnessAction) => {
    const result = {
      ...values,
      id: action?.id,
    };
    callPut(result).then((res) => {
      console.log(res);
    });
  };

  const pressEnter = (
    _event: React.KeyboardEvent<HTMLInputElement>,
    nextRef?: React.RefObject<InputRef>
  ) => {
    if (current <= 4) {
      const next = current + 1;
      setCurrent(next);
      if (nextRef) {
        nextRef.current?.focus();
      }
    }
  };

  const pickCategory = (item: Category) => {
    setCategory(item);
    form.setFieldValue("category", item.id);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onChange = (value: number) => {
    setCurrent(value);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <StyledGrid>
      {error && (
        <PageError message="We couldn't add a new daily." description={error} />
      )}
      <CenterAlignedFlexbox
        style={{
          justifyContent: "space-between",
          marginBottom: spacingS,
        }}
      >
        <Title level={3}>
          {params.id === "new" ? "New Action" : "Edit Action"}
        </Title>
        <Button
          style={{ border: "none" }}
          icon={<UserOutlined />}
          onClick={() => navigate("/profile")}
        />
      </CenterAlignedFlexbox>

      <Form
        onFinish={params.id === "new" ? onFinish : onEdit}
        onFinishFailed={onFinishFailed}
        form={form}
      >
        <Steps
          direction="vertical"
          current={current}
          onChange={onChange}
          items={[
            {
              title: "What should we do?",
              description: (
                <Form.Item
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: "Please add a title!",
                    },
                  ]}
                >
                  <StyledInput
                    placeholder="E.g. do this"
                    onPressEnter={(event) => pressEnter(event, input2Ref)}
                    ref={input1Ref}
                  />
                </Form.Item>
              ),
            },
            {
              title: "Title first word",
              description: (
                <Form.Item
                  name="titleFirstWord"
                  rules={[
                    {
                      required: false,
                      message: "The title's first word in past tense.",
                    },
                  ]}
                >
                  <StyledInput
                    onPressEnter={(event) => pressEnter(event, input2Ref)}
                  />
                </Form.Item>
              ),
            },
            {
              title: "Add some more info",
              description: (
                <Form.Item
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Please add a description!",
                    },
                  ]}
                >
                  <StyledInput
                    onPressEnter={(event) => pressEnter(event, input3Ref)}
                    ref={input2Ref}
                  />
                </Form.Item>
              ),
            },
            {
              title: "Pick a category",
              description: (
                <Form.Item name="category">
                  <Radio.Group buttonStyle="solid">
                    {categories.map((item) => (
                      <StyledRadioButton
                        key={item.id}
                        value={item.name}
                        onClick={() => pickCategory(item)}
                        type={item === category ? "primary" : "default"}
                      >
                        {item.name}
                      </StyledRadioButton>
                    ))}
                  </Radio.Group>
                </Form.Item>
              ),
            },
            {
              title: "Image url",
              description: (
                <Form.Item
                  name="imageUrl"
                  rules={[
                    {
                      required: true,
                      message: "Please specify an image url!",
                    },
                  ]}
                >
                  <StyledInput
                    onPressEnter={(event) => pressEnter(event, input4Ref)}
                    ref={input3Ref}
                  />
                </Form.Item>
              ),
            },
            {
              title: "Image credit",
              description: (
                <Form.Item
                  name="imageCredit"
                  rules={[
                    {
                      required: true,
                      message: "Whose picture is it?",
                    },
                  ]}
                >
                  <StyledInput
                    onPressEnter={(event) => pressEnter(event, input5Ref)}
                    ref={input4Ref}
                  />
                </Form.Item>
              ),
            },
            {
              title: "Duration",
              description: (
                <Form.Item
                  name="duration"
                  rules={[
                    {
                      required: true,
                      message: "How long does this action take?",
                    },
                  ]}
                >
                  <InputNumber ref={input5Ref} />
                </Form.Item>
              ),
            },
          ]}
        />
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginTop: spacingS }}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </StyledGrid>
  );
};

export default AddNew;

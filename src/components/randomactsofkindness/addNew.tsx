import React, { useRef, useState } from "react";
import {
  CenterAlignedFlexbox,
  IconButton,
  StyledButton,
  StyledGrid,
  StyledInput,
} from "../shared/sharedLayouts";
import { Button, Form, Radio, Steps } from "antd";
import { variables } from "../../common/variables";
import styled from "styled-components";
import type { InputRef } from "antd";
import { Category, categories } from "./randomActsOfKindnessList";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import UploadImage from "../shared/uploadImage";
import Title from "antd/es/typography/Title";

const StyledRadioButton = styled(Button)`
  margin: ${variables.spacingXxs};
`;

const AddNew: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const input1Ref = useRef<InputRef>(null);
  const input2Ref = useRef<InputRef>(null);
  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log(values);
    // TODO: lets get response / data / url / whatever we need from response from UploadImage and use it here
    // TODO: lets send this to the backend
  };

  const pressEnter = (
    _event: React.KeyboardEvent<HTMLInputElement>,
    nextRef?: React.RefObject<InputRef>
  ) => {
    if (current <= 2) {
      const next = current + 1;
      setCurrent(next);
      if (nextRef) {
        nextRef.current?.focus();
      }
    }
  };

  const pickCategory = (item: Category) => {
    setCategory(item);
    form.setFieldValue("category", item);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onChange = (value: number) => {
    setCurrent(value);
  };

  return (
    <StyledGrid>
      <CenterAlignedFlexbox
        style={{
          justifyContent: "space-between",
          marginBottom: variables.spacingS,
        }}
      >
        <Title level={3}>Add New</Title>
        <IconButton
          backgroundcolor={variables.black}
          icon={<UserOutlined />}
          onClick={() => navigate("/profile")}
        />
      </CenterAlignedFlexbox>

      <Form onFinish={onFinish} onFinishFailed={onFinishFailed} form={form}>
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
              title: "Add some more info",
              description: (
                <Form.Item
                  name="desciption"
                  rules={[
                    {
                      required: true,
                      message: "Please add a description!",
                    },
                  ]}
                >
                  <StyledInput onPressEnter={pressEnter} ref={input2Ref} />
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
              title: "Add an image",
              description: (
                <CenterAlignedFlexbox>
                  <UploadImage />
                </CenterAlignedFlexbox>
              ),
            },
          ]}
        />
        <Form.Item>
          <StyledButton
            type="primary"
            htmlType="submit"
            style={{ marginTop: variables.spacingS }}
          >
            Save
          </StyledButton>
        </Form.Item>
      </Form>
    </StyledGrid>
  );
};

export default AddNew;

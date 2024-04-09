import React, { useState } from "react";
import { Flexbox, StyledInput } from "../shared/sharedLayouts";
import { lightGray, middleGray, spacingS } from "../../common/variables";
import styled from "styled-components";
import { lgBreakPoint } from "../../common/mediaQueryHook";
import { usePostApi } from "../../common/apiCalls";
import Loading from "../shared/loading";
import Button from "antd/es/button";
import Title from "antd/es/typography/Title";
import Form from "antd/es/form";
import { ArrowRightOutlined } from "@ant-design/icons";

export const ArticleImage = styled.img`
  width: 100vw;
  height: ${100 / 1.618}vw;
  @media only screen and ${lgBreakPoint} {
    width: 50vw;
    height: ${50 / 1.618}vw;
  }
  border-radius: 0;
  object-fit: cover;
`;

interface SubscribeProps {
  email: string;
}

const facebookGroupUrl = "https://www.facebook.com/groups/outbreaklife/";

interface Props {
  lg?: boolean;
}

const SubscribeForm: React.FC<Props> = ({ lg }) => {
  const [form] = Form.useForm();
  const { callPostApi, loading } = usePostApi("api/Member/Subscribe");
  const [success, setSuccess] = useState(false);

  const submit = (values: SubscribeProps) => {
    callPostApi(values).then((res) => {
      if (res?.status === 201) {
        form.resetFields();
        setSuccess(true);
        setTimeout(() => {
          window.location.href = facebookGroupUrl;
        }, 1000);
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        width: lg ? "50vw" : "auto",
        flexDirection: "column",
      }}
    >
      <Title
        level={4}
        color={middleGray}
        style={{ margin: "5vh auto", textTransform: "uppercase" }}
      >
        Join the movement
      </Title>
      {loading && <Loading />}
      {success ? (
        <Title
          level={5}
          color={lightGray}
          style={{ marginLeft: "15%", marginRight: "15%" }}
        >
          We are so happy you're here! Your journey has just started.
        </Title>
      ) : (
        <Form form={form} onFinish={submit}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please provide a valid email address",
              },
            ]}
            style={{ marginLeft: "15%", marginRight: "15%" }}
          >
            <Flexbox style={{ gap: spacingS }}>
              <StyledInput placeholder="Your email" />
              <Button
                icon={<ArrowRightOutlined />}
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Flexbox>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default SubscribeForm;

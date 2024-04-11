import React, { useState } from "react";
import styled from "styled-components";
import Title from "antd/es/typography/Title";
import {
  borderRadius,
  lightGray,
  shadow1,
  spacingM,
} from "../../common/variables";
import Form from "antd/es/form";
import { usePostApi } from "../../common/apiCalls";
import { SubscribeProps } from "./subscribeForm";
import { facebookGroupUrl } from "../../common/util";
import { FlexboxCol, StyledInput } from "../shared/sharedLayouts";
import Button from "antd/es/button";
import { ArrowRightOutlined } from "@ant-design/icons";
import Typography from "antd/es/typography/Typography";

const LeaveContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30vw;
  position: absolute;
  top: 5px;
  right: 5px;
  border-radius: ${borderRadius}px;
  box-shadow: ${shadow1};
  padding: ${spacingM};
`;

const AreYouSureToLeave: React.FC = () => {
  const [form] = Form.useForm();
  const { callPostApi } = usePostApi("api/Member/Subscribe");
  const [success, setSuccess] = useState(false);

  const submit = (values: SubscribeProps) => {
    callPostApi(values).then((res) => {
      if (res?.status === 200) {
        form.resetFields();
        setSuccess(true);
        setTimeout(() => {
          window.location.href = facebookGroupUrl;
        }, 1000);
      }
    });
  };

  return (
    <>
      <LeaveContainer>
        <Title level={5} color={lightGray} style={{ margin: "3vh auto 0" }}>
          Heroes also want to leave sometimes.
        </Title>
        <Typography color={lightGray} style={{ margin: "1vh auto 3vh" }}>
          Are you sure?
        </Typography>
        {success ? (
          <Typography
            color={lightGray}
            style={{ marginLeft: "15%", marginRight: "15%" }}
          >
            We are so happy you're here! Your journey has just started.
          </Typography>
        ) : (
          <Form form={form} onFinish={submit}>
            <FlexboxCol>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please provide a valid email address",
                  },
                ]}
                style={{ marginLeft: spacingM, marginRight: spacingM }}
              >
                <StyledInput placeholder="Your email" />
              </Form.Item>
              <Button
                icon={<ArrowRightOutlined />}
                type="default"
                htmlType="submit"
              >
                All right fine, sign me up!
              </Button>
            </FlexboxCol>
          </Form>
        )}
      </LeaveContainer>
    </>
  );
};

export default AreYouSureToLeave;

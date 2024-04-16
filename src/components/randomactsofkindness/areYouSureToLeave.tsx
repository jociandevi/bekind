import React from "react";
import styled from "styled-components";
import Title from "antd/es/typography/Title";
import {
  borderRadius,
  lightGray,
  shadow1,
  spacingM,
  white,
} from "../../common/variables";
import Form from "antd/es/form";
import { FlexboxCol, StyledInput } from "../shared/sharedLayouts";
import Button from "antd/es/button";
import { ArrowRightOutlined } from "@ant-design/icons";
import Typography from "antd/es/typography/Typography";

const catSrc =
  "https://d1rrsclargbwjh.cloudfront.net/Assets/optin-landing/cica.jpeg";

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
  background-color: ${white};
`;

export const Image = styled.img`
  width: 100vw;
  height: ${100 / 1.618}vw;
  width: 50%;
  height: 50%;
  border-radius: 0;
  object-fit: cover;
  margin: 0 auto;
`;

interface Props {
  submit: (values: any) => void;
  success?: boolean;
}

const AreYouSureToLeave: React.FC<Props> = ({ submit, success }) => {
  const [form] = Form.useForm();

  return (
    <>
      <LeaveContainer>
        {!success && (
          <>
            <Image src={catSrc} alt={`Join the movement`} />

            <Title level={5} color={lightGray} style={{ margin: "3vh auto 0" }}>
              Heroes also want to leave sometimes.
            </Title>
            <Typography color={lightGray} style={{ margin: "1vh auto 3vh" }}>
              Are you sure?
            </Typography>
          </>
        )}
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

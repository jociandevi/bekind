import { Button, Checkbox, Form, Input } from "antd";
import Title from "antd/es/typography/Title";
import {
  StyledButton,
  StyledContainer,
  StyledInput,
  StyledText,
  StyledTitle,
} from "../shared/sharedLayouts";
import { variables } from "../shared/variables";

const Login: React.FC = () => {
  const onFinish = (values: any) => {
    // lets make a backend call here to authenticate
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <StyledContainer>
      <StyledTitle level={3} color={variables.black}>
        Hey!
      </StyledTitle>
      <StyledText
        color={variables.middleGray}
        fontSize="14px"
        fontWeight="inherit"
      >
        Absolutely anything will let you in right now.
      </StyledText>
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
          style={{ marginTop: "40px", marginBottom: "40px" }}
        >
          <StyledInput placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
          style={{ marginTop: "40px", marginBottom: "40px" }}
        >
          <StyledInput type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>
            <StyledText
              color={variables.black}
              fontSize="12px"
              fontWeight="bold"
            >
              Remember me
            </StyledText>
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <StyledButton
            type="primary"
            htmlType="submit"
            backgroundColor={variables.blue1}
          >
            LOGIN
          </StyledButton>
        </Form.Item>
      </Form>
    </StyledContainer>
  );
};

export default Login;

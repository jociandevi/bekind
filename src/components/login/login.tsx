import { Checkbox, Form } from "antd";
import { useNavigate } from "react-router-dom";
import {
  StyledButton,
  StyledGrid,
  StyledInput,
  StyledText,
} from "../shared/sharedLayouts";
import { variables } from "../../common/variables";
import Title from "antd/es/typography/Title";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    // lets make a backend call here to authenticate
    navigate("/random-act-of-kindness");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <StyledGrid>
      <Title level={3}>Hey!</Title>
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
          <StyledButton type="primary" htmlType="submit">
            LOGIN
          </StyledButton>
        </Form.Item>
      </Form>
    </StyledGrid>
  );
};

export default Login;

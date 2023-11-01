import React, { useEffect, useRef, useState } from "react";
import {
  CenterAlignedFlexbox,
  StyledGrid,
  StyledInput,
} from "../shared/sharedLayouts";
import { Button, Form, Select, Steps } from "antd";
import { variables } from "../../common/variables";
import type { InputRef } from "antd";
import { useParams } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { BadgeProps, KindnessAction } from "../../common/interfaces";
import { useGetApi, usePostApi } from "../../common/apiCalls";
import Loading from "../shared/loading";
import PageError from "../shared/pageError";
import { usePut } from "../../hooks/usePut";
import type { SelectProps } from "antd";

const AddEditBadge: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const input1Ref = useRef<InputRef>(null);
  const input2Ref = useRef<InputRef>(null);
  const input3Ref = useRef<InputRef>(null);
  const input4Ref = useRef<InputRef>(null);
  const { callPostApi, loading, error } = usePostApi("api/Badge");
  const { callGetApi: getActions } = useGetApi(`api/Kindness`);

  const params = useParams();
  const { callGetApi } = useGetApi(`api/Badge/${params.id}`);
  const [badge, setBadge] = useState<BadgeProps | undefined>(undefined);
  const [actions, setActions] = useState<KindnessAction[] | []>([]);
  const [form] = Form.useForm();
  const { callPut } = usePut(`api/Badge/${params.id}`);
  const [options, setOptions] = useState<SelectProps["options"] | []>([]);

  // get badge if we are editing
  useEffect(() => {
    async function fetchData() {
      if (params.id) {
        const response = await callGetApi();
        setBadge(response?.data);
      }
    }
    fetchData();
  }, [callGetApi, params.id]);

  // get all kindness to pick necessary actions
  useEffect(() => {
    async function fetchData() {
      const response = await getActions();
      setActions(response?.data);
    }
    fetchData();
  }, [getActions]);

  // update select options based on possible kindness actions
  useEffect(() => {
    actions?.forEach((action) => {
      setOptions((prev) => [
        ...(prev as []),
        { value: action.id?.toString(), label: action.title },
      ]);
    });
  }, [actions]);

  // set initial form data when editing
  useEffect(() => {
    form.setFieldsValue({
      name: badge?.name,
      description: badge?.description,
      tooltip: badge?.tooltip,
      kindnessIds: badge?.kindnessIds?.map((item) => item.toString()),
    });
  }, [badge, form]);

  const onFinish = (values: BadgeProps) => {
    const now = new Date();
    const result = {
      ...values,
      id: 1,
      createdDate: now.toISOString(),
      isOwnedByMember: false,
    };
    callPostApi(result).then((res) => {
      if (res?.status === 201) {
        form.resetFields();
      }
    });
  };

  const onEdit = (values: BadgeProps) => {
    const result = {
      ...values,
      id: badge?.id,
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

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onChange = (value: number) => {
    setCurrent(value);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <StyledGrid>
      {error && (
        <PageError message="We couldn't add a new badge." description={error} />
      )}
      <CenterAlignedFlexbox
        style={{
          justifyContent: "space-between",
          marginBottom: variables.spacingS,
        }}
      >
        <Title level={3}>{params.id ? "Edit Badge" : "Add New Badge"}</Title>
      </CenterAlignedFlexbox>

      <Form
        onFinish={params.id ? onEdit : onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
      >
        <Steps
          direction="vertical"
          current={current}
          onChange={onChange}
          items={[
            {
              title: "What is the badge's name?",
              description: (
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please add a name!",
                    },
                  ]}
                >
                  <StyledInput
                    placeholder="E.g. Outfit Champ"
                    onPressEnter={(event) => pressEnter(event, input2Ref)}
                    ref={input1Ref}
                  />
                </Form.Item>
              ),
            },
            {
              title: "Description",
              description: (
                <Form.Item
                  name="description"
                  rules={[
                    {
                      required: true,
                      message:
                        "E.g. You are an amazing neighbor! I'd love to live in your street!",
                    },
                  ]}
                >
                  <StyledInput
                    onPressEnter={(event) => pressEnter(event, input3Ref)}
                    ref={input2Ref}
                    placeholder="The text that is displayed when the badge is reached."
                  />
                </Form.Item>
              ),
            },
            {
              title: "Tooltip",
              description: (
                <Form.Item
                  name="tooltip"
                  rules={[
                    {
                      required: true,
                      message:
                        "We show this as a hint when the badge is not yet received.",
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
              title: "Necessary actions",
              description: (
                <Form.Item name="kindnessIds">
                  <Select
                    mode="tags"
                    style={{ width: "100%" }}
                    onChange={handleChange}
                    options={options}
                  />
                </Form.Item>
              ),
            },
          ]}
        />
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginTop: variables.spacingS }}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </StyledGrid>
  );
};

export default AddEditBadge;

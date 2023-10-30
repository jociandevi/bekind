import React, { useEffect, useRef } from "react";
import { StyledSearch } from "./sharedLayouts";
import { variables } from "../../common/variables";
import { KindnessAction } from "../../common/interfaces";
import { Form } from "antd";

interface Props {
  setFilteredActions: (
    value: React.SetStateAction<[] | KindnessAction[]>
  ) => void;
  actions: KindnessAction[];
}

const Search: React.FC<Props> = ({ setFilteredActions, actions }) => {
  const [form] = Form.useForm();
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, []);

  const onFinish = (values: any) => {
    onSearch(values.search);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onChange = (_e?: React.ChangeEvent<HTMLInputElement>) => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    // Search after 0.7 seconds
    searchTimeout.current = setTimeout(() => {
      onSearch();
    }, 700);
  };

  const onSearch = (_e?: React.KeyboardEvent<HTMLInputElement>) => {
    const searchValue = form.getFieldValue("search");
    const searchTerm = searchValue.toLowerCase();

    if (!searchTerm) {
      setFilteredActions(actions);
      return;
    } else {
      const filteredRaoks = actions.filter((item) => {
        const title = item.title.toLowerCase();
        const description = item.description?.toLowerCase();
        return title.includes(searchTerm) || description?.includes(searchTerm);
      });

      setFilteredActions(filteredRaoks);
    }
  };

  return (
    <Form
      style={{
        padding: variables.spacingXs,
        width: "100vw",
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      form={form}
    >
      <Form.Item name="search">
        <StyledSearch
          placeholder="Search"
          onChange={onChange}
          onPressEnter={onSearch}
          allowClear
        />
      </Form.Item>
    </Form>
  );
};

export default Search;

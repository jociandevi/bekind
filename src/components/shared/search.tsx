import React, { useEffect, useRef } from "react";
import { StyledSearch } from "./sharedLayouts";
import { KindnessAction } from "../../common/interfaces";

interface Props {
  setFilteredActions: (
    value: React.SetStateAction<[] | KindnessAction[]>
  ) => void;
  actions: KindnessAction[];
}

const Search: React.FC<Props> = ({ setFilteredActions, actions }) => {
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, []);

  const onChange = (e?: React.ChangeEvent<HTMLInputElement>) => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    // Search after 0.7 seconds
    searchTimeout.current = setTimeout(() => {
      onSearch(e?.target.value!);
    }, 700);
  };

  const onSearch = (term: string) => {
    if (term === "") {
      setFilteredActions(actions);
      return;
    } else {
      const filteredRaoks = actions.filter((item) => {
        const title = item.title.toLowerCase();
        const description = item.description?.toLowerCase();
        return (
          title.includes(term.toLowerCase()) ||
          description?.includes(term.toLowerCase())
        );
      });

      setFilteredActions(filteredRaoks);
    }
  };

  return (
    <StyledSearch
      placeholder="Search"
      onChange={onChange}
      allowClear
      id="search"
    />
  );
};

export default Search;

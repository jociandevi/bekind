import { useEffect, useMemo, useState } from "react";

export const mdBreakPoint = "(min-width: 600px)";
export const lgBreakPoint = "(min-width: 900px)";
export const xlBreakPoint = "(min-width: 1600px)";

const useMediaQuery = (query: string) => {
  const mediaQuery = useMemo(() => window.matchMedia(query), [query]);
  const [match, setMatch] = useState(mediaQuery.matches);

  useEffect(() => {
    const onChange = () => setMatch(mediaQuery.matches);
    mediaQuery.addEventListener("change", onChange);

    return () => mediaQuery.removeEventListener("change", onChange);
  }, [mediaQuery]);

  return match;
};

export const useMediaQueries = () => {
  const md = useMediaQuery(mdBreakPoint);
  const lg = useMediaQuery(lgBreakPoint);
  const xl = useMediaQuery(xlBreakPoint);

  return { md, lg, xl };
};

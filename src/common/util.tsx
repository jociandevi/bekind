export const transformTitleToUrl = (title: string) => {
  let formattedString = title.toLowerCase();
  formattedString = formattedString
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-");
  return formattedString;
};

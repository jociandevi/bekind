import { ThemeConfig } from "antd/es/config-provider";
import { variables } from "./variables";

export const theme: ThemeConfig = {
  token: {
    colorPrimary: variables.pink3,
    colorError: variables.pink2,
    colorInfo: variables.middleGray,
    colorLink: variables.darkGray,
    colorTextBase: variables.black,
    controlHeight: 40,
    boxShadow: "rgba(0, 0, 0, 0.25) 0px 5px 15px;",
    boxShadowSecondary: "rgba(0, 0, 0, 0.25) 0px 5px 15px;",
    borderRadius: variables.borderRadius,
    lineHeight: 2,
  },
};

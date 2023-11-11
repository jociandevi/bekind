import { ThemeConfig } from "antd/es/config-provider";
import {
  black,
  borderRadius,
  darkGray,
  middleGray,
  pink2,
  pink3,
} from "./variables";

export const theme: ThemeConfig = {
  token: {
    colorPrimary: pink3,
    colorError: pink2,
    colorInfo: middleGray,
    colorLink: darkGray,
    colorTextBase: black,
    controlHeight: 40,
    boxShadow: "rgba(0, 0, 0, 0.25) 0px 5px 15px;",
    boxShadowSecondary: "rgba(0, 0, 0, 0.25) 0px 5px 15px;",
    borderRadius: borderRadius,
    lineHeight: 2,
  },
};

import styled from "@emotion/styled";
import { Menu } from "antd";

const StyledMenu = styled(Menu, { shouldForwardProp: (prop: string) => !prop.startsWith("$") })<{ $isDarkMode: boolean }>`
  border: none !important;
  background-color: transparent;
  padding-inline: 12px;
  padding-bottom: 12px;
  border: 0 !important;
  width: 100%;

  .ant-menu-sub {
    background: transparent !important;
  }

  .ant-menu-item,
  .ant-menu-submenu-title {
    padding-block: 12px;
    margin-inline: 0;
    height: auto !important;
    width: 100%;
    display: flex;
    align-items: center;

    svg {
      min-width: 24px !important;
      min-height: 20px !important;
    }

    .ant-menu-title-content {
      margin-left: 12px;
      line-height: 24px;
    }
  }
  .ant-menu-item-selected {
    color: ${({ $isDarkMode }) => ($isDarkMode ? "white" : "black")} !important;
    background: ${({ $isDarkMode }) => ($isDarkMode ? "rgba(255, 255, 255, 0.10)" : "rgba(28, 28, 28, 0.05)")} !important;
  }
`;
export default StyledMenu;

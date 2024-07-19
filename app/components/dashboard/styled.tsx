import styled from "@emotion/styled";

export const Styled = styled.div`
  .box-list {
    display: flex;
    max-width: 100%;
    gap: 8px;
    .boxes {
      max-width: 100%;
      overflow-x: auto;
      height: 120px;
      width: 100%;

      .box {
        position: relative;
        height: 90px;
        min-width: 90px;
        max-width: 120px;
        flex: 1;

        .remove-box {
          position: absolute;
          bottom: 0px;
          left: 50%;
          opacity: 0;
          visibility: collapse;
          transition: all 0.2s ease;
          transform: translate(-50%);
        }

        &:hover {
          cursor: pointer;
          .remove-box {
            opacity: 1;
            bottom: -25px;
            visibility: visible;
          }
        }
      }

      ::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
    }
    .add {
      width: 90px;
      min-height: 90px;
      cursor: pointer;
    }
  }
`;

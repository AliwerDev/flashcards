import styled from "@emotion/styled";

export const Styled = styled.div`
  .box-list {
    display: flex;
    max-width: 100%;
    gap: 8px;
    .boxes {
      max-width: 100%;
      overflow-x: auto;
      margin: 0 auto;

      .box {
        width: 55px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .box-content {
          width: 45px;
          height: 45px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;

          .remove-box {
            position: absolute;
            top: 0;
            right: 0;
            opacity: 0;
            visibility: collapse;
            transition: all 0.2s ease;
            transform: translate(50%, -50%);
          }
          &:hover {
            cursor: pointer;
            .remove-box {
              opacity: 1;
              visibility: visible;
            }
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

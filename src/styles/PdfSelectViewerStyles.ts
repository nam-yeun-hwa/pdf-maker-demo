import styled from "@emotion/styled";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex: 4;
  height: 100%;
  align-items: flex-start;
  background: #e9e9e9;
  border-radius: 8px;
`;

export const ScrollView = styled.div`
  height: 100%;
  overflow-y: scroll;
`;

export const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

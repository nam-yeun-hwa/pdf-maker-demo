import styled from "@emotion/styled";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  min-width: 320px;
  max-width: 320px;
  background: #e9e9e9;
  overflow: hidden;
  border-radius: 8px;
  padding: 12px;
`;

export const ThumbnailContainer = styled.div`
  height: 100%;
`;

export const ThumbnailGrid = styled.div`
  height: 100%;
  overflow-y: auto;
`;

export const ThumbnailImage = styled.div`
  img {
    width: 100%;
    height: auto;
  }
  p {
    margin: 4px 0;
    font-size: 12px;
    text-align: center;
  }
`;

export const ErrorMsg = styled.h3<{ color?: string }>`
  font-size: 16px;
  font-weight: 400;
  padding: 10px;
  color: ${(props) => props.color || "#555"};
`;

import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: left;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const PreviewSection = styled.div`
  margin-top: 20px;
`;

export const Subtitle = styled.h3<{ color?: string }>`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 15px;
  color: ${(props) => props.color || "#555"};
`;

export const StampGrid = styled.div`
  max-width: 220px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

export const WarningText = styled.p`
  margin-top: 15px;
  font-size: 14px;
  color: blue;
  letter-spacing: -0.4px;
`;

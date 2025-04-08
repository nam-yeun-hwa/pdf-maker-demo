/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

export const Container = styled.div`
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  max-width: 300px;

  strong {
    color: #2c3e50;
    font-weight: 600;
  }
`;

export const NoFileStyles = styled.div`
  padding: 16px;
  color: #7f8c8d;
  font-style: italic;
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  font-weight: bold;
  padding: 0 4px;
`;

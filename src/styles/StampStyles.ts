import styled from "@emotion/styled";

export const StampContainer = styled.div`
  position: relative;
  margin: 10px;
  text-align: center;
  border: 1px solid gray;
  padding: 5px;
  cursor: pointer;
`;

export const RemoveButton = styled.button`
  position: absolute;
  bottom: 5px;
  right: 5px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 2px 6px;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #cc0000;
  }
`;

export const StampImage = styled.img`
  max-width: 80px;
  height: auto;
`;

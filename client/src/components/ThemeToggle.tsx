import React, { Dispatch } from "react";
import styled, { StyledComponent } from "styled-components";

interface IThemeToggle {
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const ToggleWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.main.primary.background};
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  justify-self: center;
  display: flex;
  justify-content: center;
  gap: 25px;
  margin-bottom: 20px;
`;

const ColorItem = styled.button`
  background-color: ${(props) => props.color};
  height: 30px;
  width: 30px;
  border-radius: 50px;
  border: 1px solid ${(props) => props.theme.colors.main.primary.default};
  cursor: pointer;
`;

const themeColorArray = [
  {
    id: 0,
    name: "lightTheme",
    color: "#F8F8FB",
  },
  {
    id: 1,
    name: "darkTheme",
    color: "141625",
  },
  {
    id: 2,
    name: "blueTheme",
    color: "141625",
  },
];

const ThemeToggle: React.FC<IThemeToggle> = ({ setTheme }) => {
  return (
    <ToggleWrapper>
      {themeColorArray.map((item: typeof themeColorArray[0]) => (
        <ColorItem
          key={item.id}
          color={item.color}
          onClick={() => setTheme(item.name)}
        />
      ))}
    </ToggleWrapper>
  );
};

export default ThemeToggle;
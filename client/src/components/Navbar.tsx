import React from "react";
import styled from "styled-components";

import { useDataStore } from "../store/store";
import { useModalStore } from "../store/modalStore";
import Button from "./shared/Button";
import DropDown from "./shared/DropDown";

const NavbarWrapper = styled.nav`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 96px;
  background-color: ${(props) => props.theme.colors.main.white};
  color: ${(props) => props.theme.colors.text.primary};
  border-bottom: 1px solid ${(props) => props.theme.colors.main.border};
`;

const NavbarLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  min-width: 300px;
  border-right: 1px solid ${(props) => props.theme.colors.main.border};
  padding: 21px;

  @media screen and (max-width: 900px) {
    min-width: 100px;
  }
`;

const LogoText = styled.h1`
  font-size: 35px;

  &::first-letter {
    color: ${(props) => props.theme.colors.main.primary.light};
  }

  @media screen and (max-width: 900px) {
    font-size: 20px;
  }
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  padding: 0 25px;
  justify-content: space-between;
  align-items: center;
`;

const Tab = styled.h1`
  font-weight: 600;

  @media screen and (max-width: 600px) {
    font-size: 15px;
  }
`;

const OptionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media screen and (max-width: 900px) {
    gap: 2px;
  }
`;

const NavButton = styled(Button)`
  @media screen and (max-width: 900px) {
    padding: 5px 8px;
  }
`;

const ButtonText = styled.span`
  font-size: 18px;
  font-weight: 600;

  @media screen and (max-width: 900px) {
    font-size: 15px;
  }
`;

const Navbar = () => {
  const { boardTab, currentBoardStatus } = useDataStore((state: any) => state);
  const { openModal } = useModalStore((state: any) => state);

  return (
    <NavbarWrapper>
      <NavbarLogoWrapper>
        <LogoText>jumble</LogoText>
      </NavbarLogoWrapper>
      <Header>
        <Tab>{boardTab}</Tab>
        <OptionsWrapper>
          <NavButton
            onClick={() =>
              openModal({
                type: "New Task",
                statusArr: currentBoardStatus,
                boardTab: boardTab,
              })
            }
          >
            <ButtonText>Add New Task</ButtonText>
          </NavButton>
          <DropDown
            text="board"
            onClickEdit={() => openModal({ type: "Edit Board" })}
            onClickDelete={() => openModal({ type: "Delete Board" })}
          />
        </OptionsWrapper>
      </Header>
    </NavbarWrapper>
  );
};

export default Navbar;

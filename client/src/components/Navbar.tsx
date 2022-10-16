import React from "react";
import styled from "styled-components";

import Button from "./shared/Button";

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
`;

const LogoText = styled.h1`
  font-size: 35px;
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
`;

const OptionsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonText = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

const Options = styled.div``;

const Navbar = () => {
  return (
    <NavbarWrapper>
      <NavbarLogoWrapper>
        <LogoText>frugal</LogoText>
      </NavbarLogoWrapper>
      <Header>
        <Tab>Platform Launch</Tab>
        <OptionsWrapper>
          <Button>
            <ButtonText>Add New Task</ButtonText>
          </Button>
          <Options></Options>
        </OptionsWrapper>
      </Header>
    </NavbarWrapper>
  );
};

export default Navbar;

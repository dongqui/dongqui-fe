import Link from 'next/link';
import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

import { useUserQuery, useLogoutMutation } from '../hooks';

const HomePage: NextPage = () => {
  const user = useUserQuery();
  const logout = useLogoutMutation();

  const handleClickLogout = () => {
    logout.mutate();
  }

  return (
    <>
      <Header>
        <Nav>
          <Link href='/'>
            <Title>HAUS</Title>
          </Link>
          {
          user?.data?.ID ? 
            (<Profile>
              {user?.data?.ID}
              <LogoutButton onClick={handleClickLogout}>logout</LogoutButton>
            </Profile>) :
          
            (<Link href='/login'>
              <p>login</p>
            </Link>)
          }        
        </Nav>        
      </Header>
      <Container>
        <Link href='/pagination?page=1'>
          <StyledLink>pagination</StyledLink>
        </Link>
        <Link href='/infinite-scroll'>
          <StyledLink>infinite scroll</StyledLink>
        </Link>
      </Container>
    </>
  );
};

export default HomePage;

const Header = styled.header`  
  padding: 20px;
`;
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;  
`;
const Title = styled.a`
  font-size: 48px;
`;

const Container = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 40px;
`;

const StyledLink = styled.a`
  display: flex;
  justify-content: center;
  width: 240px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;
  font-size: 24px;

  & + & {
    margin-top: 40px;
  }
`;

const Profile = styled.section`
  display: flex;
  flex-direction: column;
  align-items: end;
`

const LogoutButton = styled.button`
  width: 45px;
  cursor: pointer;
`;
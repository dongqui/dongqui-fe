import styled from 'styled-components';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

import { useUserQuery, useLogoutMutation } from '../hooks';

const Layout = ({ children }: PropsWithChildren<{}>) => {
  const user = useUserQuery();
  const logout = useLogoutMutation();

  const handleClickLogout = () => {
    logout.mutate();
  }
  
  return (
    <>
      <Content>
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
        {children}
      </Content>
    </>    
  )  
}

export default Layout;

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
const Profile = styled.section`
  display: flex;
  flex-direction: column;
  align-items: end;
`

const LogoutButton = styled.button`
  width: 45px;
  cursor: pointer;
`;

const Content = styled.main`
  width: 420px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #fff;
`;

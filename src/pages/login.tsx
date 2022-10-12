import Link from 'next/link';
import type { NextPage } from 'next';
import styled from 'styled-components';
import router from 'next/router'

import { useLoginMutation, useForm, useUserQuery } from '../hooks';
import type { LoginPayload } from '../types';

const LoginPage: NextPage = () => {
  const user = useUserQuery();
  const { mutate } = useLoginMutation();
  const { register, errors, handleSubmit, isAllValid, setError } = useForm();   

  const handleSubmitCallback = (params: LoginPayload) => {  
    mutate(params, {      
      onSuccess() {
        router.replace('/');
      },
      onError(e) {
        if (e.status === 401.1) {
          setError('id', '존재 하지 않는 아이디 입니다.')
        } else if (e.status === 401.2) {
          setError('password', '비밀번호가 틀렸습니다.')
        }
      },
    })
  }

  if (user.data?.ID) {
    router.replace('/');
  }
  return (
    <>
      <Header>
        <Link href='/'>
          <Title>HAUS</Title>
        </Link>
        <Link href='/login'>
          <p>login</p>
        </Link>
      </Header>
      <Form onSubmit={handleSubmit(handleSubmitCallback)}>
        <label>아이디</label>
        <TextInput type='text' {...register('id', {
          validations:[{
              pattern: (value) => /^[a-zA-Z0-9]{5,30}$/.test(value),
              errorMessage: '올바른 아이디 형식으로 입력해주세요.'
            }            
          ]
        })}/>
        {errors.id && <ErrorMessage>{errors.id}</ErrorMessage>}
        
        <Spacing />      
        
        <label>비밀번호</label>
        <TextInput type='password' {...register('password', {
          validations:[{
            pattern: (value) => /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,30}$/.test(value),
            errorMessage: '올바른 비밀번호 형식으로 입력해주세요'
          }            
        ]
        })}/>
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}

        <LoginButton disabled={!isAllValid}>로그인</LoginButton>        
      </Form>
    </>
  );
};

export default LoginPage;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding: 0 20px 40px;
  font-weight: 700;
  font-size: 13px;
  color: #6C6C7D;
`;

const TextInput = styled.input`  
  margin-top: 8px;
  padding: 16px;
  background: #F7F7FA;
  border-radius: 12px;
`;

const ErrorMessage = styled.span`
  margin-top: 8px;
  font-weight: 400;
  color: #ED4E5C;
`

const Spacing = styled.div`
  flex: 'none';
  height: 16px;
`;

const LoginButton = styled.button`
  margin-top: 40px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;

  &:disabled {
    background-color: #e2e2ea;
  }
`;

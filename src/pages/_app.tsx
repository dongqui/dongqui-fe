import type { AppProps } from 'next/app';
import styled from 'styled-components';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query'
import { useRef } from 'react';

import setupMSW from '../api/setup';
import GlobalStyle from '../styles/GlobalStyle';

setupMSW();

function MyApp({ Component, pageProps }: AppProps) {
  const queryClientRef = useRef<QueryClient>()
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient()
  }
  
  return (
    <>
    <QueryClientProvider client={queryClientRef?.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <GlobalStyle />
        <Background />
        <Content>
          <Component {...pageProps} />
        </Content>
      </Hydrate>      
    </QueryClientProvider>      
    </>
  );
}

export default MyApp;

const Background = styled.div`
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: #f0f0f5;
`;

const Content = styled.div`
  width: 420px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #fff;
`;

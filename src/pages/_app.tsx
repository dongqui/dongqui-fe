import type { AppProps } from 'next/app';
import styled from 'styled-components';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query'
import { useRef } from 'react';
import { ErrorBoundary } from 'react-error-boundary'
import { useRouter } from 'next/router';

import setupMSW from '../api/setup';
import GlobalStyle from '../styles/GlobalStyle';
import { usePreserveScroll } from '../hooks';
import Layout from '../components/Layout';
import ErrorFallback from '../components/ErrorFallback';

setupMSW();

function MyApp({ Component, pageProps }: AppProps) {  
  const router = useRouter();

  const queryClientRef = useRef<QueryClient>()
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          useErrorBoundary: true,
        },
      },
    })
  }

  usePreserveScroll();
  
  return (
    <>
    <QueryClientProvider client={queryClientRef?.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <GlobalStyle />
        <Background />
        <Layout>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Component {...pageProps} />
          </ErrorBoundary>                    
        </Layout>
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


import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';
import './styles.css';

function ErrorFallback({ error }) {
  return (
    <div role="alert">
      <p>Something went wrong!</p>
    </div>
  );
}

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to github-console-prototype!</title>
      </Head>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ChakraProvider>
          <RecoilRoot>
            <Component {...pageProps} />
          </RecoilRoot>
        </ChakraProvider>
      </ErrorBoundary>
    </>
  );
}

export default CustomApp;

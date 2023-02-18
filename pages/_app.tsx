import { AppProps } from 'next/dist/shared/lib/router/router';
import 'styles/globals.css';
import { Web3ContextProvider } from '../contexts/Web3';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Web3ContextProvider>
      <Component {...pageProps} />
    </Web3ContextProvider>
  );
};

export default App;

import * as React from 'react';
import '../styles/fonts.css';
import '../styles/reset.scss';
import '../styles/styleguide.scss';

const App: React.FunctionComponent<{
  Component: React.ComponentClass,
  pageProps: Record<keyof any, any>
}> = ({ 
  Component, 
  pageProps 
}) => (<Component {...pageProps} />);

export default App;
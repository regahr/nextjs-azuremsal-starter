import React from 'react';

import Home from './home';
// eslint-disable-next-line import/extensions
import useAuthService from '@/services/useAuthService';

const Index = () => {
  useAuthService();
  return <Home />;
};

export default Index;

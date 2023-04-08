import React from 'react';
import Typography from '@mui/material/Typography';
import { Layout } from '@/components/layouts';

const HomePage = () => {
  return (
    <>
      <Layout>
        <Typography variant='h1' color={'primary'}>
          Homepage
        </Typography>
      </Layout>
    </>
  );
};

export default HomePage;

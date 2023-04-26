import React from 'react';
import { AppBar, IconButton, Toolbar, Typography, Link } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useUi } from '@/context/ui';
import NextLink from 'next/link';

interface Props {
  title?: string;
}

export const Navbar = ({ title = 'Open Jira' }: Props) => {
  const { openSideMenu } = useUi();

  return (
    <AppBar position='sticky'>
      <Toolbar>
        <IconButton size='large' edge='start' onClick={openSideMenu}>
          <MenuOutlinedIcon />
        </IconButton>
        <Link
          component={NextLink}
          href='/'
          passHref
          underline='none'
          color={'white'}>
          <Typography variant='h6'>{title}</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

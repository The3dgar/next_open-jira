import React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { UIContext } from '@/context/ui';

interface Props {
  title?: string;
}

export const Navbar = ({ title = 'Open Jira' }: Props) => {
  const { openSideMenu } = React.useContext(UIContext);

  return (
    <AppBar position='sticky'>
      <Toolbar>
        <IconButton size='large' edge='start' onClick={openSideMenu}>
          <MenuOutlinedIcon />
        </IconButton>
        <Typography variant='h6'>{title}</Typography>
      </Toolbar>
    </AppBar>
  );
};
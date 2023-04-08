import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import { UIContext } from '@/context/ui';

const menuItems: string[] = ['Inbox', 'Starred', 'Send Email', 'Drafts'];

export const Sidebar = () => {
  const { sidebarOpen, closeSideMenu } = React.useContext(UIContext);

  return (
    <Drawer open={sidebarOpen} onClose={closeSideMenu}>
      <Box sx={{ width: '250px' }} role='presentation'>
        <Box sx={{ padding: '5px 10px' }}>
          <Typography variant='h4'>Menu</Typography>
        </Box>

        <List>
          {menuItems.map((item, index) => (
            <ListItem key={item} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 ? (
                    <InboxOutlinedIcon />
                  ) : (
                    <MailOutlineOutlinedIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />
      </Box>
    </Drawer>
  );
};

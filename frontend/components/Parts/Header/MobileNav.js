import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Info, Logout } from '@mui/icons-material';
import { AccountCircleRounded, Business, ContactSupport, Home } from '@material-ui/icons';
import { useRouter } from 'next/navigation'
import Link from 'next/link';

export default function MobileNav(props) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const renderLinkIcon = (linkName)=>{
        if(linkName === 'Profile(For Individuals)') return <AccountCircleRounded color='info'/>
        if(linkName === 'Profile(For Businesses)') return <Business color='info'/>
        if(linkName === 'About Us') return <Info color='info'/>
        if(linkName === 'Contact Us') return <ContactSupport color='info'/>
        if(linkName === 'Home') return <Home color='primary'/>
        if(linkName === 'Logout') return <Logout color='secondary'/>
  }


  const router = useRouter()  // the router stuff
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[['Home','/'],['Profile(For Individuals)','/profile'], ['Profile(For Businesses)','/business-profile'],['Contact Us','https://vectorfinancelimited.com/contact-us/'], ['About Us','https://vectorfinancelimited.com/about-us/'], ['Logout','/logout']].map((text, index) => (
          window.location.pathname === "/" && text[0] === "Home"? '' :
          <ListItem key={text[0]} disablePadding onClick={(e)=>{router.push(text[1]); /*props.handlePageChange(e)*/}}>
            <ListItemButton>
              <ListItemIcon>
                {renderLinkIcon(text[0])}
              </ListItemIcon>
              <ListItemText primary={text[0]} sx={{color:'slategray'}} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
     </Box>
  );

  return (
    <nav className="navbar fixed-top" style={{backgroundColor:'ghostwhite'}}>
    <div className="container-fluid">
        <Link className="navbar-brand" href="/">
                <img src="/vectorfinancelimitedlogo.jpg" alt="" style={{height:'22px'}}/>
        </Link>
        <button
        type="button"
        onClick={toggleDrawer('left', true)}
        >
        <span className="navbar-toggler-icon" />
        </button>
        <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
        >
        <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
            Offcanvas
            </h5>
            <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            />
        </div>
        <SwipeableDrawer
                anchor='left'
                open={state['left']}
                onClose={toggleDrawer('left', false)}
                onOpen={toggleDrawer('left', true)}
            >
                {list('left')}
            </SwipeableDrawer>
        </div>
    </div>
    </nav>
  )
}




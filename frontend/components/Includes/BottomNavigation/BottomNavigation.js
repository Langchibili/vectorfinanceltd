import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Help, History, Home } from '@material-ui/icons';
import { useBottomNav } from '@/Contexts/BottomNavContext';
import { useEffect } from 'react';

export default function BottomNav() {
  const [value, setValue] = React.useState(0);
  const [showNav, setShowNav] = React.useState(true);
  const {setBottomNavLink} = useBottomNav()

  useEffect(()=>{
      if(window.location.pathname !== "/"){
        setShowNav(false)
      }
  },[window.location.pathname])
 
  if(!showNav){
    return <></>
  }
  return (
    <>
    <div style={{minHeight:'20px'}}></div>
    <Box sx={{ width: "100%", position:'fixed', bottom:'0'}}>
      <BottomNavigation
        showLabels
        value={value}
        sx={{backgroundColor:'ghostwhite' }}
        onChange={(event, newValue) => {
          setBottomNavLink(newValue)
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<Home />} />
        <BottomNavigationAction label="History" icon={<History />} />
        <BottomNavigationAction label="Help" icon={<Help />} />
        
      </BottomNavigation>
      <div className="row" style={{padding:'5px',textAlign:'center',backgroundColor:'white'}}>
          <div className="col-sm-6" style={{color:'lightgray'}}> 2024 ©VectorFinanceLimited.</div>
        </div>
    </Box>
    </>
  );
}

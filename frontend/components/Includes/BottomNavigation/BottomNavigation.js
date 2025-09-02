import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Add, Help, History, Home, Money, Person, PlusOne } from '@material-ui/icons';
import { useBottomNav } from '@/Contexts/BottomNavContext';
import { usePage } from '@/Contexts/PageContext';

export default function BottomNav() {
  const {setBottomNavLink} = useBottomNav()
  const { page } = usePage()
  const [value, setValue] = React.useState(page === "/referrals"? 1 : 0);
  
  if(page === "/referrals"){
    return (
      <>
      <div style={{minHeight:'20px'}}></div>
      <Box sx={{ zIndex:'10', width: "100%", position:'fixed', bottom:'0'}}>
        <BottomNavigation
          showLabels
          value={value}
          sx={{backgroundColor:'ghostwhite' }}
          onChange={(event, newValue) => {
            setBottomNavLink(newValue)
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Earnings" icon={<Money />} />
          <BottomNavigationAction label="Home" icon={<Home />} />
          <BottomNavigationAction label="Account" icon={<Person />} />
          
        </BottomNavigation>
        <div className="row" style={{padding:'5px',textAlign:'center',backgroundColor:'white'}}>
            <div className="col-sm-6" style={{color:'lightgray'}}> 2024 ©VectorFinanceLimited.</div>
          </div>
      </Box>
      </>
    )
  }
  if(page && page.startsWith('/admin')){
      if(page.startsWith('/admin/users')){
        return <></>
      }
      return (
        <>
        <div style={{minHeight:'20px'}}></div>
        <Box sx={{ zIndex:'10', width: "100%", position:'fixed', bottom:'0'}}>
          <BottomNavigation
            showLabels
            value={value}
            sx={{backgroundColor:'ghostwhite' }}
            onChange={(event, newValue) => {
              setBottomNavLink(newValue)
              setValue(newValue);
            }}
          >
            <BottomNavigationAction label="Loan" icon={<Money />} />
            <BottomNavigationAction label="Client" icon={<Person />} />
            <BottomNavigationAction label="Actions" icon={<Add />} />
          </BottomNavigation>
          <div className="row" style={{padding:'5px',textAlign:'center',backgroundColor:'white'}}>
              <div className="col-sm-6" style={{color:'lightgray'}}> 2024 ©VectorFinanceLimited.</div>
            </div>
        </Box>
        </>
    )
  }

  if(page !== "/"){
    return <></>
  }

  return (
    <>
    <div style={{minHeight:'20px'}}></div>
    <Box sx={{ zIndex:'10', width: "100%", position:'fixed', bottom:'0'}}>
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

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};



const styles = {
  root: {
  },
  tabsContainer:{
    backgroundColor: 'transparent',
    border: 'none',
    boxShadow: 'none'
  },
  tabStyle:{
    backgroundColor:'grey',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    boxShadow: '1px',
    margin: '0px 1px'
  }
}


function NavBar(props) {
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function renderTabs(props){
    console.log(props)
    
  }

  return (
    <div>
      <AppBar position="static" style={styles.tabsContainer} >
        <Tabs value={value} onChange={handleChange}>
          {
            props.tabs.map(tab => {
              return <Tab style={styles.tabStyle} label={tab.label} />
            })
          }
        </Tabs>
      </AppBar>
      <Card>
          <CardContent>
            {props.tabs.map((tab, i) => {
              return (
                value === i && <TabContainer>{tab.renderer()}</TabContainer>
              )
            })}
          </CardContent>
      </Card>
    </div>
  );
}

export default NavBar
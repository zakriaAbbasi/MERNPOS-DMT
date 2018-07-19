import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from 'material-ui/Divider';
import Paper from "material-ui/Paper";
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Button from 'material-ui/Button';
import List, { ListItem } from 'material-ui/List';
import NewSale from './NewSale';
import StockTable from './StockTable';
import RecieveBox from './RecieveBox';
import ViewEmployees from './ViewEmployessTable';
import createBrowserHistory from 'history/createBrowserHistory';
import Welcome from './welcome';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

import { 
    Router
    }   from 'react-router-dom';

const customHistory = createBrowserHistory();
const drawerWidth = 240;

const theme2 = createMuiTheme({
    overrides: {
      MuiButton: {
        // Name of the styleSheet
        root: {
          // Name of the rule
          
          borderRadius: 3,
          border: 0,
          color: 'white',
          height: 48,
          padding: '0 30px',
          
          width:'100%',
        },
      },
    },
  });


  const styles = theme => ({
    root: {
      height: 'auto',
      zIndex: 1,
      overflow: 'auto',
      position: 'relative',
      display: 'flex',
      width: '100%',
      flexGrow:1,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    navIconHide: {
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    toolbar:theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      height:'100%',
      [theme.breakpoints.up('md')]: {
        position: 'relative',
      },
    },
    content: {
      flexGrow:1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing.unit * 3,
      position:'relative',
    },
  });



class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
    t:this.props.token,
      OnDisplay: <Welcome />,
    title : "New Sale",
    open:false,
    openError:false,
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

 NewSaleHandleClick = () => {

    this.setState({
        OnDisplay:<NewSale token={this.state.t} shop={this.props.shop}/>,
        title:"New Sale "
    }
  )
    console.log("ADd item on click")
  }

  RecieveItemsHandleClick = () => {

    this.setState({
        OnDisplay:<RecieveBox token={this.state.t} shop={this.props.shop} handleopen={this.handleClickDialogOpen} handleError={this.handleClickerrorDialogOpen}/>,
        title:"Recieve"
    })
    console.log("Recieve Box ")
  }

  StockHandleClick = () => {

    this.setState({
        OnDisplay:<StockTable token={this.state.t} shop={this.props.shop}/>,
        title:"Stock"
    })
    console.log("ADd item on click")
  }
  ViewEmployessHandleClick = () => {

    this.setState({
        OnDisplay:<ViewEmployees token={this.state.t}/>,
        title:"Employees"
    })
    console.log("ADd item on click")
  }

  handleClickDialogOpen = () => {
    this.setState({ open: true });
  };

  handleClickDialogClose = () => {
    this.setState({ open: false });
  };

  handleClickerrorDialogOpen = () => {
    this.setState({ erroropen: true });
  };

  handleClickerrorDialogClose = () => {
    this.setState({ erroropen: false });
  };


  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <Router history={customHistory}>
        <Paper>
        <List>
        <Typography variant="title" color="inherit" noWrap>
        <MuiThemeProvider theme={theme2}>
           <ListItem><Button variant="raised" color="primary" onClick={this.NewSaleHandleClick.bind(this)} >New Sale </Button></ListItem>
           <Divider />
            <ListItem><Button variant="raised" color="primary" onClick={this.RecieveItemsHandleClick.bind(this)}>Recieve</Button></ListItem>
            <Divider/>
            <ListItem><Button variant="raised" color="primary" onClick={this.StockHandleClick.bind(this)} >Stock</Button></ListItem>
            <Divider />
           
            <ListItem><Button variant="raised" color="primary" onClick={this.props.logoutScreen}>Log Out </Button></ListItem>
            <Divider/>
            
            {/*<ListItem>Queue Details</ListItem>*/}
            </MuiThemeProvider>
            </Typography>
        </List>
        </Paper>
        </Router>
        
      </div>
    );

    return (
        <div className={classes.root}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.navIconHide}
              >
                <MenuIcon/>
              </IconButton>
              <Typography variant="title" color="inherit" noWrap>
                {this.state.title}
              </Typography>
            </Toolbar>
          </AppBar>
          <Hidden mdUp>
            <Drawer
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              variant="permanent"
              open
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {this.state.OnDisplay}
               {/*Open Dialog/Notification*/}
            <Dialog
          open={this.state.open}
          onClose={this.handleClickDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Notification"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
             Job Done!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClickDialogClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

         <Dialog
          open={this.state.erroropen}
          onClose={this.handleClickerrorDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Notification"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              There was an error, try again.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClickDialogClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
            {/*<Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography>*/}
          </main>
         
        </div>
      );
    }
  }
  
  ResponsiveDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
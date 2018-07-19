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
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Button from 'material-ui/Button';
import List, { ListItem } from 'material-ui/List';
import AddNewLogin from './AddLogin';
import ViewAll from './ViewAll';
import createBrowserHistory from 'history/createBrowserHistory';
import { 
    Router
    }   from 'react-router-dom';
import Welcome from './Welcome'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';



const customHistory = createBrowserHistory();
const drawerWidth = 240;

const theme2 = createMuiTheme({
    overrides: {
      MuiButton: {
        // Name of the styleSheet
        root: {
          // Name of the rule
          background: '#3F51B5',
          borderRadius: 3,
          border: 5,
          color: 'white',
          height: 70,
          padding: '0 30px',
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
          width:200,
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
  constructor(props){
    super(props)
      this.state = {
      mobileOpen: false,
      t:this.props.token,
      OnDisplay: <Welcome />,
      open:false,
      openError:false,
    };


  }
 
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

 AddNewLoginHandleClick = () => {

    this.setState({
        OnDisplay:<AddNewLogin token={this.state.t} handleopen={this.handleClickDialogOpen} handleError={this.handleClickerrorDialogOpen}/>
    })
    console.log("Add item on click");
  }


  
 ViewAllHandleClick = () => {

    this.setState({
        OnDisplay:<ViewAll token={this.state.t} handleopen={this.handleClickDialogOpen} handleError={this.handleClickerrorDialogOpen}/>
    })
    console.log("View All item Click")
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
        <div className={classes.toolbar}/>
        <Router history={customHistory}>
        <List>
        <Typography variant="title" color="inherit" >
        <MuiThemeProvider theme={theme2}>
           <ListItem><Button onClick={this.AddNewLoginHandleClick.bind(this)} >Add New Login</Button></ListItem>
           <Divider />
            <ListItem><Button onClick={this.ViewAllHandleClick.bind(this)}>View All Employees</Button></ListItem>
            <Divider/>
            <ListItem><Button onClick={this.props.logoutScreen}>Logout</Button></ListItem>
            <Divider />
            </MuiThemeProvider>
            </Typography>
        </List>
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
                Powered By NerdWare
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
            {/*User Modal*/}
            <Dialog
          open={this.state.open}
          onClose={this.handleClickDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Notification"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              User Added
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
              User not added, Try again.
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
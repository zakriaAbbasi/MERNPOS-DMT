import React, { Component } from 'react';
import './App.css';
import WarehouseDrawer from './warehouse/Drawer';
import HeadOfficeDrawer from './headoffice/Drawer';
import Login  from './warehouse/Login';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
function registerServiceWorker() {
  return navigator.serviceWorker.register('/sw.js')
  .then(function(registration) {
    console.log('Service worker successfully registered.');
    console.log(registration);
    return registration;
  })
  .catch(function(err) {
    console.error('Unable to register service worker.', err);
  });
}
class App extends Component {


    constructor(props){
      super(props);
      if (!('serviceWorker' in navigator)) {
        console.log('Service Worker isnt supported on this browser, disable or hide UI');
        return;
      }
      
      if (!('PushManager' in window)) {
        console.log('Push isnt supported on this browser, disable or hide UI');
        return;
      }
      this.state={
       open:false,
        onDisplay:<Login updateHeadOffice={this.updateHeadOfficeDisplay} updateWarehouse={this.updateWareHouseDisplay} updateShop={this.updateShopDisplay} handleOpen={this.handleClickOpen}/>
      }
      this.updateWareHouseDisplay.bind(this);
      this.updateHeadOfficeDisplay.bind(this);
      this.logoutFunction.bind(this);
      this.handleClickOpen.bind(this);
      this.handleClose.bind(this);
    }

    handleClickOpen = () => {
      this.setState({ open: true });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };

  
  updateWareHouseDisplay = (token, cnic) => {
    //now send token to the required component
    this.setState({
      IsLoggedInWarehouse:true,
      onDisplay:<WarehouseDrawer token={token} cnic={cnic} logoutScreen={this.logoutFunction}/>
    })
  }


  updateHeadOfficeDisplay = (token) => {
    console.log(token)
    this.setState({
      IsLoggedInHeadoffice:true,
      onDisplay:<HeadOfficeDrawer token={token} logoutScreen={this.logoutFunction}/>
    })
  }

  logoutFunction = () => {
    console.log('logging out')
    this.setState({
      onDisplay: <Login  updateHeadOffice={this.updateHeadOfficeDisplay} updateWarehouse={this.updateWareHouseDisplay} updateShop={this.updateShopDisplay}  handleOpen={this.handleClickOpen}/>
    })
  }

  render() {
    registerServiceWorker();
    return (
      <div className="App">
        {this.state.onDisplay}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Invalid Username or Password
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default App; 
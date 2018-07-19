import React, { Component } from 'react';
import './App.css';
import ShopDrawer from './shop/Drawer';
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

class App extends Component {

  /*componentWillMount(){

    if(this.state.IsLoggedInWarehouse===true){
      this.setState({
        onDisplay:<WarehouseDrawer/>
      })
    }
    else if(this.state.IsLoggedInHeadoffice===true){
        this.setState({
          onDisplay:<div>Head Office</div>
        })
    }
    else if(this.state.IsLoggedinShop===true){
      this.setState({
        onDisplay:<div>Shop</div>
      })
    }
    else {
      this.setState({
        onDisplay:<Login updateHeadOffice={this.updateHeadOfficeDisplay} updateWarehouse={this.updateWareHouseDisplay} updateShop={this.updateShopDisplay}/>
      })
    }
    }
    */

    constructor(props){
      super(props);
      this.state={
        /*
          IsLoggedInWarehouse:false,
          IsLoggedInHeadoffice:false,
          IsLoggedinShop:false,
        */
       open:false,
        onDisplay:<Login updateHeadOffice={this.updateHeadOfficeDisplay} updateWarehouse={this.updateWareHouseDisplay} updateShop={this.updateShopDisplay} handleOpen={this.handleClickOpen}/>
      }
      this.updateWareHouseDisplay.bind(this);
      this.updateShopDisplay.bind(this);
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

  
  updateWareHouseDisplay = (token) => {
    console.log(token);
    //now send token to the required component
    this.setState({
      IsLoggedInWarehouse:true,
      onDisplay:<WarehouseDrawer token={token} logoutScreen={this.logoutFunction}/>
    })
  }

  updateShopDisplay = (token,shopID) => {
    this.setState({
      IsLoggedinShop:true,
      onDisplay:<ShopDrawer token={token} shop={shopID} logoutScreen={this.logoutFunction}/>
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
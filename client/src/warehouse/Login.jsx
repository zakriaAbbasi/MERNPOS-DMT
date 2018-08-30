import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Card, { CardContent } from 'material-ui/Card';
import urlBase64ToUint8Array from 'url-base64-to-uint8array';
const styles = theme => ({
  button: {
    display:'flex',
  },
  container: {
    display:'block',
    flexWrap:'wrap',
    position:"relative",
  },
  textField: {
    width: '100%',
  },
  appBar: {
    display:'block',
    position:'relative'
  },
  typeobar: {
    marginTop:100
  },

  card: {
    marginLeft:'auto',
    marginRight:'auto',
    marginTop:60,
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },

  menu: {
    width: 200,
  },
});

const dropdowntypes = [
  {
    value: 'emp',
    label: 'Employee',
  },
  {
    value: 'admin',
    label: 'Admin',
  },
];
function validate(userName,Password) {
  return {
    userName: userName.length === 0,
    Password: Password.length === 0,
  };
}
//Function To Ask User's Permission to send them push notifications.
function askPermission() {
  return new Promise(function(resolve, reject) {
    const permissionResult = Notification.requestPermission(function(result) {
    resolve(result);
    });
    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  })
  .then(function(permissionResult) {
    if (permissionResult !== 'granted') {
      throw new Error('We weren\'t granted permission.');
    }
  });
}
//Function To send Subscription to Back-end
function sendSubscriptionToBackEnd(subscription) {
  //console.log(JSON.stringify(subscription));
  return fetch('/subs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(subscription)
  })
  .then(function(response) {
    if (!response.ok) {
      throw new Error('Bad status code from server.');
    }

    return response.json();
  })
  .then(function(responseData) {
    if (!(responseData.data && responseData.data.success)) {
      throw new Error('Bad response from server.');
    }
  });
}
//Function to subscribe user to push notifications
function subscribeUserToPush() { 
  navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
    // Do we already have a push message subscription?
    serviceWorkerRegistration.pushManager.getSubscription()
      .then(function(subscription) {
        if (!subscription) {
          const subscribeOptions = {
            expirationTime: 999999,
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
              'BK7j6oEXJUWtmBaMFBSuxST1b5aLCXIZ77wOQtt1BleyrcpwU9zkvysq1TOnFHDqjvyLNE-9m1u37ttKfzKYk8Q')
          };
          return serviceWorkerRegistration.pushManager.subscribe(subscribeOptions).then(function(pushSubscription) {
            console.log('Received Push Subscription:', JSON.stringify(pushSubscription));
            sendSubscriptionToBackEnd(pushSubscription);
            return pushSubscription;
          });
  }
  else{
    console.log('User is already subscribed');
  }
          return;
        }); 
      });
}
class TextFields extends React.Component {
  constructor(props){
    super(props)

   this.state = {
      userName: '',
      Password: '',
      type:'emp'
    };

  }
  
  handleSubmit = (evt) => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }
  }
  canBeSubmitted() {
    const errors = validate(this.state.qrId);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  handleChange = name => event => {
    
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state)
  };

  handleClick = () => {
    var temp = this.state.userName; 
    console.log(this.state)
    var details = {
     'name': this.state.userName,
     'password': this.state.Password,
     'type':this.state.type
    };
 

 var formBody = [];
 for (var property in details) {
   var encodedKey = encodeURIComponent(property);
   var encodedValue = encodeURIComponent(details[property]);
   formBody.push(encodedKey + "=" + encodedValue);
 }
 formBody = formBody.join("&");
 
 var reqtype = this.state.type.toString();
 fetch('/'+reqtype, {
   method: 'POST',
   headers: {
     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' 
   },
   body: formBody
 }).then(res=>res.json())
 .then(res=>{
   console.log("we are in this function");
   if(res){
     if(res.type==="emp"){
      this.props.updateWarehouse(res.token, temp);
     }
     else if(res.type==='admin'){
      this.props.updateHeadOffice(res.token);
     }
     else{
       this.props.handleOpen();
     }
     //Ask Permission for sending notifications and subscribe user..
     askPermission();
     subscribeUserToPush();
   };
 }
 );
  
 
 this.setState({
      userName:'',
      Password:'',
      type:'emp'
    })
  }
  changeUsername = e => {
    this.setState({
      userName: e.target.value
    });
  };

  changePassword = e => {
    this.setState({
      Password: e.target.value
    });
}
  changeType = e => {
    this.setState({
      type: e.target.value
    });
  }

  logoutScreen = () => {
    this.props.logoutScreen()
  }


  render() {
    const { classes } = this.props;
    const errors = validate(this.state.userName,this.state.Password);
      const isDisabled = Object.keys(errors).some(x => errors[x]);


    return (
      <div>
           <AppBar className={classes.appBar}>
      <Toolbar>
        <Typography variant="title" color="inherit" noWrap>
          The filli
        </Typography>
      </Toolbar>
    </AppBar>
    <Typography variant="display1" color="inherit" align="center" className={classes.typeobar}>
          Login to the System
        </Typography>
    <Card className={classes.card}>
     
    <form className={classes.container} noValidate autoComplete="off"> 
    <CardContent>
    <TextField
    id="User name"
    label="User Name"
    value={this.state.userName}
    placeholder="Enter User Name"
    className={classes.textField}
    onChange={e => this.changeUsername(e)}
    margin="normal"
  />
    </CardContent>
    <CardContent>
  <TextField
    id="Password"
    label="Password"
    value={this.state.Password}
    placeholder="Enter Password"
    onChange={e => this.changePassword(e)}
    className={classes.textField}
    type='password'
    margin="normal"
  />
</CardContent>
<CardContent>
<TextField
          id="type"
          select
          className={classes.textField}
          value={this.state.type}
          onChange={e=>this.changeType(e)}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select your type"
          margin="normal"
        >
          {dropdowntypes.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          </TextField>
</CardContent>

<CardContent>
  <Button variant="raised" color="primary" className={classes.button} onClick={this.handleClick.bind(this)} disabled={isDisabled}>
  Login
  </Button>
  </CardContent>
</form>
</Card>
      </div>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(TextFields);


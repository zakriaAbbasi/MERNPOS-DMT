import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import Card, {  CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  button: {
    margin:theme.spacing.unit,
    display:'flex',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  menu: {
    width: 200,
  },
  card: {
    marginLeft:100,
    marginRight:100,
    marginTop:10,
    //maxWidth: 350,
  },
});

const dropdowntypes = [
  {
    value: 'admin',
    label: 'Admin',
  },
  {
    value: 'head',
    label: 'Head',
  },
  {
    value: 'shop',
    label: 'Shop',
  },
];

function validate(username,password,cnic) {
  return {
    userName: username.length === 0,
    password: password.length === 0,
    cnic: cnic.length === 0,
  };
}
class TextFields extends React.Component {

  state = {
    name: '',
    username: '',
    password: '',
    cnic: '',
    type:'admin',
    shopID:'default',
    city:'',
    zip:'',
    countryState:'',
    phone:'',
    country:'',
    shopaddress:'default',
    nationality:'',
    address:'',
    mobile:'',
    email:'',
    t:this.props.token,
    isDisabledshop:true,
  }


handleSubmit = (evt) => {
  if (!this.canBeSubmitted()) {
    evt.preventDefault();
    return;
  }
  
}
canBeSubmitted() {
  const errors = validate(this.state.username,this.state.password,this.state.cnic);
  const isDisabled = Object.keys(errors).some(x => errors[x]);
  return !isDisabled;
}
  handleChange = name => event => {
    this.setState({
      name: event.target.value,
    });
    console.log(this.state)
  };

  //change function
  changeuserName = e => {
    this.setState({
      username: e.target.value
    });
  };

  //change name
  changeName = e => {
    this.setState({
      name: e.target.value
    });
  };


  changepassword = e => {
    this.setState({
      password: e.target.value
    });
  }

  changecnics = e => {
    this.setState({
      cnic: e.target.value
    });
  }

  changecity = e => {
    this.setState({
      city: e.target.value
    });
  }

  changezip = e => {
    this.setState({
      zip: e.target.value
    });
  }
  changephone = e => {
    this.setState({
      phone: e.target.value
    });
  }
  changeemail = e => {
    this.setState({
      email: e.target.value
    });
  }
  changemobile = e => {
    this.setState({
      mobile: e.target.value
    });
  }

  changenationality = e => {
    this.setState({
      nationality: e.target.value
    });
  }
  changeType = e => {
    this.setState({
      type: e.target.value,
    });
    if(e.target.value==='shop'){
      this.setState({
        isDisabledshop:false,
      })
    }
    else{
      this.setState({
        isDisabledshop:true
      })
    }
    console.log(this.state.isDisabledshop);
  }


  changeShopID = e => {
    this.setState({
      shopID: e.target.value
    })
  }

  changeShopAddress = e => {
    this.setState({
      shopaddress: e.target.value
    })
  }

  changestate = e => {
    this.setState({
      countryState: e.target.value
    })
  }

  changecountry = e => {
    this.setState({
      country: e.target.value
    })
  }

  changeaddres = e => {
    this.setState({
      address: e.target.value
    })
  }

  handleClick = () => {
    console.log(this.props.token);
    //api call to store data in database here
      console.log(this.state)
      var details = {
        'name':this.state.name,
        'username': this.state.username,
        'password':this.state.password,
        'cnic':this.state.cnic,
        'type': this.state.type,
        'shopID':this.state.shopID,
        'city':this.state.city,
        'zip':this.state.zip,
        'countrystate':this.state.countryState,
        'phone':this.state.phone,
        'country':this.state.country,
        'shopaddress':this.state.shopaddress,
        'nationality':this.state.nationality,
        'address':this.state.address,
        'mobile':this.state.mobile,
        'token':this.state.t,
        'email':this.state.email,
   };
   
   var formBody = [];
   for (var property in details) {
     var encodedKey = encodeURIComponent(property);
     var encodedValue = encodeURIComponent(details[property]);
     formBody.push(encodedKey + "=" + encodedValue);
   }
   formBody = formBody.join("&");
   
   fetch('/head/AddEmp', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' 
     },
     body: formBody
   })
   .then(res=>res.json())
   .then(res=>{
  
     console.log("API response function");
     if(res){
      console.log(res);
      this.props.handleopen();
     }
     else {
       this.props.handleError();
     }
     ;
   }
   );
      //form saaf kia hai 
    this.setState({
      name: '',
      username:'',
      password:'',
      cnic:'',
      type:'',
      isDisabledshop:true,
      shopaddress:'',
      city:'',
      state:'',
      zip:'',
      phone:'',
      nationality:'',
      country:'',
      mobile:'',
      email:'',
      address:'',
      countryState:''
    })
  }

    
  
  render() {
    const { classes } = this.props;
    const errors = validate(this.state.username,this.state.password,this.state.cnic);
      const isDisabled = Object.keys(errors).some(x => errors[x]);

    return (
      <div>
        <Typography variant="display2">Add a new Employee</Typography>
        <Card className={classes.card}>
      <form className={classes.container} noValidate autoComplete="off"> 
      <CardContent>
      <TextField
          id="username"
          label="Username"
          value={this.state.username}
          placeholder="Enter User Name"
          className={classes.textField}
          onChange={e => this.changeuserName(e)}
          margin="normal"
          refs='name'
        />
        </CardContent>

      <CardContent>
      <TextField
          id="Name"
          label="Name"
          value={this.state.name}
          placeholder="Enter Name"
          className={classes.textField}
          onChange={e => this.changeName(e)}
          margin="normal"
          refs='name'
        />
        </CardContent>

        <CardContent>
        <TextField
          id="password"
          label="Password"
          value={this.state.password}
          placeholder="Enter Password"
          onChange={e => this.changepassword(e)}
          className={classes.textField}
          margin="normal"
        />
        </CardContent>
        <CardContent>
        <TextField
          id="cnic"
          label="CNIC"
          value={this.state.cnic}
          placeholder="Enter CNIC"
          onChange={e => this.changecnics(e)}
          className={classes.textField}
          margin="normal"
        />
        </CardContent>
        <CardContent>
        <TextField
          id="city"
          label="City"
          value={this.state.city}
          placeholder="Enter City"
          onChange={e => this.changecity(e)}
          className={classes.textField}
          margin="normal"
        />
        </CardContent>
        <CardContent>
        <TextField
          id="email"
          label="Email"
          value={this.state.email}
          placeholder="Enter Email"
          onChange={e => this.changeemail(e)}
          className={classes.textField}
          margin="normal"
        />
        </CardContent>
        <CardContent>
        <TextField
          id="nationality"
          label="Nationality"
          value={this.state.nationality}
          placeholder="Enter Email"
          onChange={e => this.changenationality(e)}
          className={classes.textField}
          margin="normal"
        />
        </CardContent>
        <CardContent>
        <TextField
          id="Phone"
          label="Phone"
          value={this.state.phone}
          placeholder="Enter Phone"
          onChange={e => this.changephone(e)}
          className={classes.textField}
          margin="normal"
        />
        </CardContent>
        <CardContent>
        <TextField
          id="country"
          label="Country"
          value={this.state.country}
          placeholder="Enter City"
          onChange={e => this.changecountry(e)}
          className={classes.textField}
          margin="normal"
        />
        </CardContent>
        <CardContent>
        <TextField
          id="zip"
          label="Zip"
          value={this.state.zip}
          placeholder="Enter Zip"
          onChange={e => this.changezip(e)}
          className={classes.textField}
          margin="normal"
        />
        </CardContent>
        <CardContent>
        <TextField
          id="mobile"
          label="mobile"
          value={this.state.mobile}
          placeholder="Enter Mobile"
          onChange={e => this.changemobile(e)}
          className={classes.textField}
          margin="normal"
        />
        </CardContent>
        <CardContent>
        <TextField
          id="address"
          label="address"
          value={this.state.address}
          placeholder="Enter Address"
          onChange={e => this.changeaddres(e)}
          className={classes.textField}
          margin="normal"
        />

        </CardContent>
        <CardContent>
        <TextField
          id="state"
          label="State"
          value={this.state.countryState}
          placeholder="Enter State"
          onChange={e => this.changestate(e)}
          className={classes.textField}
          margin="normal"
        />
        </CardContent>
        <CardContent>
        <TextField
          disabled={this.state.isDisabledshop}
          id="shopid"
          label="Shop ID"
          value={this.state.shopID}
          placeholder="Enter Shop ID"
          onChange={e => this.changeShopID(e)}
          className={classes.textField}
          margin="normal"
        />
        </CardContent>
        <CardContent>
        <TextField
          disabled={this.state.isDisabledshop}
          id="shopaddress"
          label="Shop Address"
          value={this.state.shopaddress}
          placeholder="Enter Shop Address"
          onChange={e => this.changeShopAddress(e)}
          className={classes.textField}
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
        <Button variant="raised" color="primary" className={classes.button} onClick={this.handleClick} disabled={isDisabled}>
        <AddIcon/>
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

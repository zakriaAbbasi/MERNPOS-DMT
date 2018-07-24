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

function validate(name,password,cnic) {
  return {
    name: name.length === 0,
    password: password.length === 0,
    cnic: cnic.length === 0,
  };
}
class TextFields extends React.Component {

  state = {
    name: '',
    password: '',
    cnic: '',
    mobile:'',
    email:'',
    t:this.props.token,
  }


handleSubmit = (evt) => {
  if (!this.canBeSubmitted()) {
    evt.preventDefault();
    return;
  }
  
}
canBeSubmitted() {
  const errors = validate(this.state.name,this.state.password,this.state.cnic);
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

  changemobile = e => {
    this.setState({
      mobile: e.target.value
    });
  }

  handleClick = () => {
    console.log(this.props.token);
    //api call to store data in database here
      console.log(this.state)
      var details = {
        'name':this.state.name,
        'password':this.state.password,
        'cnic':this.state.cnic,
        'phone':this.state.mobile,
        'token':this.state.t,
   };
   
   var formBody = [];
   for (var property in details) {
     var encodedKey = encodeURIComponent(property);
     var encodedValue = encodeURIComponent(details[property]);
     formBody.push(encodedKey + "=" + encodedValue);
   }
   formBody = formBody.join("&");
   
   fetch('/admin/addemp', {
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
      password:'',
      cnic:'',
      mobile:'',
    })
  }

    
  
  render() {
    const { classes } = this.props;
    const errors = validate(this.state.name,this.state.password,this.state.cnic);
      const isDisabled = Object.keys(errors).some(x => errors[x]);

    return (
      <div>
        <Typography variant="display2">Add a new Employee</Typography>
        <Card className={classes.card}>
      <form className={classes.container} noValidate autoComplete="off"> 

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

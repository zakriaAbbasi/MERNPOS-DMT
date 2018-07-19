import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});


class TextFields extends React.Component {
  state = {
    firstName: '',
    LastName: '',
    pNumber: '',
    address:'',
    id: '',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  changeFirstName = e => {
    this.setState({
      firstName: e.target.value
    });
  }

  changeLastName = e => {
    this.setState({
      LastName: e.target.value
    });
  }

  changePhoneNumber = e => {
    this.setState({
      pNumber: e.target.value
    });
  }

  changeAddress = e => {
    this.setState({
      address: e.target.value
    });
  }

  changeID = e => {
    this.setState({
      id: e.target.value
    });
  }

  handleClick = () => {
    console.log(this.state);
    this.setState({
    firstName:'',
    LastName:'',
    pNumber:'',
    address:'',
    id:''
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off"> 
      <TextField
         id="firstName"
         label="First Name"
         value={this.state.firstName}
         placeholder="Enter First Name"
         className={classes.textField}
         onChange={e => this.changeFirstName(e)}
         margin="normal"
         refs='name'
       />
        <TextField
         id="lastName"
         label="Last Name"
         value={this.state.LastName}
         placeholder="Enter Last Name"
         className={classes.textField}
         onChange={e => this.changeLastName(e)}
         margin="normal"
       />
         
       <TextField
         id="pnumber"
         label="Phone Number"
         value={this.state.pNumber}
         placeholder="Enter Phone Number"
         onChange={e => this.changePhoneNumber(e)}
         className={classes.textField}
         margin="normal"
       />

          <TextField
         id="Address"
         label="Address"
         value={this.state.address}
         placeholder="Enter Address"
         onChange={e => this.changeAddress(e)}
         className={classes.textField}
         margin="normal"
       />
         <TextField
         id="id"
         label="ID"
         value={this.state.id}
         placeholder="Enter ID of Employee"
         onChange={e => this.changeID(e)}
         className={classes.textField}
         margin="normal"/>
  
       <Button variant="raised" color="primary" className={classes.button} onClick={this.handleClick} >
       <AddIcon/>
       </Button>
     </form>
    )
   
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);

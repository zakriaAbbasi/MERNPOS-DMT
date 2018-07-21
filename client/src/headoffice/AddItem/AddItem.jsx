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

function validate(name,description,price) {
  return {
    name: name.length === 0,
    description: description.length === 0,
    price: price.length === 0,
  };
}
class TextFields extends React.Component {

  state = {
    name: '',
    description:'',
    rPrice:'',
    fPrice:'',
    t:this.props.token,
  }


handleSubmit = (evt) => {
  if (!this.canBeSubmitted()) {
    evt.preventDefault();
    return;
  }
  
}
canBeSubmitted() {
  const errors = validate(this.state.name,this.state.description,this.state.price);
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


  changeDescription = e => {
    this.setState({
      description: e.target.value
    });
  }

  changeRPrice = e => {
    this.setState({
      rPrice: e.target.value
    });
  }
  changeFPrice = e => {
    this.setState({
      fPrice: e.target.value
    });
  }
 

  handleClick = () => {
    console.log(this.props.token);
    //api call to store data in database here
      console.log(this.state)
      var details = {
        'name':this.state.name,
        'desc': this.state.description,
        'Rprice':this.state.rPrice,
        'Fprice':this.state.fPrice,
        'token':this.state.t,
   };
   
   var formBody = [];
   for (var property in details) {
     var encodedKey = encodeURIComponent(property);
     var encodedValue = encodeURIComponent(details[property]);
     formBody.push(encodedKey + "=" + encodedValue);
   }
   formBody = formBody.join("&");
   
   fetch('/admin/additem', {
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
        description:'',
        rPrice:'',
        fPrice:'',
    })
  }

    
  
  render() {
    const { classes } = this.props;
    const errors = validate(this.state.name,this.state.description,this.state.rPrice);
      const isDisabled = Object.keys(errors).some(x => errors[x]);

    return (
      <div>
        <Typography variant="display2">Add a new ITEM</Typography>
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
          id="Description"
          label="Description"
          value={this.state.description}
          placeholder="Enter Description"
          onChange={e => this.changeDescription(e)}
          className={classes.textField}
          margin="normal"
        />
        </CardContent>
        <CardContent>
        <TextField
          id="rprice"
          label="Retail Price"
          value={this.state.rPrice}
          placeholder="Enter Retail Price"
          onChange={e => this.changeRPrice(e)}
          className={classes.textField}
          margin="normal"
        />
        </CardContent>
        <CardContent>
        <TextField
          id="fprice"
          label="Fixed Price"
          value={this.state.fPrice}
          placeholder="Enter Fixed Price"
          onChange={e => this.changeFPrice(e)}
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

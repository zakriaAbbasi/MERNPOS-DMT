import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';

const styles = theme => ({
    root: {
        width:'80%',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        marginTop:'10px',
        overflow: 'auto',
        maxHeight: 500,
      },
      listSection: {
        backgroundColor: 'inherit',
      },
      ul: {
        backgroundColor: 'inherit',
        padding: 0,
      },
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
    width: '30%',
  },
  menu: {
    width: 200,
  },
});


class TextFields extends React.Component {
  componentDidMount(){
    var details = {
     'token':this.state.t,
 };
 

 var formBody = [];
 for (var property in details) {
   var encodedKey = encodeURIComponent(property);
   var encodedValue = encodeURIComponent(details[property]);
   formBody.push(encodedKey + "=" + encodedValue);
 }
 formBody = formBody.join("&");
 
 
 fetch('/admin/ShowArticles', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' 
   },
   body: formBody
 })
 .then(res=>res.json())
 .then(res=>{

   console.log("we are in this function");
   if(res){
    console.log(res);
    this.setState({
      data:res
    })
     console.log("After function");
   };
 }
 );
     
  }

  state = {
    name: '',
    id: '',
    t:this.props.token,
    data:{},
    checked: [],
    list:{},
    shop:'',
    package_number:'',
    date: new Date(),
  };
  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];//[...checked]<--this means keeping all previous states as well

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
      list:this.state.checked
    });
  };

  handleChange = name => event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state)
  };

  //change function
  changeName = e => {
    this.setState({
      name: e.target.value
    });
  };

  changeShop = e => {
    this.setState({
      shop: e.target.value
    });
  }


  changeID = e => {
    this.setState({
      id: e.target.value,
    });
  }

  changePackagenumber = e => {
    this.setState({
      package_number: e.target.value,
    });
  }

  changeList = e => {
    this.setState({
      //list object = json pacakage from api
    })
  }

  handleClick = () => {
    console.log(this.state);
    this.changeList();
    console.log(this.state.checked);
    //api call to post data in database
    var details = {
     'name': this.state.name,
     'shop': this.state.shop,
     'number':this.state.package_number,
     'items':this.state.checked,
     'date':this.state.date,
     'token':this.state.t
 };
 

 var formBody = [];
 for (var property in details) {
   var encodedKey = encodeURIComponent(property);
   var encodedValue = encodeURIComponent(details[property]);
   formBody.push(encodedKey + "=" + encodedValue);
 }
 formBody = formBody.join("&");
 

 fetch('/admin/Createnewpakg', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' 
   },
   body: formBody
 })
 .then(res=>res.json())
 .then(res=>{

   console.log("we are in this function");
   if(res){
    console.log(res);
    this.props.handleopen();
     console.log("After function");
   }
   else{
     this.props.handleError();
   }
   ;
 }
 );
      this.setState({
      name:'',
      shop:'',
      id:'',
      checked: [],
      package_number:''
    })

  }
 

  //api call to get all items from api
  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off"> 
       <TextField
          id="name"
          label="Name"
          value={this.state.name}
          placeholder="Enter Name of Batch (Just say Batch)"
          className={classes.textField}
          onChange={e => this.changeName(e)}
          margin="normal"
          refs='name'
          
        />
        <TextField
          id="shop"
          label="Shop"
          value={this.state.shop}
          placeholder="Enter Shop ID"
          onChange={e => this.changeShop(e)}
          className={classes.textField}
          margin="normal"
        />
            <TextField
          id="pckgnumberr"
          label="Package Number"
          value={this.state.package_number}
          placeholder="Enter Package Number"
          onChange={e => this.changePackagenumber(e)}
          className={classes.textField}
          margin="normal"
        />

         {/*
         <TextField
          id="id"
          label="ID"
          value={this.state.id}
          placeholder="Enter ID of Batch"
          onChange={e => this.changeID(e)}
          className={classes.textField}
          margin="normal"/>
        */} 
        
          
    <div className={classes.root}>
        <List>
          {/*0,1,2,3 to be replaced with json pacakage
          key = value, value can be replaced with id of items*/}
          {Object.values(this.state.data).map(type => (
            <ListItem
              key={type.item_id}
              role={undefined}
              dense
              button
              onClick={this.handleToggle(type.item_id)}
              className={classes.listItem}
            >
              <Checkbox
                checked={this.state.checked.indexOf(type.item_id) !== -1}
                tabIndex={-1}
                disableRipple
                color="primary"
              />
              <ListItemText primary={type.item_name} />
              <ListItemSecondaryAction>
                <IconButton aria-label="Comments">
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
        <Button variant="raised" color="primary" className={classes.button} onClick={this.handleClick} >
        <AddIcon/>
        </Button>
      </form>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);

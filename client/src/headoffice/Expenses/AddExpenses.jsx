import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Card, { CardContent } from 'material-ui/Card';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#3F51B5',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});


class CustomizedTable extends React.Component {

  componentDidMount(){
    var details = {
      'token':this.state.t
  };
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    
    fetch('/admin/showallemps', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' 
      },
      body: formBody
    })
    .then(res=>res.json())
    .then(res=>{
      console.log("we are in this function");
      console.log(this.state.t);
      if(res){
       console.log(res);
       this.setState({
         data:res
       })
        console.log("After function");
        console.log(this.state.t);
      };
    }
    );

  };

  constructor(props){
    super(props)
    this.state={
      data:{},
      t:this.props.token,
      expenses:'',
      description:'',
      date:'',
    }
};

deleteClick = (index) => {
  console.log({index})
  console.log(this.state.data[index])
  var details = {
    'token':this.state.t,
    'cnic':this.state.data[index].cnic,
};


var formBody = [];
for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");


fetch('/admin/deleteemp', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' 
  },
  body: formBody
})
.then(res=>res.json())
.then(res=>{

  //console.log("we are in this function");
  if(res){
    console.log(res);
    var details = {
      'token':this.state.t
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

  if(res){
   this.setState({
     data:res
   })
  };
}
);   
    console.log("After function");
  };
}
); 

}
changeExpenses = e => {
  this.setState({
    expenses: e.target.value
  });
};
changeDescription = e => {
  this.setState({
    description: e.target.value
  });
};
changeDate = e => {
  this.setState({
    date: e.target.value
  });
};

handleClick = () => {

}
  render() {
    const { classes } = this.props;
    return (
      <div>
            <form className={classes.container} noValidate autoComplete="off"> 
    <CardContent>
    <TextField
    id="expenses"
    label="Expenses"
    value={this.state.expenses}
    placeholder="Enter Expenses"
    className={classes.textField}
    onChange={e => this.changeExpenses(e)}
    margin="normal"
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
    id="Date"
    label="Date"
    value={this.state.date}
    placeholder="Enter Date"
    onChange={e => this.changeDate(e)}
    className={classes.textField}
    margin="normal"
  />
</CardContent>

<CardContent>
  <Button variant="raised" color="primary" className={classes.button} onClick={this.handleClick.bind(this)} >
  Login
  </Button>
  </CardContent>
</form>
      <Typography variant="display2"> All Expenses</Typography>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Expenses</CustomTableCell>
              <CustomTableCell numeric>Description</CustomTableCell>
              <CustomTableCell numeric>Date</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/*data replaced with json pacakage from api*/}
            {
               Object.values(this.state.data).map((type,index) => {
                
                 return (
                  <TableRow className={classes.row} key={type.Emp_cnic}>
                    <CustomTableCell>{type.name}</CustomTableCell>
                    <CustomTableCell numeric>{type.cnic}</CustomTableCell>
                    <CustomTableCell numeric>{type.password}</CustomTableCell>
                    <CustomTableCell numeric>
                    <Button  aria-label="delete" onClick={()=>{this.deleteClick(index)}} className={classes.button}>
                    <DeleteIcon />
                    </Button>
                    </CustomTableCell>
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </Paper>
      </div>
    );
  }
}


CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from 'material-ui/Button';

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
    
    fetch('/admin/viewallitems', {
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
    }
};

deleteClick = (index) => {
  console.log({index})
  console.log(this.state.data[index])
  var details = {
    'token':this.state.t,
    'id':this.state.data[index].item_id,
};


var formBody = [];
for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");


fetch('/admin/deleteitem', {
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


fetch('/admin/viewallitems', {
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
  render() {
    const { classes } = this.props;
    return (
      <div>
      <Typography variant="display2"> All Items</Typography>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Item Name</CustomTableCell>
              <CustomTableCell numeric>Item Id</CustomTableCell>
              <CustomTableCell numeric>Factory Price</CustomTableCell>
              <CustomTableCell numeric>Retail Price</CustomTableCell>
              <CustomTableCell numeric>Delete</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/*data replaced with json pacakage from api*/}
            {
               Object.values(this.state.data).map((type,index) => {
                
                 return (
                  <TableRow className={classes.row} key={type.Emp_cnic}>
                    <CustomTableCell>{type.item_name}</CustomTableCell>
                    <CustomTableCell numeric> {type.item_id} </CustomTableCell>
                    <CustomTableCell numeric>{type.factory_price}</CustomTableCell>
                    <CustomTableCell numeric>{type.retail_price}</CustomTableCell>
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

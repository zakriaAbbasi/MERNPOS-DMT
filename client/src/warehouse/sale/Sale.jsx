import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from 'material-ui/Grid';
import Cart from '@material-ui/icons/AddShoppingCart';
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
  button: {
    margin: theme.spacing.unit,
  },
  table: {
    minWidth: 400,
  },
  tablehead : {
    align:'center',
  },
  setHeight:{
    height:'80vh'
  },
  paperHeight:{
    height:400,
    overflowY:'scroll'
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});


class Sale extends React.Component {
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
 
 
 fetch('/emp/fetchallitems', {
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
}

  deleteClick = (index) => {
          console.log({index})
          console.log(this.state.data[index])
          var temp = this.state.cartItems;
          temp.push(this.state.data[index]);
          this.setState({
            cartItems : temp
          });
          this.reCalculateBill();
  }



  //recalculation of Bill

  reCalculateBill = () =>{
    var billTemp = 0;
    this.state.cartItems.map((item)=>{
      billTemp += parseInt(item.retail_price)
    });
    this.setState({
      bill:billTemp
    });
  }

  deleteClickHandler = () => {
    this.setState({
      isDisabled:false,
      buttonisDisabled:false,
    });
  }

  constructor(props){
    super(props);
    
    this.state = {
      t:this.props.token,
      data:{},
      id:'',
      cartItems:[],
      bill:0
    }

   this.deleteClick =  this.deleteClick.bind(this);
  }
  render() {
    const { classes } = this.props;
        return (
          <div className={classes.setHeight}>

            <Grid container className={classes.root} spacing={12}>  
              <Grid item xs={6}>
              <h1 className="text-center">
                  Available Items
              </h1>
              <Paper className={classes.paper || classes.paperHeight} >
                  <Table className={classes.table}>
                    <TableHead className={classes.tablehead}>
                      <TableRow>
                        <CustomTableCell>Name</CustomTableCell>
                        <CustomTableCell >Price</CustomTableCell>
                        <CustomTableCell >ID</CustomTableCell>
                        <CustomTableCell >Sale</CustomTableCell> 
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.values(this.state.data).map((type,index) => {
                            return (
                              <TableRow className={classes.row} key={type._id} selectable={true}>
                                <CustomTableCell>{type.item_name}</CustomTableCell>
                                <CustomTableCell >{type.retail_price}</CustomTableCell>
                                <CustomTableCell >{type.item_id}</CustomTableCell>
                                <CustomTableCell >
                                <Button  aria-label="Add" onClick={()=>{this.deleteClick(index)}} className={classes.button}>
                                <Cart/>
                                </Button>
                                </CustomTableCell>
                              </TableRow>
                        );
                      })
                      }
                    </TableBody>
                  </Table>
                  </Paper>
              </Grid>
              <Grid item xs={6}>
                    <h1 className="text-center">
                      Bill
                    </h1>
                <Paper className={classes.paper || classes.paperHeight}>
                  <Table className={classes.table}>
                    <TableBody>
                        {Object.values(this.state.cartItems).map((type,index) => {
                              return (
                                <TableRow className={classes.row} key={type._id} selectable={true}>
                                  <CustomTableCell>{type.item_name}</CustomTableCell>
                                  <CustomTableCell >{type.retail_price}</CustomTableCell>
                                </TableRow>
                          );
                        })
                        }
                      </TableBody>
                    </Table>
                </Paper>
                <Button  variant="raised" aria-label="Add" onClick className={classes.button}>
                   CheckOut
                </Button>
              </Grid>
            </Grid>
            <h2 className="text-center"> Total Bill = {this.state.bill}</h2>
          </div>
        );
      }
  }
  

Sale.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sale);

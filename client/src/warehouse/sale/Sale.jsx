import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from 'material-ui/Grid';
import Cart from '@material-ui/icons/AddShoppingCart';
import TextField from 'material-ui/TextField';

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
    height:'90vh',
    marginTop:'-50px'
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
  button: {
    maxWidth:'2px',

  }
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
 
 
 fetch('/emp/FetchItems', {
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
          var temp = this.state.cartItems;
          temp.push(this.state.data[index]);
          this.setState({
            cartItems : temp
          });
          this.reCalculateBill();
  }


//CheckOut and call API
  checkOut= () =>{
    var itemIdArray=[];
    this.state.cartItems.map((item)=>{
      itemIdArray.push(item.item_id);
    });
    var date = new Date();
    date.setHours(date.getHours()+5);
    var details = {
      'token':this.state.t,
      'sale':new Date(),
      'products':itemIdArray,
      'cnic':this.props.cnic
    };
  
 
  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  
  
      fetch('/emp/Makesale', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' 
        },
        body: formBody
      })
      .then(res=>res.json())
      .then(res=>{    
            console.log(res);
      }); 

      // reseting Bill portion
      this.setState({
        cartItems:[],
        bill:0,
        discount:0,
        originalBill:0
      });
  }
  
  
  //recalculation of Bill
  reCalculateBill = () =>{
    var billTemp = 0;
    this.state.cartItems.map((item)=>{
      billTemp += parseInt(item.retail_price)
    });
    this.setState({
      bill:billTemp,
      originalBill:billTemp,
    });
  }


  ResetBill=()=>{
    this.setState({
      bill:0,
      cartItems:[],
      originalBill:0,
      cartItems:[],
      itemName:''
    });
  }


  deleteClickHandler = () => {
    this.setState({
      isDisabled:false,
      buttonisDisabled:false,
    });
  }
  changeDiscount = e => {
    this.setState({
      discount:e.target.value,
    })
  }
  setDiscount = () => {
    let temp = parseInt(this.state.discount,10);
    temp=((temp/100)*this.state.bill)
    this.setState({
      bill:this.state.bill-temp,
      discount:0
    })
  }
  changeItemName = e => {
    this.setState({
      itemName:e.target.value,
    })
  }

  findItem = () => {
    let temp = []
    Object.values(this.state.data).map((type,index)=>{
      if (type.item_name.toLocaleLowerCase().indexOf(this.state.itemName.toLocaleLowerCase())>=0){
       temp.push(type);
      }
    })
    this.setState({
      data:temp
    })
  }
  cancelSearch = () => {
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
  
  
  fetch('/emp/FetchItems', {
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

  constructor(props){
    super(props);
    
    this.state = {
      t:this.props.token,
      data:{},
      id:'',
      cartItems:[],
      bill:0,
      originalBill:0,
      discount:0,
      itemName:''
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
              <TextField
                    id="itemname"
                    label="Find Item"
                    value={this.state.itemName}
                    placeholder="Find Item"
                    onChange={e => this.changeItemName(e)}
                    className={classes.textField}
                    margin="normal"
                />
                <Button  color="primary" onClick={this.findItem}  className={classes.button}>Find</Button>
                <Button  color="primary" onClick={this.cancelSearch}  className={classes.button}>All Items</Button>
                  <Table className={classes.table}>
                    <TableHead className={classes.tablehead}>
                      <TableRow>
                        <CustomTableCell>Name</CustomTableCell>
                        <CustomTableCell numeric >Price</CustomTableCell>
                        
                        <CustomTableCell numeric>Description</CustomTableCell> 
                        <CustomTableCell numeric>Sale</CustomTableCell> 
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.values(this.state.data).map((type,index) => {
                            return (
                              <TableRow className={classes.row} key={type._id} selectable={true}>
                                <CustomTableCell >{type.item_name}</CustomTableCell>
                                <CustomTableCell numeric >{type.retail_price}</CustomTableCell>
                                
                                <CustomTableCell numeric >{type.description}</CustomTableCell>
                                <CustomTableCell >
                                <Button  aria-label="Add" onClick={()=>{this.deleteClick(index)}} >
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
                <Button  variant="raised" aria-label="Add" onClick={()=>{this.ResetBill()}} >
                   Reset Bill
                </Button>
              </Grid>
            </Grid>
            <h2 className="text-center"> Original Bill = {this.state.originalBill}</h2>
            <h2 className="text-center"> Discounted Bill = {this.state.bill}</h2>
            <Grid container spacing={12}>
              <Grid item xs={12}>
            <TextField
             id="discount"
              label="discount"
              value={this.state.discount}
              placeholder="Enter Discount Percentage"
               onChange={e => this.changeDiscount(e)}
               className={classes.textField}
               margin="normal"
              />
               <Button variant='raised' aria-label="Done" onClick={this.setDiscount}>OK</Button>
              </Grid>
             
              <Grid item xs={12}>
              <Button  variant="raised" aria-label="Add" onClick={()=>{this.checkOut()}} >
                   CheckOut
                </Button>
                </Grid>
                </Grid>
          </div>
        );
      }
  }
  

Sale.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sale);

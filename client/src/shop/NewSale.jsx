import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import 'react-select/dist/react-select.css';
import Select from 'react-select';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClearIcon from '@material-ui/icons/Clear';
import Chip from 'material-ui/Chip';
import Input from 'material-ui/Input';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  container: {
    
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    
  },
  menu: {
    width: 200,
  },
  table: {
    width: '100%',
  },
  select:{
    width:'100%',
  },
  prntBtn:{
    width:'100%',
    marginTop:theme.spacing.unit *2,
    height:'60px'
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  '@global': {
    '.Select-control': {
      display: 'flex',
      alignItems: 'center',
      border: 0,
      height: 'auto',
      background: 'transparent',
      '&:hover': {
        boxShadow: 'none',
      },
    },
    '.Select-multi-value-wrapper': {
      flexGrow: 1,
      display: 'flex',
      flexWrap: 'wrap',
    },
    '.Select--multi .Select-input': {
      margin: 0,
    },
    '.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': {
      padding: 0,
    },
    '.Select-noresults': {
      padding: theme.spacing.unit * 2,
    },
    '.Select-input': {
      display: 'inline-flex !important',
      padding: 0,
      height: 'auto',
    },
    '.Select-input input': {
      background: 'transparent',
      border: 0,
      padding: 0,
      cursor: 'default',
      display: 'inline-block',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      margin: 0,
      outline: 0,
    },
    '.Select-placeholder, .Select--single .Select-value': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(16),
      padding: 0,
    },
    '.Select-placeholder': {
      opacity: 0.42,
      color: theme.palette.common.black,
    },
    '.Select-menu-outer': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      position: 'absolute',
      left: 0,
      top: `calc(100% + ${theme.spacing.unit}px)`,
      width: '100%',
      zIndex: 2,
      maxHeight: ITEM_HEIGHT * 4.5,
    },
    '.Select.is-focused:not(.is-open) > .Select-control': {
      boxShadow: 'none',
    },
    '.Select-menu': {
      maxHeight: ITEM_HEIGHT * 4.5,
      overflowY: 'auto',
    },
    '.Select-menu div': {
      boxSizing: 'content-box',
    },
    '.Select-arrow-zone, .Select-clear-zone': {
      color: theme.palette.action.active,
      cursor: 'pointer',
      height: 21,
      width: 21,
      zIndex: 1,
    },
    // Only for screen readers. We can't use display none.
    '.Select-aria-only': {
      position: 'absolute',
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      height: 1,
      width: 1,
      margin: -1,
    },
  },
});


const suggestions = [].map(suggestion => ({
  value: suggestion.id,
  label: suggestion.id,
  price : suggestion.price,
  id:suggestions.id
}));
const Idsuggestions = [].map(Idsuggestion => ({
  value: Idsuggestion.id,
  label: Idsuggestion.id,
  price :Idsuggestion.price,
  id:Idsuggestions.id
}));

var row = [].map(row => ({
  nam: row.nam,
  pric : row.pric,
  id:row.id
}));
var products = [].map(sale => ({

}));
class Option extends React.Component {
  handleClick = event => {
    this.props.onSelect(this.props.option, event);
  };

  render() {
    const { children, isFocused, isSelected, onFocus } = this.props;

    return (
      <MenuItem
        onFocus={onFocus}
        selected={isFocused}
        onClick={this.handleClick}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {children}
      </MenuItem>
    );
  }
}
function SelectWrapped(props) {
  const { classes, ...other } = props;

  return (
    <Select
      optionComponent={Option}
      noResultsText={<Typography>{'No results found'}</Typography>}
      arrowRenderer={arrowProps => {
        return arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
      }}
      clearRenderer={() => <ClearIcon />}
      valueComponent={valueProps => {
        const { value, children, onRemove } = valueProps;

        const onDelete = event => {
          event.preventDefault();
          event.stopPropagation();
          onRemove(value);
        };

        if (onRemove) {
          return (
            <Chip
              tabIndex={-1}
              label={children}
              className={classes.chip}
              deleteIcon={<CancelIcon onTouchEnd={onDelete} />}
              onDelete={onDelete}
            />
          );
        }

        return <div className="Select-value">{children}</div>;
      }}
      {...other}
    />
  );
}

const ITEM_HEIGHT = 48;


class TextFields extends React.Component {

  componentDidMount(){
    
    var details = {
      'token':this.state.t,
      'shopID':this.state.shop
  };

  console.log(details);
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    
    fetch('/shop/shopinventory', {
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
       this.updateSuggestions();
       this.updateIdSuggestions();
       
        console.log("Response : ");
        console.log(res);
      };
    }
    );
  };

  constructor(props){
    super(props)
    this.state={
      shop:this.props.shop,
      data:{},
      t:this.props.token,
      total:0,
      date:'2018-09-04 00:00:00.000',
     
    }

    
};


  state = {
    
    t:this.props.token,
    multiLabel: [],
    price:[],
    displayTable:{},
    dummy:[],
    data:{},
    single: null,
    display :'inline'
  };

  updateSuggestions= () =>
  {
    Object.values(this.state.data).map((type,i) => {
      suggestions.push({value:type.item_name,label:type.item_name,price:type.price,id:type.item_id})
    })
  }
  updateIdSuggestions= () =>
  {
    Object.values(this.state.data).map((type,i) => {
      console.log(type)
      Idsuggestions.push({value:type.id2,label:type.item_name,price:type.price,id:type.item_id})
    })
  }
  
  handleChange = name => value => {

    if(value){
    this.setState({
      [name]: value,
    });
   var x;
    for(var i=0;i<suggestions.length;i++)
    {
      if(suggestions[i].value === value)
      {
        console.log("selected is at index ");
        console.log(i);
        x = i;
      }
    }
    console.log("Selected item details");
    console.log(suggestions[x]);
    
      row.push({nam:suggestions[x].value,pric:suggestions[x].price,id:suggestions[x].id})
      products.push(suggestions[x].id);

      this.setState({
        total:suggestions[x].price + this.state.total
      })
      this.setState({data:{}})
      console.log("value of toal : ");
      console.log(this.state.total);
      console.log("Data in Row :")
      console.log(row);
      console.log("Ids to be Sold:")
      console.log(products);
      console.log("number of items in array :");
      console.log(row.length - 1);
    }

  };
  handleIdChange = name => value => {

    if(value){
    this.setState({
      [name]: value,
    });
   var x;
    for(var i=0;i<Idsuggestions.length;i++)
    {
      if(Idsuggestions[i].value === value)
      {
        x = i;
      }
    }
      row.push({nam:Idsuggestions[x].value,pric:Idsuggestions[x].price,id:Idsuggestions[x].id})
      products.push(suggestions[x].id);

      this.setState({
        total:Idsuggestions[x].price + this.state.total
      })
      this.setState({data:{}});
    }

  };

  handleSale = () =>
  {
    console.log("function is calling ");
      var detailsItem = {
        'token':this.state.t,
        'products':products,
        'shopID':this.state.shop,
        'sale':this.state.date,
      }
  
    console.log(detailsItem);
    
      var formBody = [];
      for (var property in detailsItem) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(detailsItem[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      
      fetch('/shop/Sale', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' 
        },
        body: formBody
      })
      .then(res=>res.json())
      .then(res=>{
        if(res){
          console.log("Response : ");
          console.log(res);
          this.setState({total:0})
          var siz = products.length;
          console.log("Before Splicing products ");
          console.log(products);
          products.splice(0,siz);
          console.log("After Splicing products ");
          console.log(products);
          console.log("Before Splicing Rows ");
          console.log(row);
          row.splice(0,siz);
          console.log("After Splicing Rows ");
          console.log(row);
          this.setState({data:{}})
          

        };
      }
      );
    
    };
    removeProduct = (item,price) =>
    {
      const tot = this.state.total;
      this.setState({
        total: tot - price
      })
      console.log("Row Data : ");
      console.log(row);
      var delr = row.findIndex(x => x.id === item);
      console.log("Getting Remove request for id :");
      console.log(item);
      console.log("Before Removing => ");
      console.log(products);
      const index = products.indexOf(item);
      console.log("Index of request : " + index);
      products.splice(index,1);
      row.splice(delr,1);
      console.log("After Removing Row");
      console.log(row);
      console.log("After Removing => ");
      console.log(products);
      this.forceUpdate();

    }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      <Grid container spacing={24}>

        <Grid item xs={12} sm={5}>
          <Paper className={classes.paper}>
          
      <form className={classes.container} noValidate autoComplete="off"> 
       <Input
       fullWidth
       inputComponent={SelectWrapped}
       value={this.state.single}
       onChange={this.handleIdChange('single')}
       placeholder="Search Items By Id"
       id="react-select-single"
       inputProps={{
         classes,
         name: 'react-select-single',
         instanceId: 'react-select-single',
         simpleValue: true,
         options: Idsuggestions,
       }}
     />
          <h2>Total : {this.state.total}</h2>
          <Button variant="raised" color="primary" className={classes.prntBtn} onClick={this.handleSale}  >Checkout</Button>
      </form>
      </Paper>
        </Grid>
        <Grid item xs={12} sm={7}>
       
        <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>

            <TableCell >Item Name </TableCell>
            <TableCell numeric>Price</TableCell>
            <TableCell>Delete </TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
        {
          Object.values(row).map((tr,i)=>{
            return(<TableRow key={i}>
            
              <TableCell>{tr.nam}</TableCell>
              <TableCell numeric>{tr.pric}</TableCell>
              <TableCell>
              <IconButton className={classes.button} aria-label="Delete" onClick={this.removeProduct.bind(this,tr.id,tr.pric)}>
                <DeleteIcon />
                </IconButton>
              </TableCell>
      </TableRow>)
          })}
       

 
          
        </TableBody>
      </Table>
    
    </Paper>
        </Grid>
      </Grid>
      
      </div>
    );
  }
}

Table.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { InputAdornment } from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';
import Button from 'material-ui/Button';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    flexBasis: 200,
  },
  button:{
    height:35,
    marginTop:10,
    marginLeft:15, 
  },textField1 :{
    marginTop:9,
    marginLeft:5,
  }
});

const ranges = [
  {
    value: 'Name',
    label: 'Name',
  },
  {
    value: 'ID # ',
    label: 'ID # ',
  },
];
function validate(search) {
  return {
    search: search.length === 0,
  };
}
class InputAdornments extends React.Component {
  constructor(){
    super();
  this.state = {
    searchBy : 'Name',
    value : 'name',
    search:''
  }}

  handleChange = prop => event => {
    this.setState({ searchBy: event.target.value });
    
  };

  handleSearchChange = (evt) => {
    this.setState({ search: evt.target.value });
  }
  handleSubmit = (evt) => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }
  }
  canBeSubmitted() {
    const errors = validate(this.state.search);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  render() {
    const { classes } = this.props;
    const errors = validate(this.state.search);
      const isDisabled = Object.keys(errors).some(x => errors[x]);

    return (
      <div className={classes.root}>
       
        <TextField
          select
          label="Search Item"
          className={classNames(classes.margin, classes.textField)}
          value={this.state.searchBy}
          onChange={this.handleChange('searchBy')}
          InputProps={{
            startAdornment: <InputAdornment position="start">By </InputAdornment>,
          }}
          >
          {ranges.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
       
        <TextField
        
          id="name"
          label={this.state.searchBy}
          className={classes.textField1}
          value={this.state.search}
          onChange={this.handleSearchChange}
          margin="normal"
        />
        <Button color="primary" variant="raised" className={classes.button} disabled={isDisabled}>
        Search
      </Button>
        
      </div>
    );
  }
}
InputAdornments.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputAdornments);
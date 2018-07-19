import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
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
  button: {
    margin: theme.spacing.unit,
  },
});
function validate(qrId) {
  return {
    qrId: qrId.length === 0,
  };
}

class TextFields extends React.Component {
  constructor(props){
    super(props);
  this.state = {
    qrId:'',
    t:this.props.token,
    shop:this.props.shop,
  }
}
  handleQrChange = (evt) => {
    this.setState({ qrId: evt.target.value });
  }
  handleSubmit = (evt) => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }
}
  canBeSubmitted() {
    const errors = validate(this.state.qrId);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }
  handleRecieve = () =>
  {
    console.log(this.state);
    var details = {
      'token':this.state.t,
      'number' : this.state.qrId,
      'shop_id' : this.state.shop
  };
  console.log(details);
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    fetch('/shop/recievepkg', {
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
       this.props.handleopen();
        console.log("After function");
        console.log(this.state.t);
      }
      else{
        this.props.handleError();
      }
      ;
    }
    );
  }
  render() {
    const errors = validate(this.state.qrId);
      const isDisabled = Object.keys(errors).some(x => errors[x]);
    const { classes } = this.props;
    return (
      <div>
      <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}> 
       <TextField
          id="recieveBox"
          label="Recieve Box "
          placeholder="Scan Box Qr Code "
          className={classes.textField}
          margin="normal"
          value={this.state.qrId}
            onChange={this.handleQrChange}
        />
        <Button color="primary" variant="raised" className={classes.button} disabled={isDisabled} onClick={this.handleRecieve}>
        Recieve
      </Button>
      </form>
      </div>
    );
  }
}
TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(TextFields);

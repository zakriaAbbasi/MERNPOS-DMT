import * as React from 'react';
import NumberInput from 'material-ui-number-input';
 
class Demo extends React.Component {
  constructor(props) {
  super(props);
  
  this.onKeyDown = (event) => {
    console.log(`onKeyDown ${event.key}`);
  };
  
  this.onChange = (event, value) => {
    const e = event;
    console.log(`onChange ${e.target.value}, ${value}`);
  };
  
  this.onError = (error) => {
    let errorText;
    console.log(error);
    switch (error) {
      case 'required':
        errorText = 'This field is required';
        break;
      case 'invalidSymbol':
        errorText = 'You are tring to enter none number symbol';
        break;
      case 'incompleteNumber':
        errorText = 'Number is incomplete';
        break;
      case 'singleMinus':
        errorText = 'Minus can be use only for negativity';
        break;
      case 'singleFloatingPoint':
        errorText = 'There is already a floating point';
        break;
      case 'singleZero':
        errorText = 'Floating point is expected';
        break;
      case 'min':
        errorText = 'You are tring to enter number less than -10';
        break;
      case 'max':
          errorText = 'You are tring to enter number greater than 12';
          break;
      }
      this.setState({ errorText: errorText });
    };
 
    this.onValid = (value) => {
      console.debug(`${value} is a valid number`);
    };
 
    this.onRequestValue = (value) => {
      console.log(`request ${JSON.stringify(value)}`);
      this.setState({ value: value })
    }
  }
    
  render() {
    const { state, onChange, onError, onKeyDown, onValid, onRequestValue } = this; 
    return (
      <NumberInput
        id="num"
        value={state.value}
        required
        defaultValue={9}
        min={-10}
        max={12}
        strategy="warn"
        errorText={state.errorText}
        onValid={onValid}
        onChange={onChange}
        onError={onError}
        onRequestValue={onRequestValue}
        onKeyDown={onKeyDown} />
    );
  }
}
export default Demo;
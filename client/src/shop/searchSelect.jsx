import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Select from 'react-select';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import 'react-select/dist/react-select.css';


class App extends React.Component {
  state = {
    selectedOption: '',
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    
  }
  
  render() {
    const { classes } = this.props;
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;
    const data = 
    [
      {value : 'Hamza' , label : 'Hamza'},
      {value : 'Faizan' , label : 'Faizan'},
      {value : 'Sajawal' , label : 'Sajawal'},
      {value : 'Murtaza' , label : 'Murtaza'}
    ];
    
    return (
      <div>
          <Select
          name="form-field-name"
          value={value}
          onChange={this.handleChange}
          options={data}/>
        </div>
      
    );
  }
}

export default App;

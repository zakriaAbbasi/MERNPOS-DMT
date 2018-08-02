import React from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import Button from 'material-ui/Button';

Charts(FusionCharts);

var myDataSource = {
  chart: {
    caption: 'POS Store',
    subCaption: 'Last 3 Days Sale',
    numberPrefix: 'Rs.',
  },
  data: [
    {
      label: '',
      value: '',
    },
    {
      label: '',
      value: '',
    },
    {
      label: '',
      value: '',
    },
    {
      label: '',
      value: '',
    },
    {
      label: '',
      value: '',
    },
    {
      label: '',
      value: '',
    },
    {
      label: '',
      value: '',
    },
  ],
};

const chartConfigs = {
  type: 'column2d',
  width: 600,
  height: 400,
  dataFormat: 'json',
  dataSource: myDataSource,
};

export default class extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      t:this.props.token,
    };


  }

  oneDay = () => {
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
    
    fetch('/admin/fetchsales', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' 
      },
      body: formBody
    })
    .then(res=>res.json())
    .then(res=>{
      console.log(res)
      console.log("we are in this function");
      if(res){
          Object.values(res).map((type,index)=> {
            myDataSource.data[index].label=type.date_sale;
            myDataSource.data[index].value=type.total
          })
          this.setState({

          })

      };
    }
    );
    console.log(myDataSource.data)
  }

  threeDay = () => {
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
    
    fetch('/admin/fetchsales', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' 
      },
      body: formBody
    })
    .then(res=>res.json())
    .then(res=>{
      console.log(res)
      console.log("we are in this function");
      console.log(this.state.t);
      console.log(res);
      if(res){
          Object.values(res).map((type,index)=> {
            myDataSource.data[index].label=type.date_sale;
            myDataSource.data[index].value=type.total
          })

      };
    }
    );
    console.log(myDataSource.data)
  }
  tenDay = () => {
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
    
    fetch('/admin/fetchsales', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' 
      },
      body: formBody
    })
    .then(res=>res.json())
    .then(res=>{
      console.log(res)
      console.log("we are in this function");
      console.log(this.state.t);
      console.log(res);
      if(res){
          Object.values(res).map((type,index)=> {
            myDataSource.data[index].label=type.date_sale;
            myDataSource.data[index].value=type.total
          })

      };
    }
    );
    console.log(myDataSource.data)
  }
    render() {
        return(
            <div>
              <Button variant="raised" onClick={this.oneDay.bind(this)}>1 Day</Button>
              <Button variant="raised" onClick={this.threeDay}>3 Day</Button>
              <Button variant="raised" onClick={this.tenDay}>10 Day</Button>
            <ReactFC {...chartConfigs}/>
            </div>
        )
    }
}
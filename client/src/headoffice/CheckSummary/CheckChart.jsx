import React from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Button } from 'material-ui';

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
  });

Charts(FusionCharts);

var myDataSource = {
  chart: {
    caption: 'POS Store',
    subCaption: 'Last 3 Days Sale',
    numberPrefix: 'Rs.',
  },
  data: [
    {
      label: '35',
      value: '5000',
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

class DatePickers extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      t:this.props.token,
      date1:'',
      date2:'',
    };


  }

  setDate1 = e => {
      this.setState({
          date1:e.target.value
      })
      
  }
  setDate2 = e => {
    this.setState({
        date2:e.target.value
    })
  }
    checkData = () => {
      console.log(this.state.date1)
        var details = {
            'token':this.state.t,
            'fromdate':this.state.date1,
             'todate':this.state.date2
        };
          var formBody = [];
          for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join("&");
          
          fetch('/admin/showstats', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' 
            },
            body: formBody
          })
          .then(res=>res.json())
          .then(res=>{
            if(res){
                Object.values(res).map((type,index)=> {
                    console.log(type.totalsale)
                    console.log(type.profit)
                    myDataSource.data.label=type.totalsale;
                    myDataSource.data.value=type.profit
                })
                this.setState({

                })
            };
          }
          );
          console.log(myDataSource.data)
    }

    render() {
        const { classes } = this.props;
        return(
            <div>
                <form className={classes.container} noValidate>
                <TextField
                    id="date1"
                    label="From "
                    type="date"
                    defaultValue={new Date()}
                    onChange={e => this.setDate1(e)}
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                </form>
                <form className={classes.container} noValidate>
                <TextField
                    id="date1"
                    label="To"
                    type="date"
                    defaultValue={new Date()}
                    onChange={e => this.setDate2(e)}
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                 <Button variant="raised" color="primary" onClick={this.checkData}>Check</Button>
                </form>
               
            <ReactFC {...chartConfigs}/>
            </div>
        )
    }
}


DatePickers.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(DatePickers);
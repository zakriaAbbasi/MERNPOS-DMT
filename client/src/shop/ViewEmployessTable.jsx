import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#3f51b5',
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
  button:{
    marginLeft:15,
  },
  
});

let id = 0;
function createData(name, contact, cnic) {
  id += 1;
  return { id, name, contact, cnic};
}

const data = [
  createData('Employee Name . . . . ', '03193088475', '31302-111111-2'),
  createData('Employee Name . . . . ', '0339328475', '31302-111111-2'),
  createData('Employee Name . . . . ', '031102475', '31302-111111-2'),

 
 
];

function CustomizedTable(props) {
  const { classes } = props;

  return (
    <div><Paper className={classes.root}>
      <TextField
          id="searchEmployees"
          label="Search Employee "
          placeholder="Enter Employee Name "
          className={classes.textField}
          margin="normal"
        />
        <Button color="primary" variant="raised" className={classes.button}>
        Search
      </Button>
      <Table className={classes.table}>
        <TableHead>
        <TableRow>
            <CustomTableCell>Employee Name </CustomTableCell>
            <CustomTableCell numeric>Contact # </CustomTableCell>
            <CustomTableCell numeric>CNIC # </CustomTableCell>
            
            
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => {
            return (
              <TableRow className={classes.row} key={n.id}>
                <CustomTableCell>{n.name}</CustomTableCell>
                <CustomTableCell numeric>{n.contact}</CustomTableCell>
                <CustomTableCell numeric>{n.cnic}</CustomTableCell>
               
                
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
    </div>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);

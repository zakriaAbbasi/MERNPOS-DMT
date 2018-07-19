import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';

const styles2 = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: '100%',
      marginRight: '100%',
      position:'center',
      width: 500,
    },
    menu: {
      width: 200,
    },
    margin: {
        margin: theme.spacing.unit,
      },
  });

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
};

function ButtonAppBar(props) {
  const { classes } = props;

  return (
      <div>
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Powered By NerdWare
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
     <div>
     <div className={classes.margin}>
       <Grid container spacing={8} alignItems="center">
         <Grid item>
         <TextField id="name" label="Name" />
         </Grid>
         </Grid>
         <Grid>
         <Grid item>
           <TextField id="password" label="Password" type="password" />
         </Grid>
       </Grid>
       <Grid>
         <Grid item>
           <Button />
         </Grid>
       </Grid>
     </div>
   </div>
   </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
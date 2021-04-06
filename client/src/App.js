import { makeStyles } from '@material-ui/core/styles';
import {Paper , Grid , Typography} from '@material-ui/core';
import View from './Components/View';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
const App= () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography component="h3" variant="h2" style={{textAlign:"center"}}>
            File Managment
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <View />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

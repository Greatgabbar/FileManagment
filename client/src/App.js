import { makeStyles } from '@material-ui/core/styles';
import {Grid , Typography} from '@material-ui/core';
import View from './Components/View';
import {Route ,BrowserRouter as Router, Switch} from 'react-router-dom'
import Control from './Components/Control'
import Move from './Components/Move'

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
          <Router>
          <Switch>
            <Route path="/">
        <Grid item xs={12} sm={6}>
              <View />
        </Grid>
        <Grid item xs={12} sm={6}>
              <Control />
              <Move/>
        </Grid>
            </Route>
          </Switch>
          </Router>
      </Grid>
    </div>
  );
}

export default App;

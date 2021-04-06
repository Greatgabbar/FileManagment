import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign:'center',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

const Control=()=>{
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <Button variant="contained" color="secondary">
                Add Folder
            </Button>
            <Button variant="contained" color="secondary">
                Add File
            </Button>
            <Button variant="contained" color="secondary">
                Move
            </Button>
        </div>
    )
}

export default Control;
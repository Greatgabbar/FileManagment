import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import axios from '../util/axios'
import {useState} from 'react';
import {useHistory,useLocation} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign:'center',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

const Move=()=>{
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [to,setTo] = useState('');
    const location = useLocation();
    const handleClickOpen = () => {
      setOpen(true);
    };
    const addFile = ()=>{
      if(location.pathname==="/"){
        axios({
          method:'POST',
          url:`/folder/new`,
          data:{
              name : name,
              to : 'root'
          }
        }).then(res=> {
          console.log(res);
        }).catch(err=>console.log(err));
      }else{
        axios({
          method:'POST',
          url:`/folder/new`,
          data:{
              name : name,
              to : to
          }
        }).then(res=> {
          console.log(res);
          window.location.reload();
        }).catch(err=>console.log(err));
      }
    }
    const handleChange = (event) => {
        setName(event.target.value);
    }
    const handleChanget = (event) => {
      setTo(event.target.value);
    }
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div className={classes.root}>

        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Move
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add Folder/File</DialogTitle>
          <DialogContent>
            <DialogContentText>
              *For adding folder in root use root in Destination folder
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Folder Name"
              type="text"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Destination folder"
              type="text"
              fullWidth
              onChange={handleChanget}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={addFile} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
}
export default Move;
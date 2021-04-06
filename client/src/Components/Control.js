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
import {useLocation} from 'react-router-dom';

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
    const [open, setOpen] = useState(false);
    const [type, setType] = useState('');
    const [text,setText] = useState('');
    const location = useLocation();
    const handleClickOpen = () => {
      setOpen(true);
    };
    const addFile = ()=>{
      const tt= type==="file" ? 'file' :'folder';
      if(location.pathname==="/"){
        axios({
          method:'POST',
          url:`/${tt}/new`,
          data:{
              name : text
          }
        }).then(res=> {
          console.log(res);
          window.location.reload();
        }).catch(err=>console.log(err));
      }else{
        const str= location.pathname.split('/');
        axios({
          method:'POST',
          url:`/${tt}/new`,
          data:{
              name : text,
              parent: str[str.length-1]
          }
        }).then(res=> {
          console.log(res);
          window.location.reload();
        }).catch(err=>console.log(err));
      }
    }
    const handleChange = (event) => {
        setType(event.target.value);
    }
    const handleChanget = (event) => {
      setText(event.target.value);
    }
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div className={classes.root}>

        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add Folder/File</DialogTitle>
          <DialogContent>
            <DialogContentText>
              
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              onChange={handleChanget}
            />
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="file">File</MenuItem>
          <MenuItem value="folder">Folder</MenuItem>
        </Select>
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
export default Control;
import {useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import axios from '../util/axios';
import {useHistory,useLocation,useParams} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));


const View = (props) => {
    const classes = useStyles();
      const [foldata,setFoldata]= useState([]);
    const history = useHistory();
    const params=useParams();
    const location = useLocation();
const deleteHandle = (name)=>{
    axios({
        method:'POST',
        url:'/file/del',
        data:{
            name : name
        }
    }).then(res=> {
        const arr=foldata.filter(gg=>gg.name!==name);
        setFoldata(arr);
    }).catch(err=>console.log(err));
}

const clickHandle=(name,cat)=>{
  if(cat==='file')
    return;
    let loc;
    if(location.pathname==="/"){
      loc=`/${name}`;
    }else{
      loc=location.pathname+ `/${name}`;
    }
    history.push(`${loc}`);
}

  useEffect(()=>{
    if(location.pathname==='/'){
      axios.get('/folder/info/root').then(data=>{
          console.log(data);
          setFoldata(data.data);
      })
    }else{
      const str= location.pathname.split('/');
      axios.get(`/folder/info/${str[str.length-1]}`).then(data=>{
        console.log(data);
        setFoldata(data.data);
    })
    }
  },[location.pathname])
  const list= foldata ? foldata.map(data=>{
        return (
            <ListItem button key={data._id} onClick={()=>{clickHandle(data.name,data.cat)}}>
                  <ListItemAvatar>
                    <Avatar>
                      {data.cat==="folder" ? <FolderIcon /> : <InsertDriveFileIcon/>}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${data.name}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={()=>{deleteHandle(data.name)}}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
        )
    }) : null;


  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className={classes.title}>
            Folders
          </Typography>
          <div className={classes.demo}>
            <List>
                {list}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}


export default View;
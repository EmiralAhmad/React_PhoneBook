import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';

import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState ({contact: '', name: '', title: '', tags: '', selectedFile: ''});
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
      if (post) setPostData(post);
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId) {
          dispatch(updatePost(currentId, postData));
        } else {
          dispatch(createPost(postData));          
        }
        
        clear();
    }

    const clear = () => {
      setCurrentId(0);
      setPostData({contact: '', name: '', title: '', tags: '', selectedFile: ''});
    }

    return (
      <Paper className={classes.paper} elevation={6}>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
          <Typography variant="h6">{ currentId ? 'Editing' : 'Creating' } a Contact</Typography>
          <TextField name="name" variant="outlined" label="Name" fullWidth value={postData.name} onChange={(e) => setPostData({ ...postData, name: e.target.value })} />
          <TextField name="contact" variant="outlined" label="Contact" fullWidth value={postData.contact} onChange={(e) => setPostData({ ...postData, contact: e.target.value })} />
          <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
          <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
          <div className={classes.fileInput}>
            <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
          </div>
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>
            Submit
          </Button>
          <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
            Clear
          </Button>
        </form>
      </Paper>
    );
}

export default Form;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    marginBottom: {
        marginBottom: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
}));

const TopBar = () => {
    const classes = useStyles(); 

    return (
        <AppBar position="static" className={classes.marginBottom}>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    Asteroid Topbar
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default TopBar;
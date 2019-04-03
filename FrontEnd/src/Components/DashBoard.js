import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Auth from './Auth';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import PowerSettingNew from '@material-ui/icons/PowerSettingsNew';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Assignment from '@material-ui/icons/Assignment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ManageUser from "./ManageUser";
import ManageCountry from "./ManageCountry";
import ManageRole from "./Roles";


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
        float: 'right'
    },

    logout: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
});



class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    logout = () => {
        Auth.logout(() => {
            this.props.history.push("/")
        })
    }

    componentDidMount() {

    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12} className={classes.logout}>
                        <AppBar position="static">
                            <Toolbar>
                                <Typography variant="h6" color="inherit" className={classes.root}>
                                    {"Super Admin"}
                                </Typography>
                                <IconButton onClick={this.logout} className={classes.menuButton} color="inherit" aria-label="Open drawer">
                                    <PowerSettingNew />
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                    </Grid>
                </Grid>
                <Grid container spacing={24}>
                    {/* <Grid item xs={3} className={classes.logout}>
                        <Paper className={classes.root}>
                            <MenuList>
                                <MenuItem>
                                    <ListItemIcon>
                                        <AccountCircle />
                                    </ListItemIcon>
                                    <Typography variant="inherit">Manage User and Roles</Typography>
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon>
                                        <Assignment />
                                    </ListItemIcon>
                                    <Typography variant="inherit">Manage Country</Typography>
                                </MenuItem>
                            </MenuList>
                        </Paper>
                    </Grid> */}
                    <Grid item xs={12} className={classes.logout}>
                        <ManageCountry />
                    </Grid>
                    <Grid item xs={6} className={classes.logout}>
                        <ManageUser />
                    </Grid>
                    <Grid item xs={6} className={classes.logout}>
                        <ManageRole />
                    </Grid>
                </Grid>


            </div>
        )
    }
}


export default withStyles(styles)(Home);
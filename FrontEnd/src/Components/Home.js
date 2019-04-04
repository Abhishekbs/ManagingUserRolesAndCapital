import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Auth from './Auth';
import { NavLink } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
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
import ProtectedRoutes from './protectedRoutes'



// const switchRoutes = (
//     <Switch>
//         <ProtectedRoutes path="/app/manageuser" component={ManageUser} exact />
//         <ProtectedRoutes path="/app/managecountry" component={ManageCountry} exact />
//     </Switch>
// );


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
        float: 'right',
        color: 'white'
    },

    logout: {
        display: 'flex',
        justifyContent: 'flex-end'
    },

    children: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: 30
    }
});

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    logout = () => {
        Auth.logout();
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
                                <NavLink to='login'>
                                    <IconButton onClick={this.logout} className={classes.menuButton} color="inherit" aria-label="Open drawer">
                                        <PowerSettingNew />
                                    </IconButton>
                                </NavLink>
                            </Toolbar>
                        </AppBar>
                    </Grid>
                </Grid>
                <Grid container spacing={24}>
                    <Grid item xs={3} className={classes.logout}>
                        <Paper className={classes.root}>
                            <MenuList>
                                <MenuItem >
                                    <NavLink to='/manageuser'>
                                        <Typography variant="inherit">Manage User and Roles</Typography>
                                    </NavLink>
                                </MenuItem>
                                <MenuItem>
                                    <NavLink to='/managecountry'>
                                        <Typography variant="inherit">Manage Country</Typography>
                                    </NavLink>
                                </MenuItem>
                            </MenuList>
                        </Paper>
                    </Grid>
                    <Grid item xs={9} className={classes.children}>
                        {this.props.children}
                    </Grid>
                </Grid>

            </div>
        )
    }
}


export default withStyles(styles)(Home);
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import User from './User';
import Role from './Roles';

const configUrl = "http://localhost:3005/"

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing.unit,
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


class ManageUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            permission: JSON.parse(localStorage.getItem("permission"))
        }
    }

    render() {
        const { classes } = this.props;
        const {  permission } = this.state;
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs>
                    {permission.addUserOnly ?
                        <User /> :  <div>DOnt have permission to manipulate user</div>
                    }
                    </Grid>

                    <Grid item xs>
                        {permission.addRoleOnly ?
                            <Role /> : <div>DOnt have permission to manipulate roles</div>
                        }
                    </Grid>

                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(ManageUser);
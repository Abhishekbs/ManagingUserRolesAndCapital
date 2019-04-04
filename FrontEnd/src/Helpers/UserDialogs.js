import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';

const styles = {
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
};

class DialogsPopup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: null,
            role: null
        }
    }

    componentDidMount() {
        const selectedUser = this.props.selectedUser;
        if (selectedUser != null) {
            this.setState({
                userName: selectedUser.userName,
                role: selectedUser.role
            })
        }
    }

    handleClose = () => {
        this.props.onClose();
    };

    handleChange = (event, key) => {
        // this.setState({ [key]: event.target.value });
        this.props.changeSelectedUser(key, event.target.value);
    };

    handleUser = () => {
        this.props.userOperation(this.props.action, this.state)
    }


    render() {
        const { classes, onClose, selectedUser, roleList, userOperation, action, ...other } = this.props;
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <DialogTitle id="simple-dialog-title">User</DialogTitle>
                <div className={classes.container}>
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="component-simple">User Name</InputLabel>
                                <Input id="component-simple" value={selectedUser.userName} onChange={(e) => this.handleChange(e, "userName")} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="age-simple">Role</InputLabel>
                                <Select
                                    multiple
                                    value={selectedUser.role}
                                    onChange={(e) => this.handleChange(e, "role")}
                                    inputProps={{
                                        name: 'Role',
                                        id: 'role-simple',
                                    }}
                                >
                                    {
                                        roleList.map((ele) => (
                                            <MenuItem value={ele.role}>{ele.role}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" className={classes.button} onClick={this.handleUser}>
                                {action === "create" ? "Add" : "Update"}
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </Dialog >
        );
    }
}

export default withStyles(styles)(DialogsPopup);
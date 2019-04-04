import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const emails = ['Karnataka', 'Maharastra'];
const styles = {
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
};

const permissionCheckList = [
    {
        value: 'addRoleOnly',
        text: "Can Add and Manipulate Role Only"
    },
    {
        value: 'addUserOnly',
        text: "Can Add and Manipulate User Only"
    },
    {
        value: "addCountryOnly",
        text: "Add Countries and Capital Only"
    },
    {
        value: "editCreatedCountryOnly",
        text: "Edit added Country and Capital only"
    },
    {
        value: "viewCountryList",
        text: "Only view these list"
    }
]

class DialogsPopup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            role: null
        }
    }

    componentDidMount() {
        const selectedRole = this.props.selectedRole;
        if (selectedRole != null) {
            this.setState({
                role: selectedRole.role
            })
        }
    }

    handleToggle = value => () => {
        const { permission: checked } = this.props.selectedRole;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.props.changeSelectedRole("permission", newChecked);

        // this.setState({
        //     checked: newChecked,
        // });
    };

    handleClose = () => {
        this.props.onClose();
    };

    handleChange = (event, key) => {
        // this.setState({ [key]: event.target.value });
        this.props.changeSelectedRole(key, event.target.value);
    };

    handleUser = () => {
        if (this.props.selectedRole.permission.length === 0) {
            console.log("Permission list empty");
        } else {
            this.props.roleOperation(this.props.action, this.state);
        }
    }


    render() {
        const { classes, onClose, selectedRole, roleOperation, action, ...other } = this.props;
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <DialogTitle id="simple-dialog-title">Role</DialogTitle>
                <div className={classes.container}>
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="component-simple">Role</InputLabel>
                                <Input id="component-simple" disabled={this.props.action === "edit"} value={selectedRole.role} onChange={(e) => this.handleChange(e, "role")} />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <List className={classes.root}>
                                {permissionCheckList.map(value => (
                                    <ListItem key={value.value} role={undefined} dense button onClick={this.handleToggle(value.value)}>
                                        <Checkbox
                                            checked={selectedRole.permission.indexOf(value.value) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                        />
                                        <ListItemText primary={value.text} />
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>

                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" className={classes.button} onClick={this.handleUser}>
                                {action == "create" ? "Add" : "Update"}
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </Dialog >
        );
    }
}

export default withStyles(styles)(DialogsPopup);
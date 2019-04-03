import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DialogsPopup from '../Helpers/RoleDialogs';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import axios from 'axios';
axios.defaults.headers.common['X-CUSTOM_HEADER'] = 'CUSTOMER PORTAL';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://localhost:3005';
axios.defaults.headers.common['authorization'] = 'Bearer '+localStorage.getItem('token');
const configUrl = "http://localhost:3005";


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

// let id = 0;
// function createData(name, calories, fat, carbs, protein) {
//     id += 1;
//     return { id, name, calories, fat, carbs, protein };
// }

// const rows = [
//     createData('Frozen yoghurt', 159),
//     createData('Ice cream sandwich', 237),
//     createData('Eclair', 262),
//     createData('Cupcake', 305),
//     createData('Gingerbread', 3569),
// ];


class ManageRole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            selectedRole: {
                role: null,
                permission:[]
            },
            action: null,
            roleList: []
        }
    }



    componentDidMount() {
        //call api to get all user list
        let self = this;
        axios.get(configUrl + '/role/getRole')
            .then(function (response) {
                self.setState({
                    roleList: response.data.data
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleClose = () => {
        this.setState({
            selectedRole: {
                ...this.state.selectedRole,
                role: null
            },
            open: false
        });
    };

    handleClickOpen = (action, data) => {
        if (data === undefined) {
            data = {
                role: null,
                permission:[]
            }
        }
        this.setState({
            open: true,
            selectedRole: data,
            action
        });
    };

    changeSelectedValue = (key, value) => {
        this.setState({
            selectedRole: {
                ...this.state.selectedRole,
                [key]: Array.isArray(value) ? [...value] : value
            }
        })
    }

    handleDeleteUser = (data) => {
        axios.post(configUrl + '/role/deleteRole', data)
            .then((response) => {
                this.setState({
                    roleList: [...response.data.data]
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    roleOperation = (action) => {
        let data = this.state.selectedRole;
        if (action == 'create') {
            // create New One
            // post call
            axios.post(configUrl + '/role/addRole', data)
                .then((response) => {
                    this.setState({
                        roleList: [...response.data.data],
                        open: false
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });

        } else {
            // update Existing
            // put call
            axios.post(configUrl + '/role/updateRole', data)
                .then((response) => {
                    this.setState({
                        roleList: [...response.data.data],
                        open: false
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }

    render() {
        const { classes } = this.props;
        const { roleList } = this.state;
        return (
            <div className={classes.root}>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" className={classes.button}
                        onClick={() => this.handleClickOpen('create')} >
                        Add Role
                        </Button>
                    <DialogsPopup
                        selectedRole={this.state.selectedRole}
                        open={this.state.open}
                        onClose={this.handleClose}
                        action={this.state.action}
                        roleOperation={this.roleOperation}
                        changeSelectedRole={this.changeSelectedValue}
                    />
                </Grid>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Paper className={classes.root}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">Roles</TableCell>
                                        <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {roleList.map(row => (
                                        <TableRow key={row.id}>
                                            
                                            <TableCell align="right">{row.role}</TableCell>
                                            <TableCell align="right">                                               
                                                <IconButton
                                                    aria-label="More"
                                                    aria-haspopup="true"
                                                    onClick={this.handleClick}
                                                >
                                                    <Delete onClick={() => this.handleDeleteUser(row)} />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>



                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(ManageRole);
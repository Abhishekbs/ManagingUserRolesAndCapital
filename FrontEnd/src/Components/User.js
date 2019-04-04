import React from 'react';
import Grid from '@material-ui/core/Grid';
import MenuBar from './MenuBar';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DialogsPopup from '../Helpers/UserDialogs';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import axios from 'axios';
import api from './apicall';
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


class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            selectedUser: {
                userName: null,
                role: []
            },
            action: null,
            userList: [],
            roleList: []
        }
    }



    componentDidMount() {
        //call api to get all user list
        api.getUser().then((response) => {
            api.getRole().then((response1) => {
                this.setState({
                    userList: response.data.data,
                    roleList: response1.data.data
                })
            });
        });

    }

    handleClose = () => {
        this.setState({
            selectedUser: {
                ...this.state.selectedUser,
                userName: null,
                role: []
            },
            open: false
        });
    };

    handleClickOpen = (action, data) => {
        if (data === undefined) {
            data = {
                userName: null,
                role: []
            }
        }
        this.setState({
            open: true,
            selectedUser: data,
            action
        });
    };

    changeSelectedValue = (key, value) => {
        this.setState({
            selectedUser: {
                ...this.state.selectedUser,
                [key]: value
            }
        })
    }

    handleDeleteUser = (data) => {

        api.deleteUser(data).then((response) => {
            this.setState({
                userList: [...response.data.data]
            })
        });

        // axios.post(configUrl + '/user/deleteUser', data)
        //     .then((response) => {
        //         this.setState({
        //             userList: [...response.data.data]
        //         })
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
    }

    userOperation = (action) => {
        let data = this.state.selectedUser;
        if (action === 'create') {
            // create New One
            // post call

            api.addUser(data).then((response) => {
                this.setState({
                    userList: [...response.data.data],
                    open: false
                })
            });
    





            // axios.post(configUrl + '/user/addUser', data)
            //     .then((response) => {
            //         this.setState({
            //             userList: [...response.data.data],
                        
            //         })
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     });

        } else {
            // update Existing
            // put call

            api.updateUser(data).then((response) => {
                this.setState({
                    userList: [...response.data.data],
                    open: false
                })
            });
    



            // axios.post(configUrl + '/user/updateUser', data)
            //     .then((response) => {
            //         this.setState({
            //             userList: [...response.data.data],
            //             open: false
            //         })
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     });
        }

    }

    render() {
        const { classes, history } = this.props;
        const { userList } = this.state;
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" className={classes.button}
                            onClick={() => this.handleClickOpen('create')} >
                            Add User
                        </Button>
                        <DialogsPopup
                            selectedUser={this.state.selectedUser}
                            open={this.state.open}
                            onClose={this.handleClose}
                            action={this.state.action}
                            userOperation={this.userOperation}
                            changeSelectedUser={this.changeSelectedValue}
                            roleList={this.state.roleList}
                        />
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <Paper className={classes.root}>
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>User Name</TableCell>
                                            <TableCell align="right">Roles</TableCell>
                                            <TableCell align="right">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {userList.map(row => (
                                            <TableRow key={row.id}>
                                                <TableCell component="th" scope="row">
                                                    {row.userName}
                                                </TableCell>
                                                <TableCell align="right">{row.role}</TableCell>
                                                <TableCell align="right">


                                                    <IconButton
                                                        aria-label="More"
                                                        aria-haspopup="true"
                                                        onClick={this.handleClick}
                                                    >
                                                        <Edit onClick={() => this.handleClickOpen('edit', row)} />
                                                    </IconButton>

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
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(User);
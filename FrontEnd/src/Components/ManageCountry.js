import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import DialogsPopup from '../Helpers/CountryDialogs';
import Button from '@material-ui/core/Button';
import axios from 'axios';
// axios.defaults.baseURL = base_url === '' ? window.location.pathname : base_url;
axios.defaults.headers.common['authorization'] = 'Bearer '+localStorage.getItem('token');
axios.defaults.headers.common['X-CUSTOM_HEADER'] = 'CUSTOMER PORTAL';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://localhost:3005';

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



class ManageCountry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            selectedCountry: {
                countryName: null,
                capital: null
            },
            action: null,
            countryList: [],
            permission: localStorage.getItem("permission")
        }
    }

    componentDidMount() {
        //call api to get all country list
        let self = this;
        axios.get(configUrl + '/country/getCountry')
            .then(function (response) {
                self.setState({
                    countryList: response.data.data
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleClose = () => {
        this.setState({
            selectedCountry: {
                ...this.state.selectedCountry,
                countryName: null,
                capital: null
            },
            open: false
        });
    };

    handleClickOpen = (action, data) => {
        
        if (data === undefined) {
            data = {
                countryName: null,
                capital: null
            }
        }
        this.setState({
            open: true,
            selectedCountry: data,
            action
        });
    };

    changeSelectedValue = (key, value) => {
        this.setState({
            ...this.selectedCountry,
            selectedCountry: {
                ...this.state.selectedCountry,
                [key]: value
            }
        })
    }

    handleDeleteCountry = (data) => {
        axios.post(configUrl + '/country/deleteCountry', data)
            .then((response) => {
                this.setState({
                    countryList: [...response.data.data]
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    countryOperation = (action) => {
        let data = this.state.selectedCountry;
        if (action == 'create') {
            // create New One
            // post call
            axios.post(configUrl + '/country/addCountry', data)
                .then((response) => {
                    this.setState({
                        countryList: [...response.data.data],
                        open: false
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });

        } else {
            // update Existing
            // put call
            axios.post(configUrl + '/country/updateCountry', data)
                .then((response) => {
                    this.setState({
                        countryList: [...response.data.data],
                        open:false
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }

    render() {
        const { classes } = this.props;
        const ary = ['1', '2', '3', '4'];
        const { countryList, permission } = this.state;
        console.log("managecountry");
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" className={classes.button}
                            onClick={() => this.handleClickOpen('create')} >
                            Add Country
                        </Button>
                        {this.state.action &&
                            <DialogsPopup
                                selectedCountry={this.state.selectedCountry}
                                open={this.state.open}
                                onClose={this.handleClose}
                                action={this.state.action}
                                countryOperation={this.countryOperation}
                                changeSelectedValue={this.changeSelectedValue}
                                permission={permission}
                            />
                        }
                    </Grid>
                    {
                        countryList.map((element) => (
                            <Grid item xs={2}>
                                <Card className={classes.card}>
                                    <CardContent>
                                        <Typography variant="h5" component="h2">
                                            {element.countryName}
                                        </Typography>
                                        <Typography component="p">
                                            Capital : {element.capital}
                                        </Typography>
                                        <IconButton
                                            aria-label="More"
                                            aria-haspopup="true"
                                            onClick={this.handleClick}
                                        >
                                            <Edit onClick={() => this.handleClickOpen('edit', element)} />
                                        </IconButton>

                                        <IconButton
                                            aria-label="More"
                                            aria-haspopup="true"
                                            onClick={this.handleClick}
                                        >
                                            <Delete onClick={() => this.handleDeleteCountry(element)} />
                                        </IconButton>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(ManageCountry);
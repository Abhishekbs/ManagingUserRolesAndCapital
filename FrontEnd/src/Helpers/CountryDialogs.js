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

const emails = ['Karnataka', 'Maharastra'];
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
            countryName: null,
            capital: null
        }
    }

    componentDidMount() {
        console.log("did mount");

        const selectedValue = this.props.selectedValue;
        if (selectedValue != null) {
            this.setState({
                countryName: selectedValue.countryName,
                capital: selectedValue.capital
            })
        }
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     console.log(nextProps, prevState);
    //     console.log("nextProps, prevState");
    //     if (nextProps.selectedCountry) {
    //         return { countryName: nextProps.selectedCountry.countryName, capital: nextProps.selectedCountry.capital };
    //     }
    //     else{
    //         return { countryName: null, capital: null };
    //     }
    // }

    handleClose = () => {
        this.props.onClose();
    };

    handleChange = (event, key) => {
        this.props.changeSelectedValue(key, event.target.value);
        // this.setState({ [key]: event.target.value });
    };

    handleCountry = () => {
        this.props.countryOperation(this.props.action)
    }

    render() {
        const { classes, onClose, permission, selectedCountry, countryOperation, action, ...other } = this.props;
        const sel = this.state;
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <DialogTitle id="simple-dialog-title">Country</DialogTitle>
                <div className={classes.container}>
                    <Grid container spacing={24}>
                        {permission.addCountryOnly &&
                            <Grid item xs={12}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="component-simple">Country Name</InputLabel>
                                    <Input id="component-simple" value={selectedCountry.countryName} onChange={(e) => this.handleChange(e, "countryName")} />
                                </FormControl>
                            </Grid>
                        }
                        {permission.addCapitalOnly &&
                            <Grid item xs={12}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="component-simple">Capital</InputLabel>
                                    <Input id="component-simple" value={selectedCountry.capital} onChange={(e) => this.handleChange(e, "capital")} />
                                </FormControl>
                            </Grid>
                        }
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" className={classes.button} onClick={this.handleCountry}>
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
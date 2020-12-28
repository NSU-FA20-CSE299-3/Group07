import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


class NewOfferForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            schoolMedium: '',
            schoolClass: '',
            description: '',
            location: '',
            salary: 0,
            duration: 0
        }
    }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
    };

    render() {
        return (
            <Grid container >
                <Grid item sm={2} ></Grid>
                <Grid item sm={8} >
                    <Card className="card">
                        <CardContent >
                            <Typography variant="h4">Make a New Offer</Typography>
                            <form >

                                <TextField 
                                    id="schoolMedium" 
                                    label="Medium"
                                    name="schoolMedium" 
                                    value={this.state.schoolMedium}
                                    onChange={this.handleChange}
                                    select
                                    fullWidth>
                                        <MenuItem value="Bangla">Bangla</MenuItem>
                                        <MenuItem value="English Version">English Version</MenuItem>
                                        <MenuItem value="English - Edexcel">English - Edexcel</MenuItem>
                                        <MenuItem value="English - Cambridge">English - Cambridge</MenuItem>
                                </TextField>

                                <TextField 
                                    id="schoolClass" 
                                    label="Class"
                                    name="schoolClass" 
                                    value={this.state.schoolClass}
                                    onChange={this.handleChange}
                                    select
                                    fullWidth>
                                        <MenuItem value="I">I</MenuItem>
                                        <MenuItem value="II">II</MenuItem>
                                        <MenuItem value="III">III</MenuItem>
                                        <MenuItem value="IV">IV</MenuItem>
                                        <MenuItem value="V">V</MenuItem>
                                        <MenuItem value="VI">VI</MenuItem>
                                        <MenuItem value="VII">VII</MenuItem>
                                        <MenuItem value="VIII">VIII</MenuItem>
                                        <MenuItem value="IX">IX</MenuItem>
                                        <MenuItem value="X">X</MenuItem>
                                        <MenuItem value="XI">XI</MenuItem>
                                        <MenuItem value="XII">XII</MenuItem>
                                </TextField>

                                <TextField
                                    id="description"
                                    name="description"
                                    type="text"
                                    label="Description"
                                    variant="outlined"
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                    fullWidth
                                />

                                <TextField
                                    id="location"
                                    name="location"
                                    type="text"
                                    label="Location"
                                    variant="outlined"
                                    value={this.state.location}
                                    onChange={this.handleChange}
                                    fullWidth
                                />

                                <TextField
                                    id="salary"
                                    label="Salary"
                                    name="salary"
                                    type="number"
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={this.state.salary}
                                    onChange={this.handleChange}
                                />

                                <TextField
                                    id="duration"
                                    label="Duration"
                                    name="duration"
                                    type="number"
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={this.state.duration}
                                    onChange={this.handleChange}
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Post
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item sm={2} ></Grid>
            </Grid>
        )
    }
}


export default NewOfferForm

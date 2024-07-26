import React, { Component } from 'react';
import { Button, FormLabel } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { FormControl } from '@mui/material';
import { Link } from 'react-router-dom';
import { Radio } from '@mui/material';
import { RadioGroup } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { withRouter } from './withRouter';
import { Collapse } from "@mui/material";

class CreateRoomPage extends Component {
    static defaultProps = {
        votesToSkip : 2,
        guestCanPause : true,
        update: false,
        roomCode: null,
        updateCallback: () => {}
    }
    constructor(props) {
        super(props);
        this.state = {
            guestCanPause: this.props.guestCanPause,
            votesToSkip: this.props.votesToSkip,
            errorMsg: "",
            successMsg: ""
        };
        this.title = this.props.update ? "Update Room" : "Create a Room";
        this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
        this.handleCanPauseChange = this.handleCanPauseChange.bind(this);
        this.handleVotesChange = this.handleVotesChange.bind(this);
        this.handleUpdateButtonPressed = this.handleUpdateButtonPressed.bind(this);
    }


    handleVotesChange(e) {
        this.setState({
            votesToSkip: e.target.value
        });
    }
    
    handleCanPauseChange(e) {
        this.setState({
            guestCanPause: e.target.value == "true" ? true : false
        });
    }

    handleRoomButtonPressed() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause
            })
        };
        fetch('/api/create-room', requestOptions).then((response) => response.json()).then((data) => this.props.navigate('/room/' + data.code));
    }

    handleUpdateButtonPressed() {
        console.log(this.props.roomCode)
        const requestOptions = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause,
                code: this.props.roomCode
            })
        };
        fetch('/api/update-room', requestOptions).then((response) => {
            console.log(response)
            if (response.ok) {
                console.log("Good")
                this.setState({
                    successMsg : "Room Updated!"
                })
            } else {
                console.log("Bad")
                this.setState({
                    errorMsg: "Error Updating Room"
                })
            }
        });
    }

    renderCreateRoomButtons() {
        return (
            <Grid container spacing={1}>
           <Grid item xs={12} align="center">
                        <Button color="primary" onClick={this.handleRoomButtonPressed} variant="contained">Create a Room</Button>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Button color="secondary" variant="contained" to="/" component={Link}>Back</Button>
                    </Grid>
            </Grid>
        )
    }

    renderUpdateRoomButtons() {
        return (
            <Grid container spacing={1}>
                    <Grid item xs={12} align="center">
                        <Button color="secondary" variant="contained" onClick={this.handleUpdateButtonPressed} component={Button}>Update Room</Button>
                    </Grid>
            </Grid>
        )
    }

    render () {
        return (
            <Grid container spacing="1">
                <Grid item xs={12} align="center">
                    <Collapse in={this.state.errorMsg != "" || this.state.successMsg != ""}>
                        {this.state.successMsg}                    
                    </Collapse>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography component='h4' variant='h4'>
                        {this.title}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <FormHelperText >
                            <div align="center">
                                Guest Control of Playback State
                            </div>
                        </FormHelperText>
                        <RadioGroup row defaultValue="true" onChange={this.handleCanPauseChange}>
                            <FormControlLabel value="true" control={<Radio color="primary" />} label="Play/Pause" labelPlacement="bottom"/>
                            <FormControlLabel value="false" control={<Radio color="secondary" />} label="No Control" labelPlacement="bottom"/>
                        </RadioGroup>
                    </FormControl>
                </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl>
                            <TextField required={true} type="number" onChange={this.handleVotesChange} defaultValue={this.state.votesToSkip} inputProps={{min: 1, style: {textAlign: "center"}}}/>
                            <FormHelperText>
                                <div align="center">
                                    Votes Required to Skip Song
                                </div>
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    {this.props.update ? this.renderUpdateRoomButtons() : this.renderCreateRoomButtons()}
            </Grid>
        );
    }
}

export default withRouter(CreateRoomPage)
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
            votesToSkip: this.props.votesToSkip
        };
        this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
        this.handleCanPauseChange = this.handleCanPauseChange.bind(this);
        this.handleVotesChange = this.handleVotesChange.bind(this);
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

    render () {
        return (
            <Grid container spacing="1">
                <Grid item xs={12} align="center">
                    <Typography component='h4' variant='h4'>
                        Create a Room
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
                    <Grid item xs={12} align="center">
                        <Button color="primary" onClick={this.handleRoomButtonPressed} variant="contained">Create a Room</Button>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Button color="secondary" variant="contained" to="/" component={Link}>Back</Button>
                    </Grid>
            </Grid>
        );
    }
}

export default withRouter(CreateRoomPage)
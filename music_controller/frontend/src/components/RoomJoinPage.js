import React, { Component } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { withRouter } from './withRouter';

class RoomJoinPage extends Component {
    defaultVotes = 2
    constructor(props) {
        super(props);
        this.state = {
            roomCode: "",
            error: ""
        }
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
        this.roomButtonPressed = this.roomButtonPressed.bind(this);
    }

    render () {
        return (
            <Grid container spacing={1} align="center">
                <Grid item xs={12}>
                    <Typography variant="h4" component="h4">
                        Join a Room
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField error={this.state.error != ""} label="Code" placeholder="Enter a Room Code" value={this.state.roomCode} onChange={this.handleTextFieldChange} helperText={this.state.error} variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={this.roomButtonPressed}>Enter Room</Button>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="secondary" to="/" component={Link}>Back</Button>
                </Grid>
            </Grid>
        );
    }

    handleTextFieldChange(e) {
        this.setState({
            roomCode: e.target.value
        })
    }

    roomButtonPressed() {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                code: this.state.roomCode
            })
        };
        fetch('api/join-room', requestOptions).then((response) => {
            if (response.ok) {
                this.props.navigate(`/room/${this.state.roomCode}`)
            } else {
                this.setState({error: "Room not Found"})
            }
        }).catch((error) => console.log(error));
    }
}

export default withRouter(RoomJoinPage)
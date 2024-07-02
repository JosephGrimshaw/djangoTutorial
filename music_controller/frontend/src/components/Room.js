import React, {Component} from 'react';
import { useParams } from 'react-router-dom'
import { Grid, Button, Typography } from '@mui/material';
import { withRouter } from './withRouter';

class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
            settingsDisplayed: false
        };
        this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
        this.updateSettingsDisplayed = this.updateSettingsDisplayed.bind(this);
    }

    getRoomDetails() {
        fetch('/api/get-room' + '?code=' + this.props.roomCode).then((response) => {
            if (!response.ok) {
                this.props.leaveRoomCallback();
                this.props.navigate("/");
            }
            return response.json()})
    .then((data) => {
        this.setState({
            votesToSkip: data.votes_to_skip,
            guestCanPause: data.guest_can_pause,
            isHost: data.is_host
        })
    });
}

    leaveButtonPressed() {
        const requestOptions = {
            method: "POST",
            headers: {'Content-Type': 'application/json'}
        };
        fetch('/api/leave-room', requestOptions).then((_response) => {
            this.props.leaveRoomCallback();
            this.props.navigate('/');
        })
    }

    updateSettingsDisplayed(value) {
        this.setState({
            settingsDisplayed: value
        })
    }

    renderSettings() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    
                </Grid>
            </Grid>
        )
    }

    renderSettingsButton() {
        return (
            <Grid item xs={12} align="center">
                <Button variant="contained" color="primary" onClick={this.updateSettingsDisplayed(true)}>
                    Settings
                </Button>
            </Grid>
        )
    }

    render() {
        const roomCode = this.props.roomCode;
        this.getRoomDetails()
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography variant="h4" component="h4">
                        Code: {roomCode}
                    </Typography>
                    {this.state.isHost ? this.renderSettingsButton() : null}
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant="h6" component="h6">
                        Votes Required to Skip: {this.state.votesToSkip}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant="h6" component="h6">
                        Guests can Pause: {this.state.guestCanPause.toString()}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant="h6" component="h6">
                        Are you Host: {this.state.isHost.toString()}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="secondary" variant="contained" onClick={this.leaveButtonPressed}>Leave Room</Button>
                </Grid>
            </Grid>

/*
            <div>
                <h3>{roomCode}</h3>
            <p>Votes: {this.state.votesToSkip}</p>
            <p>Can Pause: {this.state.guestCanPause.toString()}</p>
            <p>Are you host: {this.state.isHost.toString()}</p>
            </div>
*/
        );
    }
}

function RoomWrapper({ navigate, leaveRoomCallback }) {
    const {roomCode} = useParams();
    console.log(roomCode + "RoomCode")
    console.log(leaveRoomCallback + "leaveRoomCallback")

    return <Room roomCode={roomCode}  navigate={navigate} leaveRoomCallback={leaveRoomCallback} />
}

export default withRouter(RoomWrapper)
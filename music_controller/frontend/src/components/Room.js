import React, {Component} from 'react';
import { useParams } from 'react-router-dom'
import { Grid, Button, Typography, IconButton } from '@mui/material';
import { withRouter } from './withRouter';
import CreateRoomPage from './CreateRoomPage';
//import { Setting } from '../../static/images/convert'; 
import Setting from '@mui/icons-material/Settings.js'
import Check from '@mui/icons-material/Check';
import Exit from '@mui/icons-material/ExitToApp.js';
import { redirect } from 'react-router-dom';
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
        this.renderSettings = this.renderSettings.bind(this);
        this.renderSettingsButton = this.renderSettingsButton.bind(this);
    }

   // componentDidUpdate() {
     //   this.getRoomDetails()
   // }

    componentDidMount() {
        this.getRoomDetails()
    }

    getRoomDetails() {
        fetch('/api/get-room' + '?code=' + this.props.roomCode).then((response) => {
            if (!response.ok) {
                this.props.leaveRoomCallback();
                redirect();
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

    updateSettingsDisplayed() {
        this.setState({
            settingsDisplayed: !this.state.settingsDisplayed
        })
    }

    renderSettings() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <CreateRoomPage update={true} votesToSkip={this.state.votesToSkip} guestCanPause={this.state.guestCanPause} roomCode={this.props.roomCode} updateCallback={null} />
                </Grid>
                <Grid item xs={12} align="center">
                    <Button endIcon={<Check />} onClick={() => {
                        this.updateSettingsDisplayed()
                        }} >Update</Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button endIcon={<Exit />} onClick={() => {console.log("HI")
                        this.updateSettingsDisplayed()
                        }}>Back</Button>
                </Grid>
            </Grid>
        )
    }


    renderSettingsButton() {
        return (
                <Button endIcon={<Setting />} color="info" variant="contained" size="medium" onClick={this.updateSettingsDisplayed} >Room Settings</Button>
        )
    }

    render() {
        if (this.state.settingsDisplayed) {
            return this.renderSettings()
        }
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography variant="h4" component="h4">
                        Code: {this.props.roomCode}
                    </Typography>
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
                    {this.state.isHost ? this.renderSettingsButton() : null}
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
    return <Room roomCode={roomCode}  navigate={navigate} leaveRoomCallback={leaveRoomCallback} />
}

export default withRouter(RoomWrapper)
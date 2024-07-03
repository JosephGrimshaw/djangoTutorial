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
        this.settingsDisplayedChanged = false;
        this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
        this.updateSettingsDisplayed = this.updateSettingsDisplayed.bind(this);
        this.renderSettings = this.renderSettings.bind(this);
        this.renderSettingsButton = this.renderSettingsButton.bind(this);
    }

   // componentDidUpdate() {
     //   this.getRoomDetails()
   // }

    componentDidMount() {
        this.setState({
            settingsDisplayed: false
        })
        this.getRoomDetails()
    }

    componentDidUpdate() {
        console.log("HIIIII")
        if (this.settingsDisplayedChanged) {
            console.log(this.state.settingsDisplayed)
            this.setState({
                settingsDisplayed: !this.state.settingsDisplayed
            })
            console.log(this.state.settingsDisplayed)

        }
    }

    component
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

    updateSettingsDisplayed(value) {
        console.log("settingsDisplayed Updated")
        console.log(this.state.settingsDisplayed)
        this.setState({
            settingsDisplayed: value
        })
        console.log(this.state.settingsDisplayed)
    }

    renderSettings() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <CreateRoomPage update={true} votesToSkip={this.state.votesToSkip} guestCanPause={this.state.guestCanPause} roomCode={this.roomCode} updateCallback={null} />
                </Grid>
                <Grid item xs={12} align="center">
                    <Button endIcon={<Check />} onClick={() => {
                        //this.updateSettingsDisplayed(false)
                        this.settingsDisplayedChanged = true
                        }} >Update</Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button endIcon={<Exit />} onClick={() => {console.log("HI")
                        //</Grid>this.updateSettingsDisplayed(false)
                        this.settingsDisplayedChanged = true
                        }}>Back</Button>
                </Grid>
            </Grid>
        )
    }

    //shouldComponentUpdate(nextProps, nextState) {
    //    if (this.state === nextState) {
   //         return false;
   //     }
    //    return true;
   // }

    renderSettingsButton() {
        return (
                <Button endIcon={<Setting />} color="info" variant="contained" size="medium" onClick={this.updateSettingsDisplayed(true)} >Room Settings</Button>
        )
    }

    render() {
        const roomCode = this.props.roomCode;
        //this.getRoomDetails()
        if (this.state.settingsDisplayed) {
            return this.renderSettings()
        }
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography variant="h4" component="h4">
                        Code: {roomCode}
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
    console.log(roomCode + "RoomCode")
    console.log(leaveRoomCallback + "leaveRoomCallback")

    return <Room roomCode={roomCode}  navigate={navigate} leaveRoomCallback={leaveRoomCallback} />
}

export default withRouter(RoomWrapper)
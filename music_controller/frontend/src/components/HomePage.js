import React, { Component } from 'react';
import RoomWrapper from './Room';
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
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

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Router>
                <Routes>
                    <Route path='/' element={
                        <Grid container spacing="1">
                            <Grid item xs={12} align="center">
                                <Typography>Welcome!</Typography>
                            </Grid>
                            <Grid item xs={12} align="center">
                                <FormControl component="fieldset">
                                    <FormHelperText>
                                        <div align="center">
                                        Get started by creating or joining a room!
                                        </div>
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                                <Grid item xs={12} align="center">
                                    <Button color="primary" variant="contained" to="/create" component={Link}>Create a Room</Button>
                                </Grid>
                                <Grid item xs={12} align="center">
                                    <Button color="primary" variant="contained" to="/join" component={Link}>Join a Room</Button>
                            </Grid>
                        </Grid>
                    } />
                    <Route path='/join' element={<RoomJoinPage />} />
                    <Route path='/create' element={<CreateRoomPage />} />
                    <Route path='/room/:roomCode' element={<RoomWrapper />} />
                </Routes>
            </Router>
        )
    }
}
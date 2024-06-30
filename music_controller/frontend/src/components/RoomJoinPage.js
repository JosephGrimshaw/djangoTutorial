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

export default class RoomJoinPage extends Component {
    defaultVotes = 2
    constructor(props) {
        super(props);
    }

    render () {
        return (
        /*<Grid container spacing="1">
            <Grid item xs={12} align="center">
                <Typography component='h4' variant='h4'>
                    Create A Room
                </Typography>
            </Grid>
        </Grid>*/
        <p>Hi</p>
        );
    }
}
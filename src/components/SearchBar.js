import React, { useState } from 'react';
import { TextField, Button, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    paper: {
        padding: '20px',
        margin: '20px 0',
    },
    searchField: {
        marginRight: '10px',
        width: '500px',
    }
});

const SearchBar = ({ onSearch }) => {
    const [city, setCity] = useState('');
    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city) {
            onSearch(city);
            setCity('');
        }
    };

    return (
        <Paper elevation={3} className={classes.paper}>
            <form onSubmit={handleSubmit}>
                <Grid container alignItems="center" justify="center">
                    <Grid item>
                        <TextField
                            className={classes.searchField}
                            variant="outlined"
                            label="Search the current weather of a city"
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" type="submit">
                            Search
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default SearchBar;
import React, { useState } from 'react';
import { TextField, Button, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)({
  padding: '20px',
  margin: '20px 0',
});

const StyledTextField = styled(TextField)({
  marginRight: '10px',
  width: '500px',
});

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      onSearch(city);
      setCity('');
    }
  };

  return (
    <StyledPaper elevation={3}>
      <form onSubmit={handleSubmit}>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item>
            <StyledTextField
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
    </StyledPaper>
  );
};

export default SearchBar;

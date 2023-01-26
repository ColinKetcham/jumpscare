import React, { useState } from 'react';
import {
  Button,
  Paper,
  TextField,
  Box,
  FormControlLabel,
  Grid,
  Link,
  Checkbox,
} from '@mui/material/';

import { searchTMDB } from '../async/search';

import SearchItem from './SearchItem';

export const AddMedia = () => {
  // const handleSubmit = () => console.log(nameValue);
  const [results, setResults] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const returnVal = await searchTMDB(data.get('name'));
    setResults(returnVal.results);
    console.log(returnVal);
  };

  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column', padding: '3rem' }}>
      <h2>Add media to database</h2>

      <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin='normal'
          required
          fullWidth
          id='name'
          label='Media Name'
          name='name'
          autoComplete='media name'
          autoFocus
        />
        {/* <TextField
          margin='normal'
          required
          fullWidth
          name='password'
          label='Password'
          type='password'
          id='password'
          autoComplete='current-password'
        /> */}
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Search
        </Button>
      </Box>
      <div
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {results.map((item) => {
          return (
            <SearchItem item={item} key={item.id} style={{ padding: '2rem' }} />
          );
        })}
      </div>
    </Paper>
  );
};

import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
import useStyles from './styles';

const List = ({ places, type, setType, rating, setRating, childClicked, isLoading }) => {
    const [elRefs, setElRefs] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        if (places && Array.isArray(places)) {
            setElRefs((refs) => places.map((_, i) => refs[i] || createRef()));
        } else {
            setElRefs([]);
        }
    }, [places]);

    return (
        <div className={classes.container}>
            <Typography variant="h4">Food & Dining around you</Typography>
            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem" />
                </div>
            ) : (
                <>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="type-label">Type</InputLabel>
                        <Select
                            id="type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}  // Correctly use setType here
                            labelId="type-label"
                        >
                            <MenuItem value="restaurants">Restaurants</MenuItem>
                            <MenuItem value="hotels">Hotels</MenuItem>
                            <MenuItem value="attractions">Attractions</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="rating-label">Rating</InputLabel>
                        <Select
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)} // Correctly use setRating here
                            labelId="rating-label"
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="3">Above 3.0</MenuItem>
                            <MenuItem value="4">Above 4.0</MenuItem>
                            <MenuItem value="4.5">Above 4.5</MenuItem>
                        </Select>
                    </FormControl>
                    <Grid container spacing={3} className={classes.list}>
                        {places && places.map((place, i) => (
                            <Grid ref={elRefs[i]} key={i} item xs={12}>
                                <PlaceDetails selected={Number(childClicked) === i} refProp={elRefs[i]} place={place} />
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </div>
    );
};

export default List;

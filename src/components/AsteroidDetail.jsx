import React from 'react';
import { Box } from '@material-ui/core';

const AsteroidDetail = (props) => {
    const { asteroid } = props;

    return (
        <Box border={1} m={1} p={3}>
            <Box mb={2}>
                <strong>Asteroid Name: </strong> {asteroid.name}
            </Box>
            <Box mb={2}>
                <strong>Nasa JPL URL: </strong> {asteroid.nasa_jpl_url}
            </Box>
            <Box mb={2}>
                <strong>Is Potentially Hazardous Asteroid: </strong> {asteroid.is_potentially_hazardous_asteroid.toString()}
            </Box>
        </Box>
    )
}

export default AsteroidDetail;

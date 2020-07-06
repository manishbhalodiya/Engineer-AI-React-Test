import http from './httpService';

export const getAsterodbyId = (id) => {
    return http.get(`https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=OM4on4se7WjA7nPr2AgMO6Od6F4Ew7w5Cct3ZSjJ`);
}

export const getAllAsteroid = () => {
    return http.get(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=OM4on4se7WjA7nPr2AgMO6Od6F4Ew7w5Cct3ZSjJ`)
}
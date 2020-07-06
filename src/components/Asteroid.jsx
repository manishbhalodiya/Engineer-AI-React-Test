import React, { useState, useCallback } from 'react';
import { makeStyles, TextField, Grid, Box, Button, CircularProgress, Paper } from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getAsterodbyId, getAllAsteroid } from '../services/AsteroidService';
import AsteroidDetail from './AsteroidDetail';
import ErrorText from './common/ErrorText';

const useStyles = makeStyles((theme) => ({
    divMargin: {
        margin: 2
    },
    formWidth: {
        width: '100%'
    },
    floatRigth: {
        float: 'right'
    },
    progress: {
        marginLeft: '50%'
    }
}));

const Asteroid = () => {
    const classes = useStyles();
    const [showAsteroidDetail, setShowAsteroidDetail] = useState(false);
    const [progress, setProgress] = useState(false);
    const [asteroid, setAsteroid] = useState({});

    const initialValues = {
        asteroidId: ''
    };

    const validationSchema = Yup.object().shape({
        asteroidId: Yup.string().trim().required('Asteroid Id is required')
    });

    const asterodById = (id) => {
        getAsterodbyId(id)
            .then(res => {
                if (res.status === 200) {
                    setAsteroid(res.data);
                    setShowAsteroidDetail(true);
                } else {
                    console.log(res);
                }
            })
            .catch(error => console.log(error));
    };

    const handleSubmit = useCallback((values) => {
        setProgress(true);
        getAsterodbyId(values.asteroidId)
            .then(res => {
                if (res.status === 200) {
                    setAsteroid(res.data);
                    setShowAsteroidDetail(true);
                    setProgress(false);
                } else {
                    setProgress(false);
                }
            })
            .catch(error => {
                console.log(error); 
                setProgress(false);
            });
    }, []);

    const handleRandomClick = useCallback(() => {
        setProgress(true);
        getAllAsteroid()
            .then(res => {
                if (res.status === 200) {
                    const id = res.data.near_earth_objects[Math.floor(Math.random() * res.data.near_earth_objects.length)].id;
                    asterodById(id);
                    setProgress(false);
                } else {
                    setProgress(false);
                }
            })
            .catch(error => {
                console.log(error); 
                setProgress(false);
            });
    }, []);

    return (
        <div className={classes.divMargin}>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    handleSubmit(values);
                }}
                validateOnMount
            >
                {
                    ({ values, isSubmitting, isValidating, isValid }) => (
                        <Form className={classes.root}>
                            <Grid container>
                                <Box className={classes.formWidth} mb={2}>
                                    <Field
                                        name="asteroidId"
                                        placeholder="Enter Asteroid ID"
                                        as={TextField}
                                        type="text"
                                        value={values.asteroidId}
                                        className={classes.formWidth}
                                        autoFocus
                                    />
                                    <ErrorMessage name="asteroidId" component={ErrorText} />
                                </Box>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Box mb={2}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                disabled={ !isValid }
                                            >
                                                Submit
                                            </Button>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box mb={2} className={classes.floatRigth}>
                                            <Button 
                                                type="button"
                                                variant="contained"
                                                color="secondary"
                                                onClick={handleRandomClick}
                                            >
                                                Random
                                        </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Form>
                    )
                }
            </Formik>
            {
                false &&
                (
                    <Box border={1} m={1} p={3}>
                        <CircularProgress color="secondary" className={classes.progress} />
                    </Box>
                )
            }
            {
                !progress && showAsteroidDetail &&
                (
                    <AsteroidDetail asteroid={asteroid} />
                )
            }
        </div>
    )
}

export default Asteroid;
import axios from 'axios';
import {ADD_USER, DELETE_USER, GET_USERS} from './types';
import { createMessage, returnErrors } from './messages_actions';
import { tokenConfig } from './auth_actions';

// GET USERS
export const getUsers = () => (dispatch, getState) => {
    axios
        .get('/api/user/', tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_USERS,
                payload: res.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// DELETE USER
export const deleteUser = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/user/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_USER,
                payload: id,
            });
        })
        .catch((err) => console.log(err));
};

// ADD USER
export const addUser = (user) => (dispatch, getState) => {
    axios
        .post('/api/user/', user, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: ADD_USER,
                payload: res.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};
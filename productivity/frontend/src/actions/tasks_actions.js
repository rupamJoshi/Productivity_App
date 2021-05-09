import axios from 'axios';

import { GET_TASKS,GET_TASK, DELETE_TASK, ADD_TASK, EDIT_TASK, GET_ERRORS } from './types';
import {returnErrors} from "./messages_actions";
import { tokenConfig } from './auth_actions';

// GET TASK
export const getTasks = () => (dispatch, getState) => {
    axios
        .get(`/api/tasks/`,tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_TASKS,
                payload: res.data,
            });
        })
        .catch((err) => dispatch(console.log(err.response.data, err.response.status)));
};

// GET TASK
export const getTask = (id) => (dispatch, getState) => {
    axios
        .get(`/api/tasks/${id}`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_TASKS,
                payload: res.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// DELETE TASK
export const deleteTask = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/tasks/${id}/`,tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_TASK,
                payload: id,
            });
        })
        .catch((err) => console.log(err));
};

// ADD TASK
export const addTask = (task) => (dispatch, getState) => {
    axios
        .post('/api/tasks/', task, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: ADD_TASK,
                payload: res,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};
// ADD TASK
export const editTask = (task) => (dispatch, getState) => {
    axios
        .put(`/api/tasks/${task.id}/`, task, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: EDIT_TASK,
                payload: res,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};
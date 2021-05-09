import { GET_TASKS,GET_TASK, DELETE_TASK, ADD_TASK, EDIT_TASK } from '../actions/types.js';

const initialState = {
    tasks: [],
    task: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TASKS:
            console.log('task', action.payload)
            return {
                ...state,
                tasks: action.payload,
            };
        case GET_TASK:
            return {
                ...state,
                task: action.payload,
            };
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.payload),
            };
        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
            };
        case EDIT_TASK:
            const index = state.tasks.findIndex(tasks => tasks.id !==action.payload);
            const newArray = [...state.tasks];
            newArray[index]=action.payload;
            return {
                ...state,
                tasks: newArray,
            };
        default:
            return state;
    }
}
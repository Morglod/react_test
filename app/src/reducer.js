import { combineReducers } from "redux";

import actionTypes from './actionTypes';

const DefaultProfilesState = {
    profiles: [],
    fetching: false,
    fetched: false,
    saving: false,
    saved: false,
    fetchError: null,
    saveError: null
};

function profilesReducer(state = DefaultProfilesState, action) {
    switch(action.type) {
        case actionTypes.ADD_PROFILE: {
            const newState = {...state};
            newState.profiles.push({
                ...(action.payload),
                id: Date.now()
            })

            return newState;
        }
        case actionTypes.UPDATE_PROFILE: {
            const {id} = action.payload;
            const newState = {...state};
            const indexToUpdate = newState.profiles.findIndex((profile) => {
                return profile.id == id
            });
            if(indexToUpdate == -1) {
                console.log("UPDATE_FAILED");
            }
            else newState.profiles[indexToUpdate] = action.payload;

            return newState;
        }
        case actionTypes.DELETE_PROFILE: {
            return state.profiles.filter(profile => profile.id !== action.payload);
        }
        case actionTypes.FETCH_DATA_OK: {
            return {
                ...state,
                profiles: action.payload,
                fetching: false,
                fetched: true,
                fetchError: null
            };
        }
        case actionTypes.FETCH_DATA_BEGIN: {
            return {
                ...state,
                profiles: null,
                fetching: true,
                fetched: false,
                fetchError: null
            };
        }
        case actionTypes.FETCH_DATA_ERROR: {
            return {
                ...state,
                profiles: null,
                fetching: false,
                fetched: false,
                fetchError: action.payload
            };
        }
        case actionTypes.SAVE_DATA_BEGIN: {
            return {
                ...state,
                saving: true,
                saved: false,
                saveError: null
            };
        }
        case actionTypes.SAVE_DATA_ERROR: {
            return {
                ...state,
                saving: false,
                saved: false,
                saveError: action.payload
            };
        }
        case actionTypes.SAVE_DATA_OK: {
            return {
                ...state,
                saving: false,
                saved: true,
                saveError: null
            }
        }
    }
    return state;
}

export default combineReducers({
    profiles: profilesReducer
});

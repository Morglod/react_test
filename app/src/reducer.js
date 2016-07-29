import { combineReducers } from "redux";

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
        case "ADD_PROFILE": {
            const newState = {...state};
            newState.profiles.push({
                ...(action.payload),
                id: Date.now()
            })

            return newState;
        }
        case "UPDATE_PROFILE": {
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
        case "DELETE_PROFILE": {
            return state.profiles.filter(profile => profile.id !== action.payload);
        }
        case "FETCH_DATA_OK": {
            return {
                ...state,
                profiles: action.payload,
                fetching: false,
                fetched: true,
                fetchError: null
            };
        }
        case "FETCH_DATA_BEGIN": {
            return {
                ...state,
                profiles: null,
                fetching: true,
                fetched: false,
                fetchError: null
            };
        }
        case "FETCH_DATA_ERROR": {
            return {
                ...state,
                profiles: null,
                fetching: false,
                fetched: false,
                fetchError: action.payload
            };
        }
        case "SAVE_DATA_BEGIN": {
            return {
                ...state,
                saving: true,
                saved: false,
                saveError: null
            };
        }
        case "SAVE_DATA_ERROR": {
            return {
                ...state,
                saving: false,
                saved: false,
                saveError: action.payload
            };
        }
        case "SAVE_DATA_OK": {
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

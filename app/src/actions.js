export function addProfile({name, surname, job, about}) {
    return {
        type: "ADD_PROFILE",
        payload: {
            name,
            surname,
            job,
            about
        }
    };
}

export function updateProfile({id, name, surname, job, about}) {
    return {
        type: "UPDATE_PROFILE",
        payload: {
            id,
            name,
            surname,
            job,
            about
        }
    };
}

export function deleteProfile(id) {
    return {
        type: "DELETE_PROFILE",
        payload: id
    };
}

export function fetchDataBegin() {
    return {
        type: "FETCH_DATA_BEGIN"
    };
}

export function fetchDataOk(data) {
    return {
        type: "FETCH_DATA_OK",
        payload: data
    };
}

export function fetachDataError(error) {
    return {
        type: "FETCH_DATA_ERROR",
        payload: error
    };
}

export function fetchData() {
    return function(dispatch) {
        dispatch(fetchDataBegin());

        setTimeout(() => {
            let data = window.localStorage.getItem('react-test-data');
            if(data === null || data === undefined) data = '[]';
            data = JSON.parse(data);

            dispatch(fetchDataOk(data));
        }, 100);
    };
}

export function saveDataBegin() {
    return {
        type: "SAVE_DATA_BEGIN"
    };
}

export function saveDataError(error) {
    return {
        type: "SAVE_DATA_ERROR",
        payload: error
    };
}

export function saveDataOk() {
    return {
        type: "SAVE_DATA_OK"
    };
}

export function saveData(data) {
    return function(dispatch) {
        dispatch(saveDataBegin());

        setTimeout(() => {
            const json_data = JSON.stringify(data);
            window.localStorage.setItem('react-test-data', json_data);

            dispatch(saveDataOk());
        }, 100);
    };
}

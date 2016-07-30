import React from 'react';

import TableView from './TableView';
import * as actions from '../actions';
import EditorForm from './EditorForm';

export default class ViewMainLayout extends React.Component {
    constructor() {
        super()

        this.state = {
            fetching: false,
            fetched: false,
            saving: false,
            saved: false,
            fetchError: "Нажмите 'обновить'",
            saveError: null,
            profiles: [],
            _unsubscribe: null,
            _editMode: false
        };
    }

    storeListener() {
        this.setState({
            ...(this.props.store.getState().profiles)
        });
    }

    componentDidMount() {
        this.setState({
            _unsubscribe: this.props.store.subscribe(this.storeListener.bind(this))
        });
        this.tryFetchData();
    }

    componentWillUnmount() {
        if(this.state._unsubscribe) {
            this.state._unsubscribe();
        }
    }

    tryFetchData() {
        this.props.store.dispatch(actions.fetchData());
    }

    beginAddProfile() {
        this.setState({
            _editMode: true
        });
    }

    cancelAddProfile() {
        this.setState({
            _editMode: false
        });
    }

    finishAddProfile(profile) {
        this.setState({
            _editMode: false
        });

        this.props.store.dispatch(actions.addProfile(profile));
        this.props.store.dispatch(actions.saveData(this.props.store.getState().profiles.profiles));
    }

    render() {
        if(this.state.fetchError) {
            return (
                <div>
                    <p>Ошибка получения данных</p>
                    <p>{this.state.fetchError}</p>
                    <a onClick={this.tryFetchData.bind(this)}>Обновить</a>
                </div>
            );
        } else if(this.state.fetching) {
            return (
                <div>
                    <center><i className="fa fa-spinner fa-spin fa-3x fa-fw" style={{color: 'gray'}}></i></center>
                    <a onClick={this.tryFetchData.bind(this)}>Обновить</a>
                </div>
            );
        } else if(this.state.fetched) {
            let editor = null;
            if(this.state._editMode) {
                editor = (
                    <EditorForm
                        profile={{}}
                        headerText={'Добавление профиля'}
                        finishText={'Добавить'}
                        cancel={this.cancelAddProfile.bind(this)}
                        finish={this.finishAddProfile.bind(this)}
                    />
                );
            }

            return (
                <div>
                    {editor}
                    <center style={{'margin-bottom': '10px'}}>
                        <a onClick={this.beginAddProfile.bind(this)}>Добавить</a>
                    </center>
                    <TableView profiles={this.state.profiles} />
                </div>
            );
        }
    }
}

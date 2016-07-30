import React from 'react';
import {Link} from 'react-router';

import * as actions from '../actions';
import EditorForm from './EditorForm';

export default class ViewEntryLayout extends React.Component {
    constructor() {
        super();

        this.state = {
            profiles: [],
            profileId: null,
            profile: null,
            _unsubscribe: null,
            _editMode: false
        };
    }

    componentDidMount() {
        const id = this.props.params.entryId;

        this.setState({
            profileId: id,
            _unsubscribe: this.props.store.subscribe(this.storeListener.bind(this))
        });

        this.refresh();
    }

    componentWillUnmount() {
        if(this.state._unsubscribe) this.state._unsubscribe();
    }

    storeListener() {
        this.selectProfile();
    }

    selectProfile() {
        const profiles = this.props.store.getState().profiles.profiles;
        const id = this.props.params.entryId;

        // Data not yet updated or error
        if(profiles === null) return;

        let profile = profiles.find(entry => {
            return (entry.id == id);
        });

        this.setState({
            profiles,
            profile,
            _name: profile.name,
            _surname: profile.surname,
            _job: profile.job,
            _about: profile.about
        });
    }

    refresh() {
        this.props.store.dispatch(actions.fetchData());
    }

    beginEdit() {
        this.setState({
            _editMode: true
        });
    }

    saveEdit(profile) {
        profile.id = this.state.profileId;

        this.setState({
            _editMode: false,
            profile
        });
        this.props.store.dispatch(actions.updateProfile(profile));
        this.props.store.dispatch(actions.saveData(this.props.store.getState().profiles.profiles));
    }

    cancelEdit() {
        this.setState({
            _editMode: false
        });
    }

    render() {
        if(this.state.profileId === null || this.state.profile === null) {
            return (
                <div>
                    <center><i className="fa fa-spinner fa-spin fa-3x fa-fw" style={{color: 'gray'}}></i></center>
                    <a onClick={this.refresh.bind(this)}>Обновить</a> <Link to='/'>Назад</Link>
                </div>
            );
        } else {
            const profile = this.state.profile;

            let editor = null;
            if(this.state._editMode) {
                editor = (
                    <EditorForm
                        profile={profile}
                        headerText={'Редактирование профиля'}
                        finishText={'Сохранить'}
                        cancel={this.cancelEdit.bind(this)}
                        finish={this.saveEdit.bind(this)}
                    />
                );
            }


            return (
                <div>
                    {editor}
                    <p>ФИО: {profile.name + ' ' + profile.surname}</p>
                    <p>Должность: {profile.job}</p>
                    <p>Подробнее: {profile.about}</p>
                    <div style={{'height': '23px'}}>
                        <span style={{'float': 'right'}}>
                            <a onClick={this.beginEdit.bind(this)}>Редактировать</a>  <Link to='/'>Назад</Link>
                        </span>
                    </div>
                </div>
            );
        }
    }
}

import React from 'react';
import {Link} from 'react-router';

import * as actions from '../actions';
import LinkedState from '../linkedState';

export default class ViewEntryLayout extends React.Component {
    constructor() {
        super();

        this.state = {
            profiles: [],
            profileId: null,
            profile: null,
            _unsubscribe: null,
            _editMode: false,
            _name: '',
            _surname: '',
            _job: '',
            _about: ''
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

    saveEdit() {
        const profile = {
            id: this.state.profileId,
            name: this.state._name,
            surname: this.state._surname,
            job: this.state._job,
            about: this.state._about
        };

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
                    <p>Данные не загружены</p>
                    <a onClick={this.refresh.bind(this)}>Обновить</a>
                    <Link to='/'>Назад</Link>
                </div>
            );
        } else {
            let editor = null;
            if(this.state._editMode) {
                editor = (
                    <div className="hide-overlay">
                        <div className='tbl app' style={{'z-index': 1, width: '400px'}}>
                            <h1 style={{'text-align': 'center'}} className='tbl-row'>Редактирование профиля</h1>
                            <p className='tbl-row'>
                                <span className='tbl-cell'>Имя</span>
                                <input className='tbl-cell' valueLink={LinkedState(this, '_name')} />
                            </p>
                            <p className='tbl-row'>
                                <span className='tbl-cell'>Фамилия</span>
                                <input className='tbl-cell' valueLink={LinkedState(this, '_surname')} />
                            </p>
                            <p className='tbl-row'>
                                <span className='tbl-cell'>Должность</span>
                                <input className='tbl-cell' valueLink={LinkedState(this, '_job')} />
                            </p>
                            <p className='tbl-row'>
                                <span className='tbl-cell'>Подробнее</span>
                                <textarea className='tbl-cell' valueLink={LinkedState(this, '_about')} />
                            </p>
                            <p className='tbl-row'>
                                <a onClick={this.cancelEdit.bind(this)} className='tbl-cell'>Отмена</a>
                                <a onClick={this.saveEdit.bind(this)} className='tbl-cell'>Сохранить</a>
                            </p>
                        </div>
                    </div>
                );
            }

            const profile = this.state.profile;

            return (
                <div>
                    {editor}
                    <p>ФИО: {profile.name + ' ' + profile.surname}</p>
                    <p>Должность: {profile.job}</p>
                    <p>Подробнее: {profile.about}</p>
                    <a onClick={this.beginEdit.bind(this)}>Редактировать</a>  <Link to='/'>Назад</Link>
                </div>
            );
        }
    }
}

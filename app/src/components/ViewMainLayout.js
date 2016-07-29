import React from 'react';

import TableView from './TableView';
import * as actions from '../actions';
import LinkedState from '../linkedState';

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
            _editMode: false,
            _name: '',
            _surname: '',
            _job: '',
            _about: ''
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

    finishAddProfile() {
        this.setState({
            _editMode: false
        });

        this.props.store.dispatch(actions.addProfile({
            name: this.state._name,
            surname: this.state._surname,
            job: this.state._job,
            about: this.state._about
        }));
        
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
                    <p>Загрузка...</p>
                    <a onClick={this.tryFetchData.bind(this)}>Обновить</a>
                </div>
            );
        } else if(this.state.fetched) {
            let editor = null;
            if(this.state._editMode) {
                editor = (
                    <div className="hide-overlay">
                        <div className='tbl app' style={{'z-index': 1, width: '400px'}}>
                            <h1 style={{'text-align': 'center'}} className='tbl-row'>Добавление профиля</h1>
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
                                <a onClick={this.cancelAddProfile.bind(this)} className='tbl-cell'>Отмена</a>
                                <a onClick={this.finishAddProfile.bind(this)} className='tbl-cell'>Добавить</a>
                            </p>
                        </div>
                    </div>
                );
            }

            return (
                <div>
                    {editor}
                    <center>
                        <a onClick={this.beginAddProfile.bind(this)}>Добавить</a>
                    </center>
                    <TableView profiles={this.state.profiles} />
                </div>
            );
        }
    }
}

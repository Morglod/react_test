import React from 'react';

import LinkedState from '../linkedState';

export default class EditorForm extends React.Component {
    constructor() {
        super();
        this.state = {
            id: null,
            name: '',
            surname: '',
            job: '',
            about: '',

            headerText: 'Редактирование профиля',
            finishText: 'Сохранить',

            cancel: null,
            finish: null
        };
    }

    componentDidMount() {
        this.setState({
            ...(this.props.profile),

            headerText: this.props.headerText,
            finishText: this.props.finishText,

            cancel: this.props.cancel,
            finish: this.props.finish
        });
    }

    cancel() {
        if(this.state.cancel) this.state.cancel();
    }

    finish() {
        if(this.state.finish) {
            const {id, name, surname, job, about} = this.state;

            this.state.finish({
                id, name, surname, job, about
            });
        }
    }

    render() {
        return (
            <div className="hide-overlay">
                <div className='app' style={{'z-index': 1, width: '350px'}}>
                    <h3 style={{'text-align': 'center', 'margin-bottom': '10px', 'padding-top': '10px'}}>{this.state.headerText}</h3>
                    <center>
                        <p>
                            <input placeholder="Имя" valueLink={LinkedState(this, 'name')} />
                        </p>
                        <p>
                            <input placeholder="Фамилия" valueLink={LinkedState(this, 'surname')} />
                        </p>
                        <p>
                            <input placeholder="Должность" valueLink={LinkedState(this, 'job')} />
                        </p>
                        <p>
                            <textarea placeholder="Подробнее" style={{'resize': 'vertical'}} valueLink={LinkedState(this, 'about')} />
                        </p>
                    </center>
                    <div style={{'height': '23px'}}>
                        <span style={{'float': 'right'}}>
                        <a onClick={this.finish.bind(this)} style={{'margin-right': '10px'}}>{this.state.finishText}</a>
                            <a onClick={this.cancel.bind(this)}>Отмена</a>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

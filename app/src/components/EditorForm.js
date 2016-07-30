import React, {PropTypes} from 'react';

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
            finish: null,

            errorText: ''
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

            if( name.length === 0 ||
                surname.length === 0 ||
                job.length === 0) {
                    this.setState({
                        errorText: 'Заполните обязательные поля'
                    });
                    return;
                }

            this.state.finish({
                id, name, surname, job, about
            });
        }
    }

    render() {
        return (
            <div className="hide-overlay">
                <div className='app' style={{zIndex: 1, width: '350px'}}>
                    <h3 style={{textAlign: 'center', marginBottom: '10px', paddingTop: '10px'}}>{this.state.headerText}</h3>
                    <p className='error-text'>{this.state.errorText}</p>
                    <center>
                        <p>
                            <input placeholder="Имя" valueLink={LinkedState(this, 'name')} required />
                        </p>
                        <p>
                            <input placeholder="Фамилия" valueLink={LinkedState(this, 'surname')} required />
                        </p>
                        <p>
                            <input placeholder="Должность" valueLink={LinkedState(this, 'job')} required />
                        </p>
                        <p>
                            <textarea placeholder="Подробнее" style={{'resize': 'vertical'}} valueLink={LinkedState(this, 'about')} />
                        </p>
                    </center>
                    <div style={{height: '23px'}}>
                        <span style={{float: 'right'}}>
                        <a onClick={this.finish.bind(this)} style={{marginRight: '10px'}}>{this.state.finishText}</a>
                            <a onClick={this.cancel.bind(this)}>Отмена</a>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

EditorForm.propTypes = {
    profile: PropTypes.shape({
        id: PropTypes.any,
        name: PropTypes.string,
        surname: PropTypes.string,
        job: PropTypes.string,
        about: PropTypes.string
    }).isRequired,
    headerText: PropTypes.string,
    finishText: PropTypes.string,
    cancel: PropTypes.func.isRequired,
    finish: PropTypes.func.isRequired
};

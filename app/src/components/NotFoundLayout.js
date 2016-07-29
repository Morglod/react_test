import React from 'react';
import {Link} from 'react-router';

export default class NotFoundLayout extends React.Component {
    render() {
        return (
            <div>
                <p>Страница не найдена</p>
                <p>
                    <Link to='/'>Вернуться на главную</Link>
                </p>
            </div>
        );
    }
}

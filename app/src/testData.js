
export default function populateTestData() {
    if(window.localStorage.getItem('react-test-data') !== null) return;
    const data = JSON.stringify([{
            id: 1,
            name: 'Петр',
            surname: 'Петров',
            job: 'Программист',
            about: 'Программирует'
        },{
            id: 2,
            name: 'Иван',
            surname: 'Иванович',
            job: 'Фронтенд',
            about: 'Фронтендит'
        },{
            id: 3,
            name: 'Антон',
            surname: 'Антонович',
            job: 'Бэкенд',
            about: 'Бэкендит'
        }]);
    window.localStorage.setItem('react-test-data', data);
}

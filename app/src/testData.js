
export default function populateTestData() {
    if(window.localStorage.getItem('react-test-data') !== null) return;
    const data = JSON.stringify([{
            id: 1,
            name: 'Владимир',
            surname: 'Кружков',
            job: 'Программист'
        },{
            id: 2,
            name: 'Антон',
            surname: 'Масленников',
            job: 'Gamer',
            about: '...'
        }]);
    window.localStorage.setItem('react-test-data', data);
}

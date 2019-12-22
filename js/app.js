document.addEventListener('DOMContentLoaded', event => {
    if (localStorage.getItem('login') != null) {
        let login = JSON.parse(localStorage.getItem('login'));
        email = login[0];
        key = login[1];
        document.getElementById('emailAddress').value = email;
        document.getElementById('serialKey').value = key;
    }
});

let loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', onLoginClick);

function onLoginClick(e) {
    e.preventDefault()
    let emailValue = document.getElementById('emailAddress');
    let serialKey = document.getElementById('serialKey');
    let db = firebase.firestore();
    let myLogin = db.collection('users').doc(emailValue.value);
    myLogin.get().then(doc => {
        if (serialKey.value != '') {
            if (doc.exists) {
                if (doc.data().key == serialKey.value) {
                    let data = [emailValue.value, serialKey.value];
                    localStorage.setItem('login', JSON.stringify(data));
                    location.href = 'views/home.html';
                } else {
                    let error = document.createElement('p');
                    error.className = 'text-danger mx-5 text-center font-weight-bold';
                    error.innerText = 'Invalid Key';
                    let mainDiv = document.getElementById('mainDiv');
                    mainDiv.classList.add('tada');
                    mainDiv.appendChild(error);
                    setTimeout(() => {
                        mainDiv.removeChild(error);
                        mainDiv.classList.remove('tada');
                    }, 3000);
                }
            } else {
                let error = document.createElement('p');
                error.className = 'text-danger mx-5 text-center font-weight-bold';
                error.innerText = 'You are not the member of our services';
                let mainDiv = document.getElementById('mainDiv');
                mainDiv.classList.add('tada');
                mainDiv.appendChild(error);
                setTimeout(() => {
                    mainDiv.removeChild(error);
                    mainDiv.classList.remove('tada');
                }, 3000);
            }
        } else {
            let error = document.createElement('p');
            error.className = 'text-danger mx-5 text-center font-weight-bold';
            error.innerText = 'You have not entered correct Serial Key';
            let mainDiv = document.getElementById('mainDiv');
            mainDiv.classList.add('tada');
            mainDiv.appendChild(error);
            setTimeout(() => {
                mainDiv.removeChild(error);
                mainDiv.classList.remove('tada');
            }, 3000);
        }
    }).catch(err => {
        let error = document.createElement('p');
        error.className = 'text-danger mx-5 text-center font-weight-bold';
        error.innerText = 'Something went wrong with Server try after some time';
        let mainDiv = document.getElementById('mainDiv');
        mainDiv.classList.add('tada');
        mainDiv.appendChild(error);
        setTimeout(() => {
            mainDiv.removeChild(error);
            mainDiv.classList.remove('tada');
        }, 3000);
    });

}
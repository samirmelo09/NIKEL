//comentários ou Ctrl+/ para comentar todas as linhas selecionadas
//Ctrl+D no Vc code seleciona as palavras iguais

const myModal = new bootstrap.Modal("#register_modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();


//LOGAR NO SISTEMA

document.getElementById("login_form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email_input").value;
    const password = document.getElementById("password_input").value;
    const checkSession = document.getElementById("session_check").checked;

    const account = getAccount(email);

    if (!account) {
        alert("Oppss!!! Verefique o usuário ou senha.");
        return;
    }

    if (account) {
        if (account.password !== password) {
            alert("Oppss!!! Verefique o usuário ou senha.");
            return;
        }

        saveSession(email, checkSession);

        window.location.href = "2.home.html";
    }



});

//CRIAR CONTA
document.getElementById("create_form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email_create_input").value;
    const password = document.getElementById("password_create_input").value;

    if (email.length < 5) {
        alert("preencha o campo com um e-mail válido.");
        return;
    }
    if (password.length < 4) {
        alert("sua senha deve ter ao menos 4");
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    });

    myModal.hide(); //Ocultar Modal
    alert("Conta criada com sucesso!!!");
});

function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (logged) {
        saveSession(logged, session);

        window.location.href = "2.home.html";
    }
}

function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession) {
    if (saveSession) {
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}

function getAccount(key) {
    const account = localStorage.getItem(key);

    if (account) {
        return JSON.parse(account);
    }

    return "";
}






const myModal = new bootstrap.Modal("#transactions_modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
    transactions: []
};

document.getElementById("button_logout").addEventListener("click", logout);

//ADICIONAR UM LANÇAMENTO
document.getElementById("transactions_form").addEventListener("submit", function (e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("value_input").value);
    const description = document.getElementById("description_input").value;
    const date = document.getElementById("date_input").value;
    const type = document.querySelector('input[name="type_input"]:checked').value;

    data.transactions.unshift({
        value: value, type: type, description: description, date: date
    });

    saveData(data);
    e.target.reset();
    myModal.hide();

    getTransections();

    alert("lançamento adicionado com sucesso!!!");

});

checkLogged()

function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (!logged) {
        window.location.href = "1.index.html";
        return;
    }

    const dataUser = localStorage.getItem(logged);
    if (dataUser) {
        data = JSON.parse(dataUser);
    }

    getTransections();

}

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "1.index.html"
}

function getTransections() {
    const transactions = data.transactions;
    let transactionsHtml = ``;

    if (transactions.length) {
        transactions.forEach((item) => {
            let type = "Entrada";

            if (item.type === "2") {
                type = "Saída";
            }

            transactionsHtml += `
                <tr>
                    <th scope="row">${item.date}</th>
                    <td>${item.value.toFixed(2)}</td>
                    <td>${type}</td>
                    <td>${item.description}</td>
                </tr>
            `


        })
    }

    document.getElementById("transactions_list").innerHTML = transactionsHtml
}

function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}
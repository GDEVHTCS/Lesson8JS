let currentPage = 1;
let results = document.getElementById("results");
let PrevPage = document.getElementById("PrevPage");
let nPage = document.getElementById("nPage");
let TotalPages;

function GetUser(page) {
    fetch("https://reqres.in/api/users?page=" + page, {
        method: "GET",
        headers: { "x-api-key": "reqres-free-v1" },
    })
    .then(function (response) {
        if (!response.ok) {
            throw response.status;
        }
        return response.json();
    })
    .then(function (GotInfo) {
        let frag = new DocumentFragment();
        GotInfo.data.forEach(user => {
            let li = document.createElement('li');
            li.textContent = `${user.first_name} ${user.last_name}`;
            frag.appendChild(li);
        });
        results.innerHTML = '';
        results.appendChild(frag);
        TotalPages = GotInfo.total_pages;
    })
    .catch(function (error) {
        let pnew = document.createElement('p');
        if (error === 404) {
            pnew.textContent = 'Page not found!';
        } else {
            pnew.textContent = 'Server Failed!';
        }
        document.getElementById("fetch-api-users").appendChild(pnew);
    });
}

GetUser(currentPage);
PrevPage.disabled = true;

nPage.addEventListener('click', function () {
    if (currentPage === TotalPages) return;
    currentPage++;
    GetUser(currentPage);
    nPage.disabled = currentPage === TotalPages;
    PrevPage.disabled = false;
});

PrevPage.addEventListener('click', function () {
    if (currentPage === 1) return;
    currentPage--;
    GetUser(currentPage);
    PrevPage.disabled = currentPage === 1;
    nPage.disabled = false;
});

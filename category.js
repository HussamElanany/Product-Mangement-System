let cat1 = []
if (localStorage.catPro != null) {
    cat1 = JSON.parse(localStorage.catPro)
} else {
    cat1 = []
}

function showCategoryData() {
    let tableCategoryPro = '';
    for (let i = 0; i < cat1.length; i++) {
        tableCategoryPro += `
            <tr>
            <td>${i + 1}</td>
            <td>${cat1[i].title}</td>
            <td>${cat1[i].price}</td>
            <td>${cat1[i].taxes}</td>
            <td>${cat1[i].discount}</td>
            <td>${cat1[i].total}</td>
            <td>${cat1[i].category}</td>
            <td>${cat1[i].getDate}</td>
            <td><button onclick="
            deleteItem(${i})
            " id="delete">Delete</button></td>
        </tr>`
    }
    let tbody = document.querySelector('#tbody-category-p')
    tbody.innerHTML = tableCategoryPro;
}
showCategoryData()

// delete item
function deleteItem(i) {
    cat1.splice(i, 1)
    localStorage.catPro = JSON.stringify(cat1)

    showCategoryData()
}
console.log(cat1);
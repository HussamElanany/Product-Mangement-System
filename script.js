
const title = document.querySelector('#title')
const price = document.querySelector('#price')
const taxes = document.querySelector('#taxes')
const discount = document.querySelector('#discount')
const total = document.querySelector('#total')
const count = document.querySelector('#count')
const category = document.querySelector('#category')
const submit = document.querySelector('#submit')
let mood = 'create';
const select = document.querySelector('select')
//console.log(select);
let temp;

// get Total 
function getTotal() {

    if (price.value != '') {
        let result = +price.value + +taxes.value - +discount.value
        total.innerHTML = result
        total.style.background = '#040'
    }
    else {
        total.innerHTML = ''
        total.style.background = '#a00d02'
    }
}

// create product
let dataProduct;
if (localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product)
} else {
    dataProduct = []
}


submit.onclick = function () {
    let dateFunc = new Date()
    let date = dateFunc.toString()
    console.log(date);
    let newProduct = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
        vendor: select.value,
        getDate: date.slice(0, 25)
    }

    //Clean data
    if (title.value != '' && price.value != '' && category.value != '') {
        //Update
        if (mood === 'create') {
            //count
            if (newProduct.count > 1) {
                for (let i = 0; i < newProduct.count; i++) {
                    dataProduct.push(newProduct)
                }
            } else {
                dataProduct.push(newProduct)
            }
        } else {
            dataProduct[temp] = newProduct;
            mood = 'create'
            submit.innerHTML = 'Create'
            count.style.display = 'block'
        }


    } else {
        alert('pleas fill the form')
    }


    localStorage.setItem('product', JSON.stringify(dataProduct))

    getdata1()
    showData()
    clearData()
}

// clear inputs 
function clearData() {
    title.value = ''
    price.value = ''
    taxes.value = ''
    discount.value = ''
    total.innerHTML = ''
    count.value = ''
    category.value = ''
    total.style.background = '#a00d02'
}

// show data
function showData() {
    let table = '';
    dataProduct.forEach((product, i) => {
        table += `
                <tr>
                <td>${i + 1}</td>
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td>${product.taxes}</td>
                <td>${product.discount}</td>
                <td>${product.total}</td>
                <td>${product.category}</td>
                <td><button onclick='
                updateData(${i})
                ' id="update">Update</button></td>
                <td><button onclick="
                sellItem(${i})
                " id="delete">Sell</button></td>
            </tr>`

    })
    let tbody = document.querySelector('#tbody')
    tbody.innerHTML = table


    //show delete all btn
    let deleteAllDiv = document.querySelector('#delete-all')
    if (dataProduct.length > 0) {
        deleteAllDiv.innerHTML = `
    <button onclick='deleteAll()' id='delete-all-btn'>Delete All (${dataProduct.length})</button>
    `
    } else {
        deleteAllDiv.innerHTML = ''
    }

}
showData()

// Sell Product

let soldProductData;
function sellItem(i) {
    soldProductData = dataProduct.splice(i, 1)
    soldProductpage.push({ data: soldProductData })

    console.log(soldProductpage);
    // Save soldProductpage in local storage
    localStorage.setItem('soldProduct', JSON.stringify(soldProductpage))

    //dataProduct.splice(i, 1)
    localStorage.product = JSON.stringify(dataProduct)

    showData()
    console.log(soldProductpage);
}


// Delete All

function deleteAll() {
    localStorage.clear()
    dataProduct.splice(0)
    showData()
}

//Update Method
function updateData(i) {
    title.value = dataProduct[i].title
    price.value = dataProduct[i].price
    taxes.value = dataProduct[i].taxes
    discount.value = dataProduct[i].discount
    getTotal()
    count.style.display = 'none'
    category.value = dataProduct[i].category;
    submit.innerHTML = 'Update'
    mood = 'update'
    temp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })
    // console.log(i);
}

// Search

function getSearchMood() {
    let search = document.querySelector('#search')
    search.focus()
    search.placeholder = 'Search By Title'
    // console.log(search);
}

function searchData(value) {

    let table = '';
    for (let i = 0; i < dataProduct.length; i++) {

        if (dataProduct[i].title.toLowerCase().includes(value) || dataProduct[i].title.includes(value)) {
            table += `
            <tr>
            <td>${i + 1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick='
            updateData(${i})
            ' id="update">Update</button></td>
            <td><button onclick="
            deleteTest(${i})
            " id="delete">Delete</button></td>
        </tr>`;
            // console.log(dataProduct[i].title);
        }

    }
    let tbody = document.querySelector('#tbody')
    tbody.innerHTML = table
}

// Category


function getdata1() {
    let dateFunc = new Date()
    let date = dateFunc.toString()
    let newProduct = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
        vendor: select.value,
        getDate: date.slice(0, 25)
    }

    if (newProduct.category === "Category 1") {
        if (newProduct.count > 1) {
            for (let i = 0; i < newProduct.count; i++) {
                cat1.push(newProduct)
            }
        } else {
            cat1.push(newProduct)
        }
    }
    localStorage.setItem('catPro', JSON.stringify(cat1))
    console.log(cat1);
}



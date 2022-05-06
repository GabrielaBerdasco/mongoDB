const socketP = io.connect()
const Handlebars = require("handlebars");

const template = Handlebars.compile(`
    {{#each products}}
        <tr>
            <td>{{name}}</td>
            <td>{{price}}</td>
            <td><img src="{{image}}" alt="{{name}}" width="100"></td>
        </tr>
    {{/each}}
`)

function addProduct(e) {
    const product = {
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
        image: document.getElementById('image').value
    }
    console.log(product);
    socketP.emit('new-product', product)

    document.getElementById('name').value = ''
    document.getElementById('price').value = ''
    document.getElementById('image').value = ''

    return false
}

socketP.on('products', (data) => {
    console.log(data);
    document.getElementById('products').innerHTML = template({productos: data})
})
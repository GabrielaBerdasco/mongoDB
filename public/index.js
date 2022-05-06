const socket = io.connect()

function render(data) {
    const html = data.map((elem, index) => {
        return (`
            <li class="chat-item">
                <strong class="text-primary">${elem.author}</strong>
                <span class="text-danger">[${elem.date}]: </span>
                <em class="text-success">${elem.text}</em>
            </li>
        `)
    }).join('')
    console.log(html)
    document.getElementById('messages').innerHTML = html
}

function addMessage(e) {
    const date = Date()
    const message = {
        author: document.getElementById('userEmail').value,
        text: document.getElementById('textMessage').value,
        date: date
    }
    console.log(message);
    socket.emit('new-message', message)

    document.getElementById('textMessage').value = ''   
    return false
}

socket.on('messages', (dataMessages) => {
    render(dataMessages)
})
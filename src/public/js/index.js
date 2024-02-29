const socket = io();

let user;
let chatBox = document.getElementById("chatBox");

socket.emit('message', 'Se ha conectado el websocket');

Swal.fire({
    title: "Identificate",
    input: "text",
    text: "Ingrese nombre de usuario",
    inputValidator: (val) => {
        return !val && "¡Necesitas un nombre de usuario para continuar!";
    },
    allowOutsideClick: false
}).then(res => {
    user = res.value;
    
    let welcomeMessage = document.getElementById("welcomeMessage");
    welcomeMessage.innerHTML = `Bienvenido ${user}`;
});

chatBox.addEventListener("keyup", event => {
    if(event.key === "Enter") {
        if(chatBox.value.trim().length > 0) {
            socket.emit("message", {user: user, message: chatBox.value});
            chatBox.value = "";
        }
    }
});

socket.on("messageLogs", data => {
    let log = document.getElementById("messageLogs");
    let messages = "";
    data.forEach(message => {
        messages = messages + `<br>${message.user} dice: ${message.message}</br>`;
    });
    log.innerHTML = messages;
});

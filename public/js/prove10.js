import('/socket.io/socket.io.js');
var socket = io();


// document.getElementById('submitAvenger').addEventListener('click', emitData);
// document.getElementById('submitAvenger').addEventListener('click', emitData);
// const emitData = (e) => {
//   e.preventDefault();
//   socket.emit('chat message', input.value);

// }
let encodedURI = encodeURI(('prove/fetchAll'));
const list = document.getElementById('listdata');

// Get socket message from the server
socket.on('chat message', function(msg) {
    console.log(msg)
    list.innerHTML += `<li>${msg}</li>`

  });



const clearList = () => {
   list.innerHTML = '';
}



const populateList = (url) => {
   fetch(url)
       .then(res => res.json())
       .then(jsonData => {
        
         clearList();
 
           jsonData.avengers.forEach(element => {
            list.innerHTML += `<li>${element.name}</li>`
   
         });
      })
}

const submitAvenger = () => {
   const newAvenger = document.getElementById('newAvenger').value;
//    Send Socket message to server
   socket.emit('chat message', newAvenger);

   fetch('/prove/insert', {
       method: 'POST', // Send a POST request
       headers: {
           // Set the Content-Type, since our server expects JSON
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({ newAvenger })
   })
       .then(res => {
          console.log(newAvenger)
          console.log(res)
           // Clear the input
           document.getElementById('newAvenger').value = ''

           // Repopulate the list with our new name added
           populateList(encodedURI)
       })
       .catch(err => {
           // Clear the input
           document.getElementById('newAvenger').value = ''
           console.error(err)
       })
}

// Initialize the list
populateList(encodedURI)

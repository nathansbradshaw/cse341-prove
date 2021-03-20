
let encodedURI = encodeURI(('prove/fetchAll'));
const list = document.getElementById('listdata');






const clearList = () => {
   list.innerHTML = '';
}







const populateList = (url) => {
   fetch(url)
       .then(res => res.json())
       .then(jsonData => {
           // Clear the list first
         //   while (nameList.firstChild) nameList.firstChild.remove()
         clearList();
           // Repopulate the list
           jsonData.avengers.forEach(element => {
            list.innerHTML += `<li>${element.name}</li>`
   
         });
      })
}

const submitAvenger = () => {
   const newAvenger = document.getElementById('newAvenger').value;

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

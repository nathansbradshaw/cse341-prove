
let encodedURI = encodeURI(('prove/fetchAll'));
const list = document.getElementById('listdata');



function populateList(url) {
   fetchData(url).then(jsonData => {
      console.log(jsonData)
      clearList();
      jsonData.avengers.forEach(element => {
         list.innerHTML += `<li>${element.name}</li>`

      });
   })
}


const clearList = () => {
   list.innerHTML = '';
}

async function fetchData(url) {
   console.log(url)
   const response = await fetch(url)
      .then(response => response.json())
      .then(responseData => {
         return responseData;
      })
      .catch(error => console.log(error)
      )
   return response;
}

populateList(encodedURI)
// A simple async POST request function
const postData = async (url, data) => {
   const jsonstring = (JSON.stringify(data))
   JSON.parse(jsonstring)
   const response = await fetch(url, {
      // Await the response.
      method: 'POST',
      headers: {
         'Content-Type': 'text'
      },
      body: jsonstring // Data must be sent as a string
   }).catch(error => console.log(error))
   console.log(response);
   return response.json() // Wrap in a promise using JSON formatting.
}

const submitAvenger = () => {
   const newAvenger = document.getElementById('newAvenger').value;
   console.log(newAvenger)
   const data = postData(('/prove/insert'), {
      newAvenger: newAvenger
   })
   console.log(data)

   data.then(response => {
      console.log(response);
      if (response.status === 200) {
         populateList(encodedURI);
      } else {
         console.error(status)
         return
      }
   })
}

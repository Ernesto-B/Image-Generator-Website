// Getting the form form the DOM
const form = document.querySelector('form');

// Listen to when user clicks button and submits the form
form.addEventListener('submit', async (e) => {
  
  // Prevents page from refreshing when submitting the form
  e.preventDefault();
    showSpinner();
  
  // Extract data from form by using FormData object that takes form as the input. Behaves like a map
  const data = new FormData(form);

  // Make request to API
  const response = await fetch('http://localhost:5173/dream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // Convert recieved object into string
    body: JSON.stringify({
      // Make object prompt which grabs prompt value from the form using get method
      prompt: data.get('prompt'),
    }),
  });
    

  if (response.ok) {
    // Save the url of the image if API connection and response was successful 
    const { image } = await response.json();

    // Insert image into the UI
    const result = document.querySelector('#result');
    result.innerHTML = `<img src="${image}" width="512" />`;
  } 
  
  else {
    // Alert the user that there was an issue with the request, prompt, or connection
    const err = await response.text();
    alert(err);
    console.error(err);
  }

  hideSpinner();

});

function showSpinner() {
  const button = document.querySelector('button');
  button.disabled = true;
  button.innerHTML = 'Generating... <span class="spinner">🧠</span>';
}

function hideSpinner() {
  const button = document.querySelector('button');
  button.disabled = false;
  button.innerHTML = 'Generate';
}
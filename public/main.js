var update = document.querySelectorAll('.complete');
let name = document.querySelectorAll('h5');

for (let i = 0; i < update.length; i++) {
  update[i].addEventListener('click', function () {
    fetch('completed', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'name': name[i].innerHTML
        })
      })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
        window.location.reload(true)
      })
  })

}

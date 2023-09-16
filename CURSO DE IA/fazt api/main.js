let parrafo = document.getElementById("parrafo")
let parar = document.getElementById("parar")
let texto_ia = document.getElementById("texto_ia")
let id_imagen = document.getElementById("imagen")
console.log(select_1)
parrafo.addEventListener('click',()=>{
  let select_1 = document.getElementById("select_1").value 
  if(select_1 == 1){
    id_imagen.setAttribute("src", "https://tse3.mm.bing.net/th?id=OIP.8naWcBcRuUBGSz41H3GngAHaEK&pid=Api&P=0&h=180");
  }else{
    id_imagen.setAttribute("src", "https://th.bing.com/th/id/OIP.cyF328I9nJrapB1F4KezKgHaEO?w=298&h=180&c=7&r=0&o=5&pid=1.7 ");
  }
  
  console.log(select_1)
  const dataToSend = {
      numero: select_1
    };
    
    fetch('http://127.0.0.1:8000/items/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })
    .then(response => response.json())
    .then(data => {
      texto_ia.textContent = data
      
    })
    .catch(error => {
      console.error('Hubo un error:', error);
    });
})


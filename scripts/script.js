var carrito =[];
function agregarProducto(id,producto,precio){
    let indice = carrito.findIndex( c => c.id === id )
    if(indice ===-1){
            postJSON(
                {
                    "id":id,
                    "producto":producto,
                    "precio":precio,
                    "cantidad":1
                }
            );
    }else{
        carrito[indice].cantidad++;
        putJSON(carrito[indice])
    }
}

function actualizarTabla(){
    let tbody=document.getElementById('tbody')
    let total=0;
    tbody.innerHTML=''
    for(let item of carrito){
        let fila = tbody.insertRow();

        let celdaCantidad=fila.insertCell(0);
        let celdaProducto = fila.insertCell(1);
        let celdaPrecio = fila.insertCell(2);
        let celdaBoton=fila.insertCell(3);
        
        celdaCantidad.textContent=item.cantidad;
        celdaProducto.textContent = item.producto;
        celdaPrecio.textContent = item.precio*item.cantidad;
        
        //Creacion del boton
        let boton = document.createElement("button");
        boton.textContent = "Eliminar"
        celdaBoton.append(boton)

        boton.addEventListener('click',function(){       
          Swal.fire({
            title: "Estas seguro?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#96C0E6",
            cancelButtonColor: "#D796E6",
            confirmButtonText: "Sí, quiero eliminarlo!",
            cancelButtonText:"No, cancelar"
          }).then((result) => {
            if (result.isConfirmed) {
              deleteJSON(item.id)
            }
          });
        })

        total=total+(item.precio*item.cantidad);
    }
    document.getElementById('total').textContent=total;
}

//Guardar
async function postJSON(data) {
    try {
      const response = await fetch("http://localhost:3000/carrito", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      console.log("Success:", result);
      console.log("TERMINA POST")
    } catch (error) {
      console.error("Error:", error);
    }
  }

  //Cargar 
  async function getJSON(data) {
    try {
      const response = await fetch("http://localhost:3000/carrito", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      console.log("Success:", result);
      carrito=result
      actualizarTabla()

    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  window.onload=(event)=>{
   getJSON()
 };

  //Actualizar
  async function putJSON(data) {
    try {
      const response = await fetch(`http://localhost:3000/carrito/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      console.log("Success:", result);

    } catch (error) {
      console.error("Error:", error);
    }
  }

  //ELIMINAR
  async function deleteJSON(id) {
    try {
      const response = await fetch(`http://localhost:3000/carrito/${id}`, {
        method: "DELETE",
      });
  
      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }


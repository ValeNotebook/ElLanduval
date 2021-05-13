let pedidos=[];

//Area de Texto.

tinymce.init({
    selector: '#textito',
    height: 250,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  });

//Generar Option al abrir la pagina en el select de horario.

  document.addEventListener("DOMContentLoaded", ()=>{    


    let horario = document.querySelector("#tipo-pedido");
    let desayuno = document.createElement("option");
    desayuno.innerText = "Desayuno";
    desayuno.value = "desayuno";
    horario.appendChild(desayuno);
    let almuerzo = document.createElement("option");
    almuerzo.innerText = "Almuerzo";
    almuerzo.value = "almuerzo";
    horario.appendChild(almuerzo);
    let once= document.createElement("option");
    once.innerText = "Once";
    once.value = "once";
    horario.appendChild(once);
    let cena = document.createElement("option");
    cena.innerText = "Cena";
    cena.value = "cena";
    horario.appendChild(cena);

  }) ;

  //Funcionalidad Boton Agregar y validacion

  document.querySelector("#btn_agregar").addEventListener("click",()=>{

    let bool=false;
    let nombre_cliente=document.querySelector("#nom-cliente").value;
    let tipo_pedido=document.querySelector("#tipo-pedido").value;
    let cantidad=document.querySelector("#total-pedido").value;
    let descripcion=tinymce.get("textito").getContent();

    if ((tipo_pedido=="desayuno" && cantidad>=1000 && cantidad<=10000) || (tipo_pedido=="almuerzo" && cantidad>=10000 && cantidad<=20000)|| (tipo_pedido=="once" && cantidad>=5000 && cantidad<=15000)|| (tipo_pedido=="cena" && cantidad>=15000)) {

      bool=true;
    }
    


    if (nombre_cliente!="" && bool==true){

        let pedido={ };
        pedido.nombre_cliente=nombre_cliente;
        pedido.tipo_pedido=tipo_pedido;
        pedido.cantidad=cantidad;
        pedido.descripcion=descripcion;
        pedidos.push(pedido);
        recargarTabla();
        //recargarTabla();

        Swal.fire("Exito","El Pedido se ha agregado con exito", "success")

    } else{
        if (nombre_cliente ==""){
            Swal.fire("Error","Tiene que ingresar un nombre de cliente.", "error")
        }else if (bool==false){
            Swal.fire("Error","El plato posee un precio invalido.", "error")

        }

    }

});

//Agregar a la tabla

const recargarTabla=()=>{

  let tbody=document.querySelector("#tb-body");
  tbody.innerHTML="";
  
  for (let i=0; i<pedidos.length;++i){
      let pedido = pedidos[i];
      let tr= document.createElement("tr");
      let tdNumero=document.createElement("td");
      tdNumero.innerText=i+1;
      let tdNombre=document.createElement("td");
      tdNombre.innerText= pedido.nombre_cliente;
      let tdTipoPedido=document.createElement("td");


      if (pedido.tipo_pedido=="desayuno"){
          tdTipoPedido.innerText="Desayuno";
      }else if (pedido.tipo_pedido=="almuerzo"){
          tdTipoPedido.innerText="Almuerzo";
      }else if (pedido.tipo_pedido=="once"){
        tdTipoPedido.innerText="Once";
      }else{
        tdTipoPedido.innerText="Cena";
      }


      let tdCantidad=document.createElement("td");
      tdCantidad.innerText=pedido.cantidad;
      let tdDescripcion=document.createElement("td");
      tdDescripcion.innerHTML=pedido.descripcion;
      let tdOferta=document.createElement("td");
      let icono=document.createElement("i");

      let oferta=false;

      if ((pedido.tipo_pedido=="desayuno" && pedido.cantidad<5000) || (pedido.tipo_pedido=="almuerzo" && pedido.cantidad<15000 )|| (pedido.tipo_pedido=="once" && pedido.cantidad<10000)|| (pedido.tipo_pedido=="cena" && pedido.cantidad<20000)) {

        oferta=true;

      }
  
      if (oferta==true){

        icono.classList.add("fas","fa-certificate","text-warning");


      }else{
        icono.classList.add("fab","fa-creative-commons-nc","text-danger");


      }

      tdOferta.appendChild(icono);


      tr.appendChild(tdNumero);
      tr.appendChild(tdNombre);
      tr.appendChild(tdTipoPedido);
      tr.appendChild(tdCantidad);
      tr.appendChild(tdDescripcion);
      tr.appendChild(tdOferta);
      tbody.appendChild(tr);





  }

};


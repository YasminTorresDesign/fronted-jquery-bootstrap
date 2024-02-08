$(document).ready(() =>{
    //Listado de muebles
   const list = () =>{
   $.ajax({
       url:"http://localhost:8080/mueble",
       type:"GET",
       dataType:"json",
       success:function(res){
           let data="";
           res.forEach(element => {
               data+=`
                    <tr muebleId = ${element.id} >
                        <td>${element.id}</td>
                        <td>${element.nombre}</td>
                        <td>${element.descripcion}</td>
                        <td>${element.categoria}</td>
                        <td>${element.imagen}</td>
                        <td>
                        <button id="eliminar" class="btn btn-danger">Eliminar</button>
                        </td>
                        <td>
                        <button id="actualizar" class="btn btn-primary ">Editar</button>
                        </td>
                    </tr>
               `
           });
           $("tbody").html(data);
    }
    })
}

//Guardar Mueble
    const save = () => {
        $("#agregar").on("click",function(){
            const datosMueble={
                nombre: $("#nombre").val(),
                descripcion: $("#descripcion").val(),
                categoria: $("#categoria").val(),
                imagen: $("#imagen").val(),
            }
            $.ajax({
                url:"http://localhost:8080/mueble",
                contentType:"application/json",
                type:"POST",
                data:JSON.stringify(datosMueble),
                dataType:"json",
                success: (data) =>{
                    $("#mensaje").html(`Mueble creado: Id:${data.id}  nombre:${data.nombre}  descripcion:${data.descripcion} categoria:${data.categoria}`).css("display","block").removeClass('alert alert-danger alert alert-info').addClass('alert alert-success');
                    reset();
                    list();
                }
            })
        })
    }

//Eliminar Mueble
const deleteMueble = () => {
    $(document).on('click', '#eliminar', function(){
        if(confirm('Seguro de eliminar ?')){
            let btnDelete = $(this)[0].parentElement.parentElement;
            let id = $(btnDelete).attr('muebleId');
            $.ajax({
                url: "http://127.0.0.1:8080/mueble/" + id,
                type: 'DELETE',
                success: (data) => { 
                    $('#mensaje').html(data).css('display', 'block').addClass('alert alert-danger');
                    borrarBusqueda();
                    list();
                } 
            })
        }
    })
}

const buscarMueble = () => {
    $("#buscar").on("click",function(){
       let parametro= $("#busqueda").val();
       let seleccion=$("#seleccion").val();
       if(seleccion==1){
            $.ajax({
                url: "http://127.0.0.1:8080/mueble/"+parametro,
                type: 'GET',
                dataType: 'json',
                success: function(res){
                            data= 
                                `
                                <tr muebleId= ${res.id}>
                                    <td>${res.id}</td>
                                    <td>${res.nombre}</td>
                                    <td>${res.descripcion}</td>
                                    <td>${res.categoria}</td>
                                    <td>${res.imagen}</td>
                                    <td>
                                    <button id="eliminar" class="btn btn-danger">Eliminar</button>
                                    </td>
                                    <td>
                                    <button id="actualizar" class="btn btn-primary ">Editar</button>
                                    </td>
                                </tr>
                                `
                    
                        $('#tbody').html(data);
                }
            })

        }else if(seleccion==2){
            $.ajax({
                url: "http://127.0.0.1:8080/mueble/query?categoria="+parametro,
                type: 'GET',
                dataType: 'json',
                
                success: function(res){
                    let data="";
                    res.forEach(element => {
                        data+=`
                             <tr muebleId = ${element.id} >
                                 <td>${element.id}</td>
                                 <td>${element.nombre}</td>
                                 <td>${element.descripcion}</td>
                                 <td>${element.categoria}</td>
                                 <td>${element.imagen}</td>
                                 <td>
                                 <button id="eliminar" class="btn btn-danger">Eliminar</button>
                                 </td>
                                 <td>
                                 <button id="actualizar" class="btn btn-primary ">Editar</button>
                                 </td>
                             </tr>
                        `
                    });
                    $("tbody").html(data);
                }
            })
            

        }



    }

    )
}

//Rellenar los datos del mueble en el formualario
const rellenarMueble = () => {
    $(document).on('click', '#actualizar', function(){
        let btnEdit= $(this)[0].parentElement.parentElement;
        let id = $(btnEdit).attr('muebleId');
        console.log(id,btnEdit);
       $('#agregar').hide();
       $('#editar').show();
       $.ajax({
           url:"http://127.0.0.1:8080/mueble/" + id,
           type:  'GET',
           dataType: 'json',
           success:  (res) => {
               $('#id').val(res.id);
               $('#nombre').val(res.nombre);
               $('#descripcion').val(res.descripcion);
               $('#categoria').val(res.categoria);
               $('#imagen').val(res.imagen);
           }
       })
    })

}

//Método para modificar los datos de los muebles
const editMueble = () => {
    $('#editar').on('click', function(){
        let id = $('#id').val();
        $('#agregar').css('display', 'none');
        $('#editar').css('display', 'block');
        
        const datosMueble = {
            id:$('#id').val(),
            nombre: $('#nombre').val(),
            descripcion: $('#descripcion').val(),
            categoria: $('#categoria').val(),
            imagen: $('#imagen').val(),
        }
        $.ajax({
            url: "http://127.0.0.1:8080/mueble",
            
            contentType: 'application/json',
            type: 'POST',
            data:JSON.stringify(datosMueble),
            dataType: 'json',
            success:  (res) => {
                $('#messages').html('Mueble modificado').css('display','block')
                $('#editar').css('display', 'none');
                $('#agregar').css('display','block');
                $("#mensaje").html(`Mueble con el Id:  ${res.id} Editado, nombre: ${res.nombre}, descripcion: ${res.descripcion}, categoria: ${res.categoria}`).css("display","block").removeClass('alert alert-danger alert alert-success').addClass('alert alert-info');
                reset();
                borrarBusqueda();
                list();
            }

        })
    })
}

const borrarBusqueda = () =>{
    $("#busqueda").val("");
    $("#seleccion").val("");
}

//metodo para limpiar el formulario
const reset = () =>{
    $("#nombre").val("");
    $("#descripcion").val("");
    $("#categoria").val("");
    $("#imagen").val("");
}

//LLamado a las funciones
list();
save();
deleteMueble();
buscarMueble();
rellenarMueble();
editMueble();

})
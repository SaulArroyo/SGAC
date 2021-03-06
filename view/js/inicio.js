$(document).ready(function(){
    inicio();            
});

function inicio(){
  $("#contenido").load("bienvenida");  
}

$(inicio).ajaxStop(function(){
    // carga el login de administrador
    $("#opcion1").click(function(){
        console.log("hola");
        $("#contenido").load("admin_login");
    });//END FUNCTION
    // carga login de alumnos
    $("#opcion2").click(function(){
        $("#contenido").load("alumnos_login");
    });//END FUNCTION
    // carga login de alumnos
    $("#opcion3").click(function(){
        $("#contenido").load("instructores_login");
    });//END FUNCTION
    // para los botones de cancelar login
    $("#btn_cancelar_login").click(function(){
        $("#contenido").load("bienvenida");
    });//END FUNCTION
    
    /*
     * Para los input text del login
     */
    $("#usuario").keyup(function(){
        this.value = this.value.toUpperCase();
    });
    /*
     * Para el botón de ingresar del login
     */
    $('#btn_login').click(function(){
        div_id_boton = "";
        
        url = "";
        objParametros = {};
        tipo_consulta = "login";
        
        switch($('#btn_login').attr("name")){                
            case "alumno":
                div_id_boton = '<input type="submit" value="Ingresar" class="boton" id="btn_login" name="alumno">';
                
                url = "view/Alumnos/scp_validaciones"; 
                usuario = $("#usuario").val();
                clave = $("#clave").val(); 
                objParametros = {
                    'tipo_consulta' : tipo_consulta,
                    'usuario' : usuario,
                    'clave' : clave
                };
                console.log("Ya entramos al case alumno");
            break;//END CASE
            case "admin":
                div_id_boton = '<input type="submit" value="Ingresar" class="boton" id="btn_login" name="admin">';
                
                url = "view/Administradores/scp_validaciones"; 
                usuario = $("#usuario").val();
                clave = $("#clave").val(); 
                objParametros = {
                    'tipo_consulta' : tipo_consulta,
                    'usuario' : usuario,
                    'clave' : clave
                };
                console.log("Ya entramos al case admin");
            break;//END CASE
        }//END SIWTCH
        crear_loading_boton();
        $("#cancelar").html("");
        $.ajax({
                type: 'POST',
                url: url,
                data: objParametros,
                success: function(respuesta){//Respuesta es lo que pone PHP en pantalla, prácticamente es traer al PHP si la consulta fue successfuly
                    res = respuesta.toString();
                    r = parseInt(res);
                    
                    switch(r){
                        case 2:
                            $("#mensaje").html("El Usuario y/o el NIP son incorrectos");
                            $("#boton").html(div_id_boton);
                            $("#cancelar").html('<button href="#" class="cancelar" id="btn_cancelar_login">Cancelar</button>');
                        break;//END CASE
                        case 1:
                            $("#mensaje").html("Uno o ambos campos están vacíos");
                                $("#boton").html(div_id_boton);
                                $("#cancelar").html('<button href="#" class="cancelar" id="btn_cancelar_login">Cancelar</button>');
                        break;
                        default:
                            $('body').html(respuesta);
                        break;//END CASE
                    }//END SWITCH                        
                }//END SUCCESS
            });//END AJAX
    });//END FUNCTION
});//END AJAX STOP

function cancelar(){
    var conexion;
    if(window.XMLHttpRequest){
        conexion = new XMLHttpRequest();
    }
    else{
        conexion = new ActiveXObject("Microsoft.XMLHTTP");
    }
    conexion.onreadystatechange = function(){
        if(conexion.readyState == 4 && conexion.status == 200){
            document.getElementById("contenido").innerHTML = conexion.responseText;
        }
    };
    
    conexion.open("GET", "bienvenida", true);
    conexion.send();
}//END FUNCTION
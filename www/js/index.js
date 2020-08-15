var $$ = Dom7;

//MuestraMensaje();

var idinmueble=0;
var marca ="";
var categoria ="";
var token="";
var platform = "";



var app = {
  // Application Constructor
  initialize: function() {
      this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
      document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function() {
      app.receivedEvent('deviceready');
  },
  // Update DOM on a Received Event
  receivedEvent: function(id) {


    platform = device.platform;

    if(device.platform !="browser"){
     
        var push = PushNotification.init({
              android:{

              },ios:{
                  alert:"true",
                  badge:true,
                  sound:'false'
              }
        });


        push.on('registration', function (data) {
         
          

          getToken(data.registrationId,device.platform);
          
          token = data.registrationId;
          console.log(data.registrationId);
          console.log(data.registrationType);
      
          });


          push.on('notification', function (data) {

              console.log(data.message);
              console.log(data.title);
              console.log(data.count);
              console.log(data.sound);
              console.log(data.image);
              console.log(data.additionalData);

          });

        }

  }
};



        function getToken(token,platform){

       

          var token = token;
          var platform = platform;


          alert("TOKEN:"+token);

          alert("PLATFORM:"+platform);

          app7.request({
            url: 'http://eleadex.online/team/api/settoken.php',
            data:{token:token,platform:platform},
            method:'POST',
            crossDomain: true,
            success:function(data){
                 
              app7.preloader.hide();
      
              var objson = JSON.parse(data);
      
              if(objson.data == "AUTENTICADO"){
      
                localStorage.setItem("team-login", "autenticado");
                localStorage.setItem("usuario", usuario);
      
              mainView.router.navigate('/home/',{animate:true});
              
              }else{
                console.log("respuesta appi:"+objson.data);
                alert("USUARIO Y/O PASSWORD INCORRECTO");
              }
            
            },
            error:function(error){

             
      
              app7.preloader.hide();
            
            }
            
            });
            

          


        }



function showSplashScreen(){

  setTimeout(function(){  InitApp();   }, 000);

}


function InitApp(){

   if(localStorage.getItem("team-login")=="autenticado"){
       mainView.router.navigate('/home/',{animate:true});   
   }else{
    mainView.router.navigate('/login/',{animate:true});
   }

}


function CerrarSesion()
{

  //checkConnection();

  localStorage.setItem("team-login", "false");
  localStorage.setItem("usuario", "");

  mainView.router.navigate('/login/',{animate:true});

}



function checkConnection() {
  var networkState = navigator.connection.type;

  var states = {};
  states[Connection.UNKNOWN]  = 'Unknown connection';
  states[Connection.ETHERNET] = 'Ethernet connection';
  states[Connection.WIFI]     = 'WiFi connection';
  states[Connection.CELL_2G]  = 'Cell 2G connection';
  states[Connection.CELL_3G]  = 'Cell 3G connection';
  states[Connection.CELL_4G]  = 'Cell 4G connection';
  states[Connection.CELL]     = 'Cell generic connection';
  states[Connection.NONE]     = 'No network connection';

  alert('Connection type: ' + states[networkState]);
}




var app7 = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'Team',
    // App id
    id: 'com.team.app',
    /* Enable swipe panel
    panel: {
      swipe: 'left',
    },*/
    // Add default routes
    routes: [
      {
        path: '/home/',
        url: 'views/home.html',
      },{
        path: '/login/',
        url: 'views/login.html',
      },
      {
        path: '/registro/',
        url: 'views/registro.html',
      },{
        path: '/perfil/',
        url: 'views/perfil.html',
      },
      {
        path: '/inmueble/',
        url: 'views/inmueble.html',
      },
    ],
    // ... other parameters
  });





  var mainView = app7.views.create('.view-main');

 



  app7.panel.allowOpen = true;



     


  // Show preloader before Ajax request
   //app7.preloader.show('blue');

   


   // Create full-layout notification
var notificationFull = app7.notification.create({
    icon: '<i class="f7-icons">alarm</i>',
    title: 'Framework7',
    titleRightText: 'now',
    subtitle: 'This is a subtitle',
    text: 'This is a simple notification message',

  });



  function Ingresar(){

    var usuario = $$('#usuario').val();
    var password = $$('#password').val();

    app7.preloader.show('blue');

    app7.request({
      url: 'http://eleadex.online/team/api/login.php',
      data:{username:usuario,password:password},
      method:'POST',
      crossDomain: true,
      success:function(data){
           
        app7.preloader.hide();

        var objson = JSON.parse(data);

        if(objson.data == "AUTENTICADO"){

          localStorage.setItem("team-login", "autenticado");
          localStorage.setItem("usuario", usuario);

        mainView.router.navigate('/home/',{animate:true});
        
        }else{
          console.log("respuesta appi:"+objson.data);
          alert("USUARIO Y/O PASSWORD INCORRECTO");
        }
      
      },
      error:function(error){


        alert(error.xhr);
        alert(error.status);
        alert(error.message);

        app7.preloader.hide();
      
      }
      
      });

  }


  function Registrarse(){

      var nombre = $$('#nombre').val();
      var apellidos = $$('#apellidos').val();
      var telefono = $$('#telefono').val();
      var correo = $$('#correo').val();
      var usuario = $$('#usuarior').val();
      var password = $$('#passwordr').val();
  

      app7.preloader.show('blue');
  
      app7.request({
        url: 'http://localhost/team/api/users.php',
        data:{usuario:usuario,password:password,nombre:nombre,apellidos:apellidos,correo:correo,telefono:telefono},
        method:'POST',
        crossDomain: true,
        success:function(data){
             
          app7.preloader.hide();
  
          var objson = JSON.parse(data);
  
          if(objson.status_message == "CORRECTO"){
  
          alert("Muchas gracias por registarte ya puedes acceder");
          mainView.router.navigate('/login/',{animate:true});
          
          }else{
  
            alert("Hubo un error intentalo nuevamente");
          }
        
        },
        error:function(error){
  
          app7.preloader.hide();
        
        }
        
        });
  
  }


 

  function AbrirNotificacion(){
    

    notificationFull.open();
   

  }


function prueba(){

  alert("cambio");
}


  function MuestraMensaje(){
      alert("ehh funciona!!!");
      console.log("ehh funciona!!");
  }



  function Pruebadeshabilita(){



     $$('#miboton').attr('class','col button button-fill');
     

  }


  $$(document).on('page:init', '.page[data-name="login"]', function (e) {



    
    $$('#texto-login').html('Si ');

    getPiezas();


    var db = openDatabase('soccer','1.0','Jugadores',2 * 1024 * 1024);


    db.transaction(function (tx){
         tx.executeSql('CREATE TABLE IF NOT EXISTS JUGADORES (id,nombre,apellidos)');
         
    },function(err){

         console.log(err);
    });



    db.transaction(function (tx){
      tx.executeSql('INSERT INTO JUGADORES (id,nombre,apellidos) VALUES(1,"Joaquin","Garcia")');

    },function (err){
         console.log('Error al insertar');
    });



    db.transaction(function (tx){
       
      var sql = 'SELECT * FROM JUGADORES WHERE id = 1';

      tx.executeSql(sql,[],function(tx,results){
                     
           var registros = results.rows.length, i;
          
           for(i=0; i<registros; i++){

               console.log(results.rows.item(i).nombre);

           }


      });

    });

    

    var calendarDefault = app7.calendar.create({
      inputEl: '#demo-calendar-default',
    });
    
          
  
  });



  $$(document).on('page:init', '.page[data-name="home"]', function (e) {



    
     //app7.panel.enableSwipe('left');



     

     getSlider();

     getInmuebles();

  });


  $$(document).on('page:init', '.page[data-name="inmueble"]', function (e) {

  

    app7.preloader.show('blue');
    

    app7.request({
      url: 'http://eleadex.online/team/api/inmueble.php',
      data:{id:idinmueble},
      method:'POST',
      crossDomain: true,
      success:function(data){
           
        app7.preloader.hide();

        var objson = JSON.parse(data);

        var inmueble= "";


        console.log(objson.data.titulo);


        $$('#titulo-inmueble').html(objson.data.titulo);
        $$('#descripcion-inmueble').html(objson.data.descripcion);
        $$('#precio-inmueble').html(objson.data.precio);


        $$('#imagen1-inmueble').html('<img src="'+objson.data.imagen1+'" width="100%"/>');

                 
      
      },
      error:function(error){

        app7.preloader.hide();
      
      }
      
      });


});





function getPiezas(){

  app7.preloader.show('blue');


  app7.request({
    url: 'http://localhost/team/api/slider.php',
    data:{},
    method:'POST',
    crossDomain: true,
    success:function(data){
         
      app7.preloader.hide();

      var objson = JSON.parse(data);

      var pieza= "";

      

      for(x in objson.data){

           console.log(objson.data[x].titulo);

           pieza = '<option value="'+objson.data[x].id+'"> '+objson.data[x].titulo+'</option>';

           $$('#piezas').append(pieza);

      }

      
    
    },
    error:function(error){

      app7.preloader.hide();
    
    }
    
    });




}



function Salvar(){

     var codigo =  $$('#piezas-1').val();
     var inspeccionadas =  $$('#piezas-inspeccionadas').val();
     var ok =  $$('#piezas-ok').val();
     



     app7.request({
      url: 'http://localhost/team/api/guardar.php',
      data:{codigo:codigo,inspe},
      method:'POST',
      crossDomain: true,
      success:function(data){
           
        app7.preloader.hide();
  
        var objson = JSON.parse(data);
  
    
  
        
  
    
  
        
      
      },
      error:function(error){
  
        app7.preloader.hide();
      
      }
      
      });
     



}


function getSlider(){

      app7.preloader.show('blue');


      app7.request({
        url: 'http://localhost/team/api/slider.php',
        data:{},
        method:'POST',
        crossDomain: true,
        success:function(data){
             
          app7.preloader.hide();
  
          var objson = JSON.parse(data);

          var slider= "";

          var swiper = app7.swiper.get('.swiper-container');
          swiper.removeAllSlides();

          for(x in objson.data){

               var slide ='<div class="swiper-slide"><img src="'+objson.data[x].imagen+'" /></div>';

               swiper.appendSlide(slide);

          }
  
          
        
        },
        error:function(error){
  
          app7.preloader.hide();
        
        }
        
        });




}



function showMenu(){

  

  app7.panel.open('left', true);

}



function ValidaUsuario(){
     

  var usuario = localStorage.getItem('usuario');

  if(usuario!=""){
    return true;
  }else{
    return false;
  }


}



function Favorito(id){


   if(ValidaUsuario()){
   

    var inmueble = id;
    var usuario = localStorage.getItem('usuario');


    app7.request({
      url: 'http://localhost/team/api/setfavorito.php',
      data:{usuario:usuario,inmueble:inmueble},
      method:'POST',
      crossDomain: true,
      success:function(resultado){
           
        var objson = JSON.parse(resultado);

        if(objson.data=="ELIMINADO"){
                //sin color f7-icons
               
                $$('#favorito-'+id).attr('class','f7-icons');

        }else{
           //color en rojo
             $$('#favorito-'+id).attr('class','f7-icons red');
        }
      
      },
      error:function(error){

     
      }
      
      });

    }else{

      alert("Es necesario registrarse");
    }


}


function getInmuebles(){


  app7.preloader.show();


  $$('#inmuebles').html("");


      app7.request({
        url: 'http://localhost/team/api/inmuebles.php',
        data:{},
        method:'POST',
        crossDomain: true,
        success:function(resultado){
             
          app7.preloader.hide();
  
          var inmuebles = JSON.parse(resultado);

          var inmueble= "";
         
          for(x in inmuebles.data){
                
                console.log(inmuebles.data[x].titulo);

                inmueble =' <div class="card demo-card-header-pic"><div style="background-image:url('+inmuebles.data[x].imagen1+')" class="card-header align-items-flex-end">'+inmuebles.data[x].titulo+'</div><div class="card-content card-content-padding"><p class="date">Posted on January 21, 2015</p><p>'+inmuebles.data[x].titulo+'</p></div><div class="card-footer"><a href="#" class="link">'+inmuebles.data[x].precio+'</a> <i class="f7-icons" id="favorito-'+inmuebles.data[x].id+'" onClick="Favorito('+inmuebles.data[x].id+')">suit_heart</i> <a href="javascript:verinmueble('+inmuebles.data[x].id+')" class="link">Ver más</a></div></div>';

                $$('#inmuebles').append(inmueble);

          }
  
          
        
        },
        error:function(error){
  

          app7.preloader.hide();
        
        }
        
        });


}



function verinmueble(id){

      //alert(id);


      idinmueble = id;

      mainView.router.navigate('/inmueble/',{animate:true});



}








function cambiaVista(){

  
}


  


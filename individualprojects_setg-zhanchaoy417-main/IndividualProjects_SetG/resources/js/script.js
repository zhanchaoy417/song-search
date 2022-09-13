// choose the Architecture 2: An axios call is made to the API (server.js)
// modify the server.js instead of script.js 
// below it just sample  AJAX call but no used for the project
function apiCall(){
    $(document).ready(function() {
console.log("test");
    var title = document.getElementById('photo').value;
    var per_page=document.getElementById('number_of_photo').value;
    $.ajax({url:url, type: "GET", dataType:"json"})
    
    
    .then(function(data) {
        console.log(data);
        console.log("Image title: " +data.current.title );
        var gallory=data.photos.photo;
         var card='';
       

         data.forEach(function(i){
             console.log(i); 
        
             card+='<div class="card" style="width: 18rem;"><div class="card-body"><p>'+i.title+'</p><img src='+i.url.sq+' width="250"><h4 class="card-title">' ;
             card.appendTo("myapp.html");
         })
    
  }).catch(error => {
    console.log(error)})





})// end
}
var number=0; 
function init() {
    var user_email = '';
    var menu = document.getElementById('dynamic-menu');
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            user_email = user.email;
            menu.innerHTML = "<span class='dropdown-item'>" +"<a href='userpage.html'>" + user.email+"</a>"  + "</span><span class='dropdown-item' id='logout-btn'>Logout</span>";
            var btnlogout = document.getElementById('logout-btn');
            btnlogout.addEventListener('click', async function () {
                firebase.auth().signOut().then(function() {
                    alert("log out success");
                  }, function(error) {
                    alert("log out error");
                  });
               
            });
        } else {
            menu.innerHTML = "<a class='dropdown-item' href='signin.html'>Login</a>";
           
        }
    });
}
window.onload = function () {
    init();
};


function changeboard(i)
{
    console.log(newobject[i]);
    window.location.href="happy_comment.html?"+i;
}


function initApp() {
    var txtEmail = document.getElementById('inputEmail');
    var txtPassword = document.getElementById('inputPassword');
    var btnLogin = document.getElementById('btnLogin');
    var btnGoogle = document.getElementById('btngoogle');
    var btnSignUp = document.getElementById('btnSignUp');

    btnLogin.addEventListener('click', function () {
        const email = txtEmail.value;
        const pass =txtPassword.value;
        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(email,pass);
        Promise.all([email, pass, auth,promise])
        .then(values => {
         window.location='./index.html'; // print nothing
        })
        .catch(e =>{create_alert("error",e.code); txtEmail.value = ''; txtPassword.value='';});
        

    });

    btnGoogle.addEventListener('click', function () {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            var token = result.credential.accessToken;
            var user = result.user;
            console.log("1");

            window.location.assign("index.html");
            }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.log("0");
            window.location.assign("index.html");
            });
           

            
    });


    btnSignUp.addEventListener('click', function () {        
        const email = txtEmail.value;
        const pass =txtPassword.value;
        const auth = firebase.auth();
        const promise = auth.createUserWithEmailAndPassword(email,pass);
        Promise.all([email, pass, auth,promise])
        .then(values => {
            create_alert("success","sign up success"); // print nothing
            txtEmail.value = ''; 
            txtPassword.value='';
        })
        .catch(e =>{
            create_alert("error","sign up failed"); txtEmail.value = ''; txtPassword.value='';
        });
        
    });
}

// Custom alert
function create_alert(type, message) {
    var alertarea = document.getElementById('custom-alert');
    if (type == "success") {
        str_html = "<div class='alert alert-success alert-dismissible fade show' role='alert'><strong>Success! </strong>" + message + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";
        alertarea.innerHTML = str_html;
    } else if (type == "error") {
        str_html = "<div class='alert alert-danger alert-dismissible fade show' role='alert'><strong>Error! </strong>" + message + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";
        alertarea.innerHTML = str_html;
    }
}

window.onload = function () {
    initApp();
};
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
            document.getElementById('post_list').innerHTML = "";
        }
    });


    
    var str_before_username_post = "<div class='my-3 p-5 bg-white rounded box-shadow'><h6 class='border-bottom border-black pb-2 mb-0'>";
    var blank="<br><h6 class='border-bottom border-gray pb-2 mb-0'>"
    var str_after_content_post_happy = `</h6><strong class='d-block text-gray-dark'></p><button type='button' id='see_more' class='btn btn-sm float-right' onclick="removehappy('`;
    var str_after_content_post_angry = `</h6><strong class='d-block text-gray-dark'></p><button type='button' id='see_more' class='btn btn-sm float-right' onclick="removeangry('`;
    var str_after_content_post_cry = `</h6><strong class='d-block text-gray-dark'></p><button type='button' id='see_more' class='btn btn-sm float-right' onclick="removecry('`;
    var str_after_content_post_funny = `</h6><strong class='d-block text-gray-dark'></p><button type='button' id='see_more' class='btn btn-sm float-right' onclick="removefunny('`;
    
    var button = `')">Delete Article</button></div></div>\n`;
    var total_post = [];

    var happy = firebase.database().ref('happy_list');
    var angry = firebase.database().ref('angry_list');
    var cry = firebase.database().ref('cry_list');
    var funny = firebase.database().ref('funny_list');
    
    
    happy.once('value')
        .then(function (snapshot) {
          
            var object=snapshot.val();
            for (var key in object)
            {
                    total_post.push(object[key]);
                    if(object[key].username==user_email)
                    {
                        console.log("same");
                        document.getElementById('post_list1').innerHTML += str_before_username_post + object[key].title + blank+"</strong>" + object[key].username +blank+"</strong><br>" +object[key].text + str_after_content_post_happy+key+button;
                    }
                    console.log("great");
            }

            happy.on('value',function(snapshot)
            {
                //post.value='';
                document.getElementById('post_list1').innerHTML='';
                total_post  =[];
                newobject=snapshot.val();
                for (var key in newobject)
                {
                        
                        console.log(newobject[key]);
                        total_post.push(newobject[key]);
                        if(newobject[key].username==user_email)
                        {
                            document.getElementById('post_list1').innerHTML += str_before_username_post + newobject[key].title + blank+"</strong>" + newobject[key].username +blank+"</strong><br>" +newobject[key].text + str_after_content_post_happy+key+button;
                        }
                }
            })
        })
        .catch((error) => console.log(error.message));

        angry.once('value')
        .then(function (snapshot) {
          
            var object=snapshot.val();
            for (var key in object)
            {
                    total_post.push(object[key]);
                    if(object[key].username==user_email)
                    {
                        console.log("same");
                        document.getElementById('post_list2').innerHTML += str_before_username_post + object[key].title + blank+"</strong>" + object[key].username +blank+"</strong><br>" +object[key].text + str_after_content_post_angry+key+button;
                    }
                    console.log("great");
            }

            angry.on('value',function(snapshot)
            {
                //post.value='';
                document.getElementById('post_list2').innerHTML='';
                total_post  =[];
                newobject=snapshot.val();
                for (var key in newobject)
                {
                        
                        console.log(newobject[key]);
                        total_post.push(newobject[key]);
                        if(newobject[key].username==user_email)
                        {
                            document.getElementById('post_list2').innerHTML += str_before_username_post + newobject[key].title + blank+"</strong>" + newobject[key].username +blank+"</strong><br>" +newobject[key].text + str_after_content_post_angry+key+button;
                        }
                }
            })
        })
        .catch((error) => console.log(error.message));
        cry.once('value')
        .then(function (snapshot) {
          
            var object=snapshot.val();
            for (var key in object)
            {
                    total_post.push(object[key]);
                    if(object[key].username==user_email)
                    {
                        console.log("same");
                        document.getElementById('post_list3').innerHTML += str_before_username_post + object[key].title + blank+"</strong>" + object[key].username +blank+"</strong><br>" +object[key].text + str_after_content_post_cry+key+button;
                    }
                    console.log("great");
            }

            cry.on('value',function(snapshot)
            {
                //post.value='';
                document.getElementById('post_list3').innerHTML='';
                total_post  =[];
                newobject=snapshot.val();
                for (var key in newobject)
                {
                        
                        console.log(newobject[key]);
                        total_post.push(newobject[key]);
                        if(newobject[key].username==user_email)
                        {
                            document.getElementById('post_list3').innerHTML += str_before_username_post + newobject[key].title + blank+"</strong>" + newobject[key].username +blank+"</strong><br>" +newobject[key].text + str_after_content_post_cry+key+button;
                        }
                }
            })
        })
        .catch((error) => console.log(error.message));
        funny.once('value')
        .then(function (snapshot) {
          
            var object=snapshot.val();
            for (var key in object)
            {
                    total_post.push(object[key]);
                    if(object[key].username==user_email)
                    {
                        console.log("same");
                        document.getElementById('post_list4').innerHTML += str_before_username_post + object[key].title + blank+"</strong>" + object[key].username +blank+"</strong><br>" +object[key].text + str_after_content_post_funny+key+button;
                    }
                    console.log("great");
            }

            funny.on('value',function(snapshot)
            {
                //post.value='';
                document.getElementById('post_list4').innerHTML='';
                total_post  =[];
                newobject=snapshot.val();
                for (var key in newobject)
                {
                        
                        console.log(newobject[key]);
                        total_post.push(newobject[key]);
                        if(newobject[key].username==user_email)
                        {
                            document.getElementById('post_list4').innerHTML += str_before_username_post + newobject[key].title + blank+"</strong>" + newobject[key].username +blank+"</strong><br>" +newobject[key].text + str_after_content_post_funny+key+button;
                        }
                }
            })
        })
        .catch((error) => console.log(error.message));
}

var newobject = {};

function removehappy(i)
{
    var adaRef = firebase.database().ref('happy_list/'+i);
    adaRef.remove();
}
function removeangry(i)
{
    var adaRef = firebase.database().ref('angry_list/'+i);
    adaRef.remove();
}
function removecry(i)
{
    var adaRef = firebase.database().ref('cry_list/'+i);
    adaRef.remove();
}
function removefunny(i)
{
    var adaRef = firebase.database().ref('funny_list/'+i);
    adaRef.remove();
}
window.onload = function () {
    init();
};



        
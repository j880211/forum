
var url = location.href;  
//取得問號之後的值\console.log(temp)
console.log(url);
var question = url.split("?");
var temp=question[1];
var number =0;
console.log(temp);
   
function htmlspecialchars(ch) {
    if (ch===null) return '';
    ch = ch.replace(/&/g,"&amp;");
    ch = ch.replace(/\"/g,"&quot;");
    ch = ch.replace(/\'/g,"&#039;");
    ch = ch.replace(/</g,"&lt;");
    ch = ch.replace(/>/g,"&gt;");
    return ch;
}
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
            document.getElementById('comment_list').innerHTML="";
        }
    });

    post_btn = document.getElementById('post_btn');
    post_txt = document.getElementById('comment');
    

    
    post_btn.addEventListener('click', function () {
        if (post_txt.value != "") {
                firebase.database().ref('funny_list'+ temp.toString()).push({
                    username : htmlspecialchars(user_email),
                    text : htmlspecialchars(post_txt.value)
                });
                post_txt.value='';
        }
    });

    var postdata=firebase.database().ref('funny_list');
    var postsRef = firebase.database().ref('funny_list'+ temp.toString());    
    var str_before_username_post = "<div class='my-4 p-5 bg-white rounded box-shadow'><h2 class='border-bottom border-black pb-3 mb-0'>"
    var str_after_content_post = "</h6><strong class='d-block text-gray-dark'></p>";
    var str_before_username_post_d = "<h6 class='border-bottom border-black pb-3 mb-0'>"
    var str_after_content_post_d = "</h6><strong class='d-block text-gray-dark'></p>"; 
    
    var blank="<h6 class='border-bottom border-gray pb-2 mb-0'>"
    var total_post = [];

    postdata.once('value')
        .then(function (snapshot) {
            
            var object=snapshot.val();

            for (var key in object)
            {
                    if(key==temp)
                    {
                        console.log(object[key]);
                        console.log(key);
                        total_post.push(object[key]);
                        document.getElementById('post_list').innerHTML += str_before_username_post + object[key].title + blank+"</strong>" + object[key].username +blank+"</strong><br>" +object[key].text + str_after_content_post;
                    }
            }

            postdata.on('value',function(snapshot)
            {
                //post.value='';
                document.getElementById('post_list').innerHTML='';
                total_post  =[];
                var newobject=snapshot.val();
                for (var key in newobject)
                {
                       if(key==temp)
                       {
                        console.log(newobject[key]);
                        total_post.push(newobject[key]);
                        document.getElementById('post_list').innerHTML += str_before_username_post + newobject[key].title + blank+"</strong>" + newobject[key].username+blank+"</strong><br>"+newobject[key].text + str_after_content_post;
                       } 
                        
                }
            })
        })
        .catch((error) => console.log(error.message));

    
    postsRef.once('value')
        .then(function (snapshot) {
           
            var object=snapshot.val();

            for (var key in object)
            {
                    console.log(object[key]);
                    console.log(key);
                    total_post.push(object[key]);
                    document.getElementById('comment_list').innerHTML += str_before_username_post_d + object[key].username +blank+"</strong>" + object[key].text + str_after_content_post_d;

            }

            postsRef.on('value',function(snapshot)
            {
                //post.value='';
                document.getElementById('comment_list').innerHTML='';
                total_post  =[];
                var newobject=snapshot.val();
                for (var key in newobject)
                {
                        
                        console.log(newobject[key]);
                        total_post.push(newobject[key]);
                        document.getElementById('comment_list').innerHTML += str_before_username_post_d + newobject[key].username+blank+"</strong>" + newobject[key].text + str_after_content_post_d;
                }
            })
        })
        .catch((error) => console.log(error.message));
}

window.onload = function () {
    init();
};
        
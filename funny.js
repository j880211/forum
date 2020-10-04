var number=0; 
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
        // Check user login
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

    post_btn = document.getElementById('post_btn');
    post_title=document.getElementById('title');
    post_txt = document.getElementById('comment');
    
    
    post_btn.addEventListener('click', function () {
        if (post_txt.value != "") {
                firebase.database().ref('funny_list').push({
                    username : htmlspecialchars(user_email),
                    title :htmlspecialchars(post_title.value),
                    text : htmlspecialchars(post_txt.value),
               // id : firebase.database().ref('happy_list').push().key()
               
                });
                //console.log(id);
                post_title.value='';
                post_txt.value='';
        }
    });

    var str_before_username_post = "<div class='border-bottom border-black pb-2 mb-0'><h2 class='border-bottom border-black pb-2 mb-0'>";
    var blank="<h6 class='border-bottom border-gray pb-2 mb-0'>"
    var str_after_content_post = `</h2><strong class='d-block text-gray-dark'></p><button type='button' id='see_more' class='btn btn-default btn-sm' onclick="changeboard('`;
    var button = `')">See more</button><br><br></div></div>\n`;

    var postsRef = firebase.database().ref('funny_list');
    var total_post = [];

    postsRef.once('value')
        .then(function (snapshot) {
           
            var object=snapshot.val();

            for (var key in object)
            {
                    console.log(object[key]);
                    console.log(key);
                    total_post.push(object[key]);
                    document.getElementById('post_list').innerHTML += str_before_username_post + object[key].title + blank+"</strong>" + object[key].username + str_after_content_post + key +button;

            }

            postsRef.on('value',function(snapshot)
            {
                //post.value='';
                document.getElementById('post_list').innerHTML='';
                total_post  =[];
                newobject=snapshot.val();
                for (var key in newobject)
                {
                        
                        console.log(newobject[key]);
                        total_post.push(newobject[key]);
                        document.getElementById('post_list').innerHTML += str_before_username_post + newobject[key].title + blank+"</strong>" + newobject[key].username + str_after_content_post + key +button
                }
            })
        })
        .catch((error) => console.log(error.message));

        var notification=document.getElementById('notification');
        notification.addEventListener('click', function(e){
            e.preventDefault();
            isNotify=1;
            if(!window.Notification){
                console.log('Not supported');
            }
            else{
                Notification.requestPermission().then(function(p){
                    if(p=='denied'){
                        console.log('You denied to show notification');
                    }
                    else if(p=='granted'){
                        console.log('You allowed to show notification');
                    }
                })
            }
        })

        var funny=firebase.database().ref('funny_list');
        funny.on('child_added', function(data){
            if(isNotify){
                isNotify=-1;
                if(Notification.permission!='default'){
                    var notify;
                    notify=new Notification('New topic from Funny', {
                        'User: ':data.val().email,
                        'shares: ':data.val().title,
                        'says: ':data.val().data
                    })
                    
                    notify.onclick=function(){
                        console.log('onclick');
                    }
                }
                else{
                    console.log('Please allow the notification first');
                }
            }
        })
}
var newobject = {};
window.onload = function () {
    init();
};


function changeboard(i)
{
    console.log(newobject[i]);
    window.location.href="funny_comment.html?"+i;
}


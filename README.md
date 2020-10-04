# Software Studio 2019 Spring Midterm Project

## Topic
* Project Name : midterm_project_106062231
* Key functions (add/delete)
    1. function init()->在這個function會做完所有登入 登出 註冊 推送資料 顯示文章的動作
* Other functions (add/delete)
    1. function htmlspecialchars(ch)
    2. function removehappy/removeangry/removecry/removefunny(i)

## Basic Components
|Component|Score|Y/N|
|:-:|:-:|:-:|
|Membership Mechanism|20%|Y|
|GitLab Page|5%|Y|
|Database|15%|Y|
|RWD|15%|Y|
|Topic Key Function|15%|Y|

## Advanced Components
|Component|Score|Y/N|
|:-:|:-:|:-:|
|Third-Party Sign In|2.5%|Y|
|Chrome Notification|5%|Y|
|Use CSS Animation|2.5%|Y|
|Security Report|5%|Y|

## Website Detail Description
(1)每個頁面在一開始跑的時候，都會先確認現在是否有登入，並且可以在任一頁面做登入登出的動作
(2)點右上角Account的字樣會有兩種可能出現，當現在是登入狀態時，則可以點選你的帳號進入userpage，另外一種就是按logout登出，而當你尚未登入時，則可以按login 進行登入這個動作
(3)signin->signin 畫面會要求你輸入帳號密碼，並且有可sign up及sign in 的按鈕，並且可以使用第三方作為登入方式，而此次我選的為google
(4)index.html->此為所有板的主選單，而在此次forum中，共有四個板(angry/happy/cry/funny)，點選任一個圖像即可進入板中，也可以點選下面的SEE MORE，亦可以進入板。
(5)userpage.html->userpage中，顯示所有你發過的文章，並且可以自行刪除自己曾經新增的文章
(6)happy.html/angry.html/cry.html/funny.html->此為每個主題板，在每個主題板中，可以新增這個版的文章(內容有title/text)，當一按summit button時，在init()中有addEventlistner去偵測，並且在按summit之後就推送到firebase中，而在頁面中顯示的文章為按照summit article的先後順序(post_list page)，而post_list page並不會顯示其文章內容，只會顯示title 及 發文者帳號，並須按see more下面那個button 才能進入另外一個頁面觀看其文章內容及觀看其文章的留言
(7)happy_comment.html/angry_comment.html/cry_comment.html/funny_comment.html->在comment這個頁面中，其顯示的內容為文章內容及其留言，並且可以在此頁面新增對此文章的新留言

# 作品網址： https://midterm-project-106062231.firebaseapp.com

# Components Description : 
1. css animation->
   (1)在index.html中，當移到img上時，那個img即會被放大顯示
   (2)在happy.html/happy_comment.html中，每個板上的寶寶頭像會一直從左到右移動
2. Chrome notification->
   (1)右上角的小鈴鐺會在第一次按的時候，彈出是否接受chrome notification的訊息，一旦按接受，即可在每次各板發新文章的時候接收到通知
3. Sign Up/In with Google or other third-party accounts->使用google帳號亦可登入
4. RWD->不管在哪一個頁面，頁面中的內容都可以跟隨著頁面縮放，而顯示依然正常
5. Database read/write->使用push將所有新增的資料push進database中，並且用once and on 
   (使用object[key])此種方式去讀取database中的資料
6. Host on your Firebase page->所新增的資料或刪除的資料都可在firebase中正確顯示
7. Membership Mechanism -> 可以正確地登入登出及註冊
8. Topic Key Functions -> 在website detail description 提及

# Other Functions Description(1~10%) : 
  1. function htmlspecialchars(ch):
     將輸入進去的string做replace這個動作，以防在使用者輸入html的語法時，它會自動把幫你轉換成html的東西，而無法顯示你所輸入的text
  2. function removehappy/removeangry/removecry/removefunny(i)
     在userpage中，我所做的是顯示你所有曾經發過的article，並做成一個列表，而其中此列表中的右下角有一個delete 的button，此button只要一按下去，就會呼叫removehappy()這類function，並且在這些function中會進行去database data.remove()這個動作，讓這篇文章被刪除
  3. userpage顯示自己所有過去發過且尚未被刪除的文章
     在userpage中，顯示你所有曾經發過的article，此做法為去每個像happy_list中這樣的database節點，並且用一個判斷式去判斷那個板下的所有文章的發文者與現在的使用者是否相同，一旦相同，及把文章顯示出來，反之則不顯示文章

## Security Report (Optional)
  1. 並不是在每篇文章旁都可以刪除文章，只有在自己的userpage才能刪除文章，如此可以避免別人刪除你文章
     的狀況發生
  2. 當你輸入html語法時，它會自動把幫你轉換成html的東西，有時候可能會造成使用者可以直接破壞你的網
     頁，因此先將有可能被當成html語法的符號進行轉換的動作，如此就算在輸入語法時，它呈現的也只是文字本身，而不會轉換成html語法所呈現的東西
  3.在database.rules.json中讓read 跟 write從true 改成"auth!=null"，確保一定要在登入狀態時才能發
     文章及留言
![alt text](example.gif)


## Goal

1. Fork this repo to your account, remove fork relationship and change project visibility to public
2. Complete the simple forum
    * Trace code (.html, .js, database.rulse.json)
        * Basic Firebase usage
        * Change config.js to yours
        * Implement google and email login function
        * Realtime update database
        * Setting the rules for database read/write
    * **Finish 8 TODOs in config.js, index.js, signin.js, database.rulse.json**
3. Commit changes, and deploy to GitLab page.

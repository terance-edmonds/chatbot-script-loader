function checkConnection() {
    if(document.getElementById('chatbot__container-wrapper') != null){
        if(navigator.onLine ){
            document.getElementById('chatbot__container-wrapper').style.visibility = 'visible'
        }
        else{
            document.getElementById('chatbot__container-wrapper').style.visibility = 'hidden'
        }
    }
}

window.addEventListener('online', checkConnection)
window.addEventListener('offline', checkConnection)

//keep scrolled to bottom
function scrollDown() {
    var chatbotContainer = document.getElementById("chatbot__message-container");
    chatbotContainer.scrollTop = chatbotContainer.scrollHeight;   
}

function handleInput() {
    let input = document.getElementById('chatbot__input').value;
    let container = document.getElementById('chatbot__message-container')

    if(input != ''){
        container.innerHTML += `<p class="chatbot__query chatbot__message">${input}</p>`;
        document.getElementById('chatbot__input').value = '';

        scrollDown();
 
            fetch("http://localhost:4000/api/chatbot", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: input
                }),
            })
            .then(response => response.json())
            .then(data => {
                container.innerHTML += `<p class="chatbot__response chatbot__message">${data.response}</p>`;
                scrollDown();
            })
    }
}

function handleChatbot() {
    let container = document.getElementById('chatbot__container')
    let textbox = document.getElementById('chatbot__input')

    if(container.style.transform == 'scale(0)' || container.style.transform == ''){
        container.style.transform = 'scale(1)'
        container.style.borderRadius = '7px'
        container.style.opacity = '1'
        textbox.select();
    }
    else{
        container.style.transform = 'scale(0)'
        container.style.borderRadius = '50%'
        container.style.opacity = '0'
    }
}

function addChatbotCss(){
/*     let head  = document.getElementsByTagName('head')[0];
    let link  = document.createElement('link');
    link.id   = 'chatbot__cssId';
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = './chatbot__style.css';
    link.media = 'all';
    head.appendChild(link); */

    document.head.innerHTML += `
        <style id="chatbot__style.css">
            #chatbot__container-wrapper{
                position: absolute;
                bottom: 2vh;
                right: 2vw;
                display: flex;
                align-items: baseline;
                max-width: max-content;
                z-index: 100;
            }
            
            #chatbot__icon{
                width: 60px;
                height: 60px;
                cursor: pointer;
                transition: all 0.3s ease;
                    -webkit-animation: chatbot-heartbeat 4s ease-in-out infinite both;
                        animation: chatbot-heartbeat 4s ease-in-out infinite both;
            }
            
            @-webkit-keyframes chatbot-heartbeat {
                from {
                -webkit-transform: scale(1);
                        transform: scale(1);
                -webkit-transform-origin: center center;
                        transform-origin: center center;
                -webkit-animation-timing-function: ease-out;
                        animation-timing-function: ease-out;
                }
                10% {
                -webkit-transform: scale(0.91);
                        transform: scale(0.91);
                -webkit-animation-timing-function: ease-in;
                        animation-timing-function: ease-in;
                }
                17% {
                -webkit-transform: scale(0.98);
                        transform: scale(0.98);
                -webkit-animation-timing-function: ease-out;
                        animation-timing-function: ease-out;
                }
                33% {
                -webkit-transform: scale(0.87);
                        transform: scale(0.87);
                -webkit-animation-timing-function: ease-in;
                        animation-timing-function: ease-in;
                }
                45% {
                -webkit-transform: scale(1);
                        transform: scale(1);
                -webkit-animation-timing-function: ease-out;
                        animation-timing-function: ease-out;
                }
            }
            @keyframes chatbot-heartbeat {
                from {
                -webkit-transform: scale(1);
                        transform: scale(1);
                -webkit-transform-origin: center center;
                        transform-origin: center center;
                -webkit-animation-timing-function: ease-out;
                        animation-timing-function: ease-out;
                }
                10% {
                -webkit-transform: scale(0.91);
                        transform: scale(0.91);
                -webkit-animation-timing-function: ease-in;
                        animation-timing-function: ease-in;
                }
                17% {
                -webkit-transform: scale(0.98);
                        transform: scale(0.98);
                -webkit-animation-timing-function: ease-out;
                        animation-timing-function: ease-out;
                }
                33% {
                -webkit-transform: scale(0.87);
                        transform: scale(0.87);
                -webkit-animation-timing-function: ease-in;
                        animation-timing-function: ease-in;
                }
                45% {
                -webkit-transform: scale(1);
                        transform: scale(1);
                -webkit-animation-timing-function: ease-out;
                        animation-timing-function: ease-out;
                }
            }
            
            
            #chatbot__container{
                font-family:Arial, Helvetica, sans-serif;
                height: 400px;
                width: 300px;
                background: #000;
                border-radius: 7px;
                overflow-x: hidden;
                overflow-y: auto;
                transition: all 0.3s ease;
                box-sizing: border-box;
                transform-origin: right bottom;
                transform: scale(0);
                opacity: 0;
                margin-right: 10px;
            }
            
            #chatbot__message-container{
                font-family:Arial, Helvetica, sans-serif;
                position: absolute;
                height: 360px;
                width: 300px;
                background: #e6e6e6;
                border-top-right-radius: 10px;
                border-top-left-radius: 10px;
                display: flex;
                flex-direction: column;
                overflow-x: hidden;
                overflow-y: auto;
                transition: all 0.5s ease;
                box-sizing: border-box;
                padding: 10px;
                scroll-behavior: smooth;
                font-size: 0.9rem;
            }
            
            #chatbot__input{
                position: absolute;
                box-sizing: border-box;
                display: inline-block;
                word-wrap: break-word;
                left: 0;
                bottom: 0;
                width: 300px;
                max-width: 300px;
                height: 45px;
                outline: none;
                border: none;
                padding: 7px 40px 7px 7px;
                border-bottom-right-radius: 10px;
                border-bottom-left-radius: 10px;
                resize: none;
                z-index: 1;
            }
            
            #chatbot__input::-webkit-scrollbar, #chatbot__container::-webkit-scrollbar, #chatbot__message-container::-webkit-scrollbar{
                width: 0px;
            }
            
            .chatbot__message{
                display: inline-block;
                padding: 4px 12px 4px 12px;
                border-radius: 7px;
                max-width: 45%;
                word-wrap: break-word;
                overflow-anchor: auto;
            }
            
            .chatbot__message:last-child{
                -webkit-animation: chatbot-scale-in-center 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
                animation: chatbot-scale-in-center 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
            }
            
            @-webkit-keyframes chatbot-scale-in-center {
            0% {
                -webkit-transform: scale(0);
                        transform: scale(0);
                opacity: 1;
            }
            100% {
                -webkit-transform: scale(1);
                        transform: scale(1);
                opacity: 1;
            }
            }
            @keyframes chatbot-scale-in-center {
            0% {
                -webkit-transform: scale(0);
                        transform: scale(0);
                opacity: 1;
            }
            100% {
                -webkit-transform: scale(1);
                        transform: scale(1);
                opacity: 1;
            }
            }
            
            
            .chatbot__query{
                align-self: flex-end;
                color: #fff;
                background: #000;
                justify-content: flex-end;
            }
            
            .chatbot__response{
                align-self: flex-start;
                color: rgb(255, 255, 255);
                background: rgb(88, 88, 253);
                justify-content: flex-start;
            }
            
            #chatbot__send-icon{
                position: absolute;
                width: 25px;
                height: 25px;
                bottom: 10px;
                right: 5px;
                z-index: 2;
                cursor: pointer;
                transition: all 0.1s ease;
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }
            
            #chatbot__send-icon:active{
                transform: scale(0.8);
            }
        </style>
    `
}

//create the chatbot and add to the html
async function createChatbot(){
    addChatbotCss();

        //load the chatbot
         document.body.innerHTML += `    
         <div id="chatbot__container-wrapper">
             <div id="chatbot__container">
                 <div id="chatbot__message-container"></div>
     
                 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                     onclick="handleInput()"
                     id="chatbot__send-icon"
                     viewBox="0 0 171 171"
                     style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,171.99132v-171.99132h171.99132v171.99132z" fill="none"></path><g fill="#666666"><path d="M148.0575,99.6075l-102.03,51.015c-11.32875,5.62875 -24.6525,-2.63625 -24.6525,-15.2475v-28.5l88.4925,-16.60125c5.34375,-0.9975 5.34375,-8.55 0,-9.5475l-88.4925,-16.60125v-28.5c0,-12.61125 13.32375,-20.87625 24.6525,-15.2475l102.03,51.015c11.61375,5.8425 11.61375,22.3725 0,28.215z"></path><path d="M133.45838,85.5l-112.08338,34.67025v-69.3405z" opacity="0.35"></path></g></g></svg>
                     
                 <input id="chatbot__input" placeholder="type here...."/>
             </div>

            <img id="chatbot__icon" onclick="handleChatbot()" src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMnB0IiB2aWV3Qm94PSIwIC0xMSA1MTIgNTEyIiB3aWR0aD0iNTEycHQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTUwMSAyNDVjMCAxMzUuMzA4NTk0LTEwOS42OTE0MDYgMjQ1LTI0NSAyNDVzLTI0NS0xMDkuNjkxNDA2LTI0NS0yNDUgMTA5LjY5MTQwNi0yNDUgMjQ1LTI0NSAyNDUgMTA5LjY5MTQwNiAyNDUgMjQ1em0wIDAiIGZpbGw9IiMzMGQ2Y2UiLz48cGF0aCBkPSJtNDgyIDE3MGMwIDUuNTIzNDM4LTQuNDc2NTYyIDEwLTEwIDEwcy0xMC00LjQ3NjU2Mi0xMC0xMGMwLTgyLjcxMDkzOC02Ny4yODkwNjItMTUwLTE1MC0xNTBoLTExMmMtODIuNzEwOTM4IDAtMTUwIDY3LjI4OTA2Mi0xNTAgMTUwIDAgNS41MjM0MzgtNC40NzY1NjIgMTAtMTAgMTBzLTEwLTQuNDc2NTYyLTEwLTEwYzAtOTMuNzM4MjgxIDc2LjI2MTcxOS0xNzAgMTcwLTE3MGgxMTJjOTMuNzM4MjgxIDAgMTcwIDc2LjI2MTcxOSAxNzAgMTcwem0wIDAiIGZpbGw9IiMwMjVmODAiLz48cGF0aCBkPSJtNTEyIDE0Ny43NXY0MGMwIDE2LjU2NjQwNi0xMy40Mjk2ODggMzAtMzAgMzBoLTEyYzAgNC45OTIxODgtNC40NzY1NjIgOS4wNDI5NjktMTAgOS4wNDI5NjlzLTEwLTQuMDUwNzgxLTEwLTkuMDQyOTY5aC0xOGMtNS41MjM0MzggMC0xMC00LjQ3NjU2Mi0xMC0xMHYtODBjMC01LjUyMzQzOCA0LjQ3NjU2Mi0xMCAxMC0xMGgxNC45MDIzNDRsLTMuMjYxNzE5LTguOTY0ODQ0Yy0yLjgzMjAzMS03Ljc4NTE1NiAxLjE3OTY4Ny0xNi4zOTQ1MzEgOC45NjQ4NDQtMTkuMjI2NTYyIDcuNzg1MTU2LTIuODMyMDMyIDE2LjM5MDYyNSAxLjE3OTY4NyAxOS4yMjY1NjIgOC45NjQ4NDRsNi45OTYwOTQgMTkuMjI2NTYyaDMuMTcxODc1YzE2LjU3MDMxMiAwIDMwIDEzLjQzMzU5NCAzMCAzMHptLTQzMi0zMGgtMTQuOTAyMzQ0bDMuMjYxNzE5LTguOTY0ODQ0YzIuODMyMDMxLTcuNzg1MTU2LTEuMTc5Njg3LTE2LjM5NDUzMS04Ljk2NDg0NC0xOS4yMjY1NjItNy43ODUxNTYtMi44MzIwMzItMTYuMzkwNjI1IDEuMTc5Njg3LTE5LjIyNjU2MiA4Ljk2NDg0NGwtNi45OTYwOTQgMTkuMjI2NTYyaC0zLjE3MTg3NWMtMTYuNTcwMzEyIDAtMzAgMTMuNDMzNTk0LTMwIDMwdjQwYzAgMTYuNTY2NDA2IDEzLjQyOTY4OCAzMCAzMCAzMGg1MGM1LjUyMzQzOCAwIDEwLTQuNDc2NTYyIDEwLTEwdi04MGMwLTUuNTIzNDM4LTQuNDc2NTYyLTEwLTEwLTEwem0wIDAiIGZpbGw9IiNmZjY0NjYiLz48cGF0aCBkPSJtNDgyIDE0Ny43NXY0MGMwIDE2LjU2NjQwNi0xMy40Mjk2ODggMzAtMzAgMzBoLTIwYy01LjUyMzQzOCAwLTEwLTQuNDc2NTYyLTEwLTEwdi04MGMwLTUuNTIzNDM4IDQuNDc2NTYyLTEwIDEwLTEwaDIwYzE2LjU3MDMxMiAwIDMwIDEzLjQzMzU5NCAzMCAzMHptLTQ1MiA0MHYtNDBjMC0xMi4zODY3MTkgNy41MTE3MTktMjMuMDE1NjI1IDE4LjIyNjU2Mi0yNy41OTM3NS40NjQ4NDQtLjE5NTMxMi43NzM0MzgtLjY0NDUzMS43NzM0MzgtMS4xNDg0MzggMC0uNjk1MzEyLS41NjI1LTEuMjU3ODEyLTEuMjUzOTA2LTEuMjU3ODEyaC0xNy43NDYwOTRjLTE2LjU3MDMxMiAwLTMwIDEzLjQzMzU5NC0zMCAzMHY0MGMwIDE2LjU3MDMxMiAxMy40Mjk2ODggMzAgMzAgMzBoMzBjLTE2LjU3MDMxMiAwLTMwLTEzLjQzMzU5NC0zMC0zMHptMCAwIiBmaWxsPSIjZmYzOTNhIi8+PHBhdGggZD0ibTI4NiAzMjguNzVjMCAyMi4wODk4NDQtMTMuNDI5Njg4IDQwLTMwIDQwcy0zMC0xNy45MTAxNTYtMzAtNDAgMTMuNDI5Njg4LTQwIDMwLTQwIDMwIDE3LjkxMDE1NiAzMCA0MHptMCAwIiBmaWxsPSIjMDA2OWEzIi8+PHBhdGggZD0ibTI4NiAzMjguNzVjMCAxNi40MDIzNDQtNy40MDYyNSAzMC40ODgyODEtMTggMzYuNjYwMTU2LTEwLjU5Mzc1LTYuMTcxODc1LTE4LTIwLjI1NzgxMi0xOC0zNi42NjAxNTZzNy40MDYyNS0zMC40ODgyODEgMTgtMzYuNjYwMTU2YzEwLjU5Mzc1IDYuMTcxODc1IDE4IDIwLjI1NzgxMiAxOCAzNi42NjAxNTZ6bTAgMCIgZmlsbD0iIzA4YyIvPjxwYXRoIGQ9Im00NDcgMTczLjc1YzAgNzcuMzIwMzEyLTYyLjY3OTY4OCAxNDAtMTQwIDE0MGgtMTAyYy03Ny4zMjAzMTIgMC0xNDAtNjIuNjc5Njg4LTE0MC0xNDBzNjIuNjc5Njg4LTE0MCAxNDAtMTQwaDEwMmM3Ny4zMjAzMTIgMCAxNDAgNjIuNjc5Njg4IDE0MCAxNDB6bS0xMzUgMTYwaC0xMTJjLTU0LjQ4MDQ2OSAwLTEwMS42ODM1OTQgMzEuMTIxMDk0LTEyNC44MjAzMTIgNzYuNTU4NTk0IDQ0Ljc5Njg3NCA0OC45Njg3NSAxMDkuMjE4NzUgNzkuNjkxNDA2IDE4MC44MjAzMTIgNzkuNjkxNDA2czEzNi4wMjM0MzgtMzAuNzIyNjU2IDE4MC44MjAzMTItNzkuNjkxNDA2Yy0yMy4xMzY3MTgtNDUuNDM3NS03MC4zMzk4NDMtNzYuNTU4NTk0LTEyNC44MjAzMTItNzYuNTU4NTk0em0wIDAiIGZpbGw9IiM5N2YwZjIiLz48cGF0aCBkPSJtMzA3IDMxMy43NWgtNjMuMDE5NTMxYy03Ny4zMjAzMTMgMC0xNDAtNjIuNjc5Njg4LTE0MC0xNDBzNjIuNjc5Njg3LTE0MCAxNDAtMTQwaDYzLjAxOTUzMWM3Ny4zMjAzMTIgMCAxNDAgNjIuNjc5Njg4IDE0MCAxNDBzLTYyLjY3OTY4OCAxNDAtMTQwIDE0MHptLTUxIDE3Ni4yNWM3MS42MDE1NjIgMCAxMzYuMDIzNDM4LTMwLjcyMjY1NiAxODAuODIwMzEyLTc5LjY5MTQwNi0yMy4xMzY3MTgtNDUuNDM3NS03MC4zMzk4NDMtNzYuNTU4NTk0LTEyNC44MjAzMTItNzYuNTU4NTk0aC03MmMtNjQuODU5Mzc1IDAtMTE5LjQwMjM0NCA0NC4xMDU0NjktMTM1LjMwMDc4MSAxMDMuOTYwOTM4IDQxLjY1NjI1IDMyLjc1MzkwNiA5NC4xOTkyMTkgNTIuMjg5MDYyIDE1MS4zMDA3ODEgNTIuMjg5MDYyem0wIDAiIGZpbGw9IiNjMGZiZmYiLz48cGF0aCBkPSJtMzQ2IDQ0NGMwIDEwLjkxMDE1Ni0xLjk0NTMxMiAyMS4zNTkzNzUtNS41MDM5MDYgMzEuMDM1MTU2LTI2LjMzOTg0NCA5LjY3OTY4OC01NC44MDA3ODIgMTMuOTY0ODQ0LTg0LjQ5NjA5NCAxMy45NjQ4NDRzLTU4LjE1NjI1LTQuMjg1MTU2LTg0LjQ5NjA5NC0xMy45NjQ4NDRjLTMuNTU4NTk0LTkuNjc1NzgxLTUuNTAzOTA2LTIwLjEyNS01LjUwMzkwNi0zMS4wMzUxNTYgMC00OS43MDcwMzEgNDAuMjkyOTY5LTkwIDkwLTkwczkwIDQwLjI5Mjk2OSA5MCA5MHptMCAwIiBmaWxsPSIjMDhjIi8+PHBhdGggZD0ibTMyMiAyNTguNzVoLTEzMmMtMzguNjYwMTU2IDAtNzAtMzEuMzM5ODQ0LTcwLTcwdi0zMGMwLTM4LjY2MDE1NiAzMS4zMzk4NDQtNzAgNzAtNzBoMTMyYzM4LjY2MDE1NiAwIDcwIDMxLjMzOTg0NCA3MCA3MHYzMGMwIDM4LjY2MDE1Ni0zMS4zMzk4NDQgNzAtNzAgNzB6bS05Ni45ODQzNzUgMjA3Ljg4MjgxMmMtMjEuMDcwMzEzLTQuNjk5MjE4LTM2LjQyMTg3NS0yMy4xNDg0MzctMzYuNTE1NjI1LTQ0LjczODI4MSAwLS4xMzI4MTIgMC0uMjYxNzE5IDAtLjM5NDUzMSAwLTE5LjEwNTQ2OSA1Ljk1NzAzMS0zNi44MTY0MDYgMTYuMTA5Mzc1LTUxLjM5MDYyNS0yMy4zMzU5MzcgMTYuMjYxNzE5LTM4LjYwOTM3NSA0My4yODkwNjMtMzguNjA5Mzc1IDczLjg5MDYyNSAwIDEwLjkxMDE1NiAxLjk0NTMxMiAyMS4zNTkzNzUgNS41MDM5MDYgMzEuMDM1MTU2IDI2LjMzOTg0NCA5LjY3OTY4OCA1NC44MDA3ODIgMTQuOTY0ODQ0IDg0LjQ5NjA5NCAxNC45NjQ4NDQgMjkuNjg3NSAwIDU4LjEzNjcxOS01LjI4MTI1IDg0LjQ2ODc1LTE0Ljk1MzEyNSAxLjM1NTQ2OS0zLjY5MTQwNiAyLjUtNy40ODQzNzUgMy4zNzEwOTQtMTEuMzg2NzE5LTIwLjgwNDY4OCA1Ljc1LTQyLjcwNzAzMiA4LjgzOTg0NC02NS4zMzk4NDQgOC44Mzk4NDQtMTguMzcxMDk0IDAtMzYuMjY5NTMxLTIuMDI3MzQ0LTUzLjQ4NDM3NS01Ljg2NzE4OHptMCAwIiBmaWxsPSIjMDA2Y2JjIi8+PHBhdGggZD0ibTMyMiAyNTguNzVoLTEwMmMtMzguNjYwMTU2IDAtNzAtMzEuMzM5ODQ0LTcwLTcwdi0zMGMwLTM4LjY2MDE1NiAzMS4zMzk4NDQtNzAgNzAtNzBoMTAyYzM4LjY2MDE1NiAwIDcwIDMxLjMzOTg0NCA3MCA3MHYzMGMwIDM4LjY2MDE1Ni0zMS4zMzk4NDQgNzAtNzAgNzB6bTAgMCIgZmlsbD0iIzA4YyIvPjxwYXRoIGQ9Im0yODQuMjg1MTU2IDIwMS45Mjk2ODhjMy45MDYyNSAzLjkwNjI1IDMuOTA2MjUgMTAuMjM0Mzc0IDAgMTQuMTQwNjI0LTE1LjU5NzY1NiAxNS41OTc2NTctNDAuOTcyNjU2IDE1LjU5NzY1Ny01Ni41NzAzMTIgMC0zLjkwMjM0NC0zLjkwMjM0My0zLjkwMjM0NC0xMC4yMzQzNzQgMC0xNC4xNDA2MjQgMy45MDYyNS0zLjkwNjI1IDEwLjIzODI4MS0zLjkwNjI1IDE0LjE0NDUzMSAwIDcuNzk2ODc1IDcuNzk2ODc0IDIwLjQ4NDM3NSA3Ljc5Njg3NCAyOC4yODUxNTYgMCAxLjk1MzEyNS0xLjk1MzEyNiA0LjUxMTcxOS0yLjkyOTY4OCA3LjA3MDMxMy0yLjkyOTY4OHM1LjExNzE4Ny45NzY1NjIgNy4wNzAzMTIgMi45Mjk2ODh6bS01OC4xMDU0NjgtNjEuMjM0Mzc2Yy0xNS41OTc2NTctMTUuNTkzNzUtNDAuOTc2NTYzLTE1LjU5Mzc1LTU2LjU3MDMxMyAwLTMuOTA2MjUgMy45MDYyNS0zLjkwNjI1IDEwLjIzODI4MiAwIDE0LjE0NDUzMiAzLjkwNjI1IDMuOTAyMzQ0IDEwLjIzODI4MSAzLjkwMjM0NCAxNC4xNDQ1MzEgMCA3Ljc5Njg3NS03LjgwMDc4MiAyMC40ODQzNzUtNy44MDA3ODIgMjguMjgxMjUgMCAxLjk1MzEyNSAxLjk1MzEyNSA0LjUxMTcxOSAyLjkyOTY4NyA3LjA3MDMxMyAyLjkyOTY4NyAyLjU1ODU5MyAwIDUuMTIxMDkzLS45NzY1NjIgNy4wNzQyMTktMi45Mjk2ODcgMy45MDIzNDMtMy45MDYyNSAzLjkwMjM0My0xMC4yMzgyODIgMC0xNC4xNDQ1MzJ6bTExNi4yMTA5MzcgMGMtMTUuNTk3NjU2LTE1LjU5Mzc1LTQwLjk3MjY1Ni0xNS41OTM3NS01Ni41NzAzMTMgMC0zLjkwMjM0MyAzLjkwNjI1LTMuOTAyMzQzIDEwLjIzODI4MiAwIDE0LjE0NDUzMiAzLjkwNjI1IDMuOTAyMzQ0IDEwLjIzODI4MiAzLjkwMjM0NCAxNC4xNDQ1MzIgMCA3Ljc5Njg3NS03LjgwMDc4MiAyMC40ODQzNzUtNy44MDA3ODIgMjguMjg1MTU2IDAgMS45NTMxMjUgMS45NTMxMjUgNC41MTE3MTkgMi45Mjk2ODcgNy4wNzAzMTIgMi45Mjk2ODcgMi41NTg1OTQgMCA1LjExNzE4OC0uOTc2NTYyIDcuMDcwMzEzLTIuOTI5Njg3IDMuOTA2MjUtMy45MDYyNSAzLjkwNjI1LTEwLjIzODI4MiAwLTE0LjE0NDUzMnptMCAwIiBmaWxsPSIjMzBkNmNlIi8+PHBhdGggZD0ibTI3MSA0Mzd2NTIuNTQ2ODc1Yy00Ljk2NDg0NC4zMDA3ODEtOS45NjA5MzguNDUzMTI1LTE1IC40NTMxMjVzLTEwLjAzNTE1Ni0uMTUyMzQ0LTE1LS40NTMxMjV2LTUyLjU0Njg3NWMwLTguMjg1MTU2IDYuNzE0ODQ0LTE1IDE1LTE1czE1IDYuNzE0ODQ0IDE1IDE1em0wIDAiIGZpbGw9IiM4NGRlZWEiLz48cGF0aCBkPSJtMjcxIDQzN3YyMmMwIDguMjg1MTU2LTYuNzE0ODQ0IDE1LTE1IDE1cy0xNS02LjcxNDg0NC0xNS0xNXYtMjJjMC04LjI4NTE1NiA2LjcxNDg0NC0xNSAxNS0xNXMxNSA2LjcxNDg0NCAxNSAxNXptLTE1LTI3YzkuOTQxNDA2IDAgMTgtOC4wNTg1OTQgMTgtMThzLTguMDU4NTk0LTE4LTE4LTE4LTE4IDguMDU4NTk0LTE4IDE4IDguMDU4NTk0IDE4IDE4IDE4em0wIDAiIGZpbGw9IiNmZmY1ZjUiLz48cGF0aCBkPSJtNDcwIDIxNy43NXYyMGMwIDIyLjA1NDY4OC0xNy45NDUzMTIgNDAtNDAgNDBoLTE3MHYtMjBoMTcwYzExLjAyNzM0NCAwIDIwLTguOTcyNjU2IDIwLTIwdi0yMHptMCAwIiBmaWxsPSIjMDI1ZjgwIi8+PHBhdGggZD0ibTI4OC45NDUzMTIgMjgzLjEwOTM3NWgtNjUuODkwNjI0Yy05LjQxNzk2OSAwLTE3LjA1NDY4OC03LjYzNjcxOS0xNy4wNTQ2ODgtMTcuMDU0Njg3IDAtOS40MTc5NjkgNy42MzY3MTktMTcuMDU0Njg4IDE3LjA1NDY4OC0xNy4wNTQ2ODhoNjUuODkwNjI0YzkuNDE3OTY5IDAgMTcuMDU0Njg4IDcuNjM2NzE5IDE3LjA1NDY4OCAxNy4wNTQ2ODggMCA5LjQyMTg3NC03LjYzNjcxOSAxNy4wNTQ2ODctMTcuMDU0Njg4IDE3LjA1NDY4N3ptMCAwIiBmaWxsPSIjZmY2NDY2Ii8+PHBhdGggZD0ibTI4OC45NDUzMTIgMjgzLjEwOTM3NWgtMzUuODkwNjI0Yy05LjQxNzk2OSAwLTE3LjA1NDY4OC03LjYzNjcxOS0xNy4wNTQ2ODgtMTcuMDU0Njg3IDAtOS40MTc5NjkgNy42MzY3MTktMTcuMDU0Njg4IDE3LjA1NDY4OC0xNy4wNTQ2ODhoMzUuODkwNjI0YzkuNDE3OTY5IDAgMTcuMDU0Njg4IDcuNjM2NzE5IDE3LjA1NDY4OCAxNy4wNTQ2ODggMCA5LjQyMTg3NC03LjYzNjcxOSAxNy4wNTQ2ODctMTcuMDU0Njg4IDE3LjA1NDY4N3ptMCAwIiBmaWxsPSIjZmY4OTVhIi8+PC9zdmc+" />
            
         </div>`
    

}

function handleEnter(event){
    let keyCode = event.keyCode;
    
    if(keyCode == 13 && document.getElementById('chatbot__input').value != ''){
        handleInput();
    }
}

window.addEventListener('keydown', handleEnter);

//initial functions
(function init(){
    createChatbot();
    checkConnection();
})();
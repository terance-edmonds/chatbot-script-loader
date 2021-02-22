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
                width: 80px;
                height: 80px;
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
     
             <img id="chatbot__icon" onclick="handleChatbot()" src="./robotIcon.png" alt="robot"/>
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
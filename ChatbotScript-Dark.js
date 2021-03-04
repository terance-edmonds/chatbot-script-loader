var chatbotServerUrl = "";

if (location.protocol == "http:"){
    chatbotServerUrl = "http://52.220.134.60";
}
else{
    chatbotServerUrl = "https://52.220.134.60";
}

//const chatbotServerUrl = "http://localhost:4000";

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

//handle user input
function handleInput() {
    let input = document.getElementById('chatbot__input').value;
    let container = document.getElementById('chatbot__message-container')

    if(input != ''){
        container.innerHTML += `<p class="chatbot__query chatbot__message">${input}</p>`;
        document.getElementById('chatbot__input').value = '';

        container.innerHTML += `
        <div id="chatbot_____typing-indicator-wrapper">
            <div id="chatbot_____typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <span id="chatbot_____typing-indicator-1"></span>
            <span id="chatbot_____typing-indicator-2"></span>
        </div>
        `

        scrollDown();

        fetch(chatbotServerUrl+"/api/chatbot", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: window.location.host,
                message: input,
                sessionId: sessionStorage.getItem("sessionId")
            }),
        })
        .then(response => response.json())
        .then(data => {

            if(data.sessionId == 'end session'){
                sessionStorage.setItem("sessionId", 'end session')
            }

            document.getElementById('chatbot_____typing-indicator-wrapper').remove()
            if(data.response != undefined){
                container.innerHTML += `<p class="chatbot__response chatbot__message">${data.response}</p>`;
            }else{
                container.innerHTML += `<p class="chatbot__response chatbot__message">Something went wrong.</p>`;
            }
            scrollDown();
        })

    }
}

//start the conversation (start a new session)
function handleStartSession() {
    let container = document.getElementById('chatbot__message-container')

    container.innerHTML += `
    <div id="chatbot_____typing-indicator-wrapper">
        <div id="chatbot_____typing-indicator">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <span id="chatbot_____typing-indicator-1"></span>
        <span id="chatbot_____typing-indicator-2"></span>
    </div>
    `

    scrollDown();

    fetch(chatbotServerUrl+"/api/chatbot", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: window.location.host,
            message: 'hi',
            sessionId: 'null'
        }),
    })
    .then(response => response.json())
    .then(data => {
        //set a new sessionId
        sessionStorage.setItem("sessionId", data.sessionId)

        document.getElementById('chatbot_____typing-indicator-wrapper').remove()

        if(data.response != undefined){
            container.innerHTML += `<p class="chatbot__response chatbot__message">${data.response}</p>`;
        }else{
            container.innerHTML += `<p class="chatbot__response chatbot__message">Something went wrong.</p>`;
        }
        scrollDown();
    })
}

function handleChatbot() {

    if(sessionStorage.getItem("sessionId") == 'end session'){
        handleStartSession()
        sessionStorage.setItem("sessionId", 'null')
    }
    
    let container = document.getElementById('chatbot__container')
    let textbox = document.getElementById('chatbot__input')

    if(container.style.transform == 'scale(0)' || container.style.transform == ''){
        container.style.display = 'block'
        setTimeout(() => {
            container.style.transform = 'scale(1)'
            container.style.borderRadius = '7px'
            container.style.opacity = '1'
            textbox.select();
        }, 10);
    }
    else{
        container.style.transform = 'scale(0)'
        container.style.borderRadius = '50%'
        container.style.opacity = '0'
        setTimeout(() => {
            container.style.display = 'none'
        }, 310); 
    }
}

function addChatbotCss(){
    document.head.innerHTML += `
        <style id="chatbot__style.css">

        #chatbot_____typing-indicator-wrapper{
            display: flex;
            flex-direction: column;
            align-self: flex-start;
            margin-left: 5px;
            animation: chatbot__till-response;
            animation-duration: 0.5s;
            animation-fill-mode: forwards;
        }

        @keyframes chatbot__till-response{
            0%{
                opacity: 0;
            }
            100%{
                opacity: 1;
            }
        }
        
        #chatbot_____typing-indicator {
            background-color: #767676;
            padding: 7px 5px 7px 5px;
            width: max-content;
            display: flex;
            flex-direction: row;
            border-radius: 20px;
        }
        
        #chatbot_____typing-indicator-1{
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #767676;
            margin-top: -9px;
        }
        
        #chatbot_____typing-indicator-2{
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background-color: #767676;
            margin-top: -1px;
            margin-left: -3px;
        }
        
        #chatbot_____typing-indicator span {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background-color: #dddddd;
            margin-left: 2px;
            margin-right: 2px;
            animation: chatbot_blink_indicator;
            animation-duration: 1s;
            animation-iteration-count: infinite;
            transition: all 0.2s ease;
        }
        
        #chatbot_____typing-indicator span:nth-child(2){
            animation: chatbot_blink_indicator;
            animation-delay: 0.3s;
            animation-duration: 1s;
            animation-iteration-count: infinite;
        }
        #chatbot_____typing-indicator span:nth-child(3){
            animation: chatbot_blink_indicator;
            animation-delay: 0.6s;
            animation-duration: 1s;
            animation-iteration-count: infinite;
        }
        
        @keyframes chatbot_blink_indicator{
            0%{
                opacity: 0.3;
                transform: translateY(0);
            }
            50%{
                transform: translateY(-1px);
            }
            100%{
                opacity: 1;
                transform: translateY(-2px);
            }
        }


            #chatbot__container-wrapper{
                position: absolute;
                bottom: 2vh;
                right: 2vw;
                display: flex;
                align-items: baseline;
                max-width: max-content;
                z-index: 100;
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
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
                display: none;
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

            @media screen and (max-width: 750px){
                #chatbot__icon{
                    width: 50px;
                    height: 50px; 
                }

                #chatbot__container{
                    height: 400px;
                    width: 250px;
                }
                
                #chatbot__message-container{
                    font-family:Arial, Helvetica, sans-serif;
                    position: absolute;
                    height: 360px;
                    width: 250px;
                    font-size: 0.7rem;
                }
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
                 <div id="chatbot__message-container">
                    <!-- <p class="chatbot__response chatbot__message">Greetings! How can I help you?</p> -->
                 </div>
                 
                 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                 onclick="handleInput()"
                 id="chatbot__send-icon"
                 viewBox="0 0 171 171"
                 style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,171.99132v-171.99132h171.99132v171.99132z" fill="none"></path><g fill="#666666"><path d="M148.0575,99.6075l-102.03,51.015c-11.32875,5.62875 -24.6525,-2.63625 -24.6525,-15.2475v-28.5l88.4925,-16.60125c5.34375,-0.9975 5.34375,-8.55 0,-9.5475l-88.4925,-16.60125v-28.5c0,-12.61125 13.32375,-20.87625 24.6525,-15.2475l102.03,51.015c11.61375,5.8425 11.61375,22.3725 0,28.215z"></path><path d="M133.45838,85.5l-112.08338,34.67025v-69.3405z" opacity="0.35"></path></g></g></svg>
                 
                 <input id="chatbot__input" placeholder="type here...."/>
             </div>

             <svg id="chatbot__icon" onclick="handleChatbot()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1039 1000"><defs><style>.cls-1{fill:#1a1a1a;}.cls-2{fill:#f2f2f2;}.cls-3{fill:none;}.cls-3,.cls-4{stroke:#e6e6e6;stroke-linecap:round;stroke-linejoin:round;stroke-width:23px;}.cls-4,.cls-5{fill:#e6e6e6;}</style></defs><path class="cls-1" d="M1000,500c0,6.52,0,14.53-.58,24.3-12,195-196,475.61-499.42,475.7C228.85,1000.08,0,776.2,0,500S223.86,0,500,0,1000,223.86,1000,500Z"/><path class="cls-2" d="M713.86,675H285.14c-12.13,0-76.66-1.11-128.79-48.77C123.39,596.1,103,554.48,103,508.5h0c0-92,81.55-166.5,182.14-166.5H713.86C814.45,342,896,416.54,896,508.5h0C896,600.46,814.45,675,713.86,675Z"/><circle class="cls-1" cx="308.06" cy="509.07" r="50"/><circle class="cls-1" cx="678.54" cy="509.07" r="50"/><path class="cls-3" d="M992.27,515.05c-39.88,87.88-159.78,320.64-388.08,375.42A421.74,421.74,0,0,1,536.73,901"/><ellipse class="cls-4" cx="503.5" cy="896" rx="53" ry="24.5"/><rect class="cls-5" x="961.5" y="355" width="59.5" height="290.5" rx="18.45"/></svg>

         </div>`


         if(sessionStorage.getItem("sessionId") == null){
            handleStartSession()
        }
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

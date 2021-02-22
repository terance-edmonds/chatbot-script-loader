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

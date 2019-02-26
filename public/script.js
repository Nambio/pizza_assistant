
const textInput = document.getElementById('textInput');
const chat = document.getElementById('chat');

let context = {};

const templateChatMessage = (message, from) => `
  <div class="from-${from}">
    <div class="message-inner">
      <p>${message}</p>
    </div>
  </div>
  `;

const InsertTemplateInTheChat = (template) => {
  const div = document.createElement('div');
  div.innerHTML = template;

  chat.appendChild(div);
 
};

const getWatsonMessageAndInsertTemplate = async (text = '') => {

  const uri = 'http://localhost/conversation/';

  const response = await (await fetch(uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text,
      context,
    }),
  })).json();

  context = response.context;

  const template = templateChatMessage(response.output.text, 'watson');

  InsertTemplateInTheChat(template);
};

textInput.addEventListener('keydown', (event) => {
  if (event.keyCode === 13 && textInput.value) {
    getWatsonMessageAndInsertTemplate(textInput.value);

    const template = templateChatMessage(textInput.value, 'user');
    InsertTemplateInTheChat(template);
    
    textInput.value = '';
    $("#chat").animate({scrollTop: $('#chat').prop("scrollHeight")},1000);
  }
});

function recolher(){
  $("#rec").addClass("hide")
  $("#chat").addClass("hide")
  $("#caixa-perg").addClass("hide")
  $("#exp").removeClass("hide")
  
}

function expande(){
  $("#rec").removeClass("hide")
  $("#chat").removeClass("hide")
  $("#caixa-perg").removeClass("hide")
  $("#exp").addClass("hide")
}

getWatsonMessageAndInsertTemplate();

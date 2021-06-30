export const getIncomingCallDialog = (
  callTypeInfo,
  acceptCallHandler,
  rejectCallHandler
) => {
  console.log("getting incoming call dialog");
  const dialog = document.createElement("div");
  dialog.classList.add("dialog_box");
  const dialogContent = document.createElement("div");
  dialogContent.classList.add("dialog_content");
  dialog.appendChild(dialogContent);

  const meetingCodeDiv = document.createElement('div');
  meetingCodeDiv.classList.add("meeting_code_div");  
  const title = document.createElement("p");
  title.classList.add("dialog_box_heading");
  title.innerHTML = `Joining Request`;
  const content = document.createElement("p");
  content.classList.add("personal_code_content");
  content.innerHTML = `Someone wants to join the ${callTypeInfo} meet`;
  meetingCodeDiv.appendChild(title);
  meetingCodeDiv.appendChild(content);

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("dialog_buttons_div");

  const acceptCallButton = document.createElement("button");
  acceptCallButton.classList.add("green_connecting_button");
  acceptCallButton.innerHTML = "Admit";
  buttonContainer.appendChild(acceptCallButton);

  const rejectCallButton = document.createElement("button");
  rejectCallButton.classList.add("white_connecting_button");
  rejectCallButton.innerHTML = "Reject";
  buttonContainer.appendChild(rejectCallButton);

  dialogContent.appendChild(meetingCodeDiv);
  dialogContent.appendChild(buttonContainer);

  acceptCallButton.addEventListener("click", () => {
    acceptCallHandler();
  });

  rejectCallButton.addEventListener("click", () => {
    rejectCallHandler();
  });

  return dialog;
};

export const getCallingDialog = (rejectCallHandler) => {
  const dialog = document.createElement("div");
  dialog.classList.add("dialog_box");
  const dialogContent = document.createElement("div");
  dialogContent.classList.add("dialog_content");
  dialog.appendChild(dialogContent);

  const meetingCodeDiv = document.createElement('div');
  meetingCodeDiv.classList.add("meeting_code_div");  
  const title = document.createElement("p");
  title.classList.add("dialog_box_heading");
  title.innerHTML = `Connecting`;
  const content = document.createElement("p");
  content.classList.add("personal_code_content");
  content.innerHTML = `You can join the meeting when host lets you in.`;
  meetingCodeDiv.appendChild(title);
  meetingCodeDiv.appendChild(content);

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("dialog_buttons_div");

  const hangUpCallButton = document.createElement("button");
  hangUpCallButton.classList.add("green_connecting_button");
  hangUpCallButton.innerHTML = "Leave";
  buttonContainer.appendChild(hangUpCallButton);


  dialogContent.appendChild(meetingCodeDiv);
  dialogContent.appendChild(buttonContainer);

  hangUpCallButton.addEventListener('click', ()=>{
    rejectCallHandler();
  })

  return dialog;
};

export const getInfoDialog = (dialogTitle, dialogDescription) => {
  const dialog = document.createElement("div");
  dialog.classList.add("dialog_box");
  const dialogContent = document.createElement("div");
  dialogContent.classList.add("dialog_content");
  dialog.appendChild(dialogContent);

  const meetingCodeDiv = document.createElement('div');
  meetingCodeDiv.classList.add("meeting_code_div");  
  const title = document.createElement("p");
  title.classList.add("dialog_box_heading");
  title.innerHTML = dialogTitle;
  const content = document.createElement("p");
  content.classList.add("personal_code_content");
  content.innerHTML = dialogDescription;
  meetingCodeDiv.appendChild(title);
  meetingCodeDiv.appendChild(content);


  dialogContent.appendChild(meetingCodeDiv);

  return dialog;
};

export const getPersonlCodeDialog = (personalCode, removeAllDialogs) => {
  const dialog = document.createElement("div");
  dialog.classList.add("dialog_box");
  const dialogContent = document.createElement("div");
  dialogContent.classList.add("dialog_content");
  dialog.appendChild(dialogContent);

  const closeButton = document.createElement('button');
  closeButton.classList.add('close_dialog_button');
  closeButton.innerHTML="X";

  const meetingCodeDiv = document.createElement('div');
  meetingCodeDiv.classList.add("meeting_code_div");  
  const title = document.createElement("p");
  title.classList.add("dialog_box_heading");
  title.innerHTML = `Your personal meeting code`;

  const content = document.createElement("div");
  content.classList.add("dialog_box_value");
  const personalCodePara = document.createElement("p");
  personalCodePara.innerHTML = personalCode;
  content.appendChild(personalCodePara);
  const copyButton = document.createElement('button');
  copyButton.classList.add("personal_code_copy_button");
  const copyIcon = document.createElement('i');
  copyIcon.classList.add("fas");
  copyIcon.classList.add("fa-copy");
  copyButton.appendChild(copyIcon);
  content.appendChild(copyButton);

  meetingCodeDiv.appendChild(title);
  meetingCodeDiv.appendChild(content);


  dialogContent.appendChild(closeButton);
  dialogContent.appendChild(meetingCodeDiv);

  closeButton.addEventListener('click', ()=>{
    removeAllDialogs();
  });

  copyButton.addEventListener("click", () => {
    navigator.clipboard && navigator.clipboard.writeText(personalCode);
  });

  return dialog;

}

export const getLeftMessage = (message) => {
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("message_left_container");
  const messageParagraph = document.createElement("p");
  messageParagraph.classList.add("message_left_paragraph");
  messageParagraph.innerHTML = message;
  messageContainer.appendChild(messageParagraph);

  return messageContainer;
};

export const getRightMessage = (message) => {
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("message_right_container");
  const messageParagraph = document.createElement("p");
  messageParagraph.classList.add("message_right_paragraph");
  messageParagraph.innerHTML = message;
  messageContainer.appendChild(messageParagraph);

  return messageContainer;
};

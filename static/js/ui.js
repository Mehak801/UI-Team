import * as constants from "./constants.js";
import * as elements from "./elements.js";

let meeting_personal_code = "";

export const setPersonalCode = (personalCode)=>{
  meeting_personal_code = personalCode;
};

export const updatePersonalCode = () => {
  const personalCodeParagraph = document.getElementById(
    "personal_code_paragraph"
  );
  personalCodeParagraph.innerHTML = meeting_personal_code;
};
 
export const getPersonlCodeDialog = ()=>{
  const personalCodeDialog = elements.getPersonlCodeDialog(meeting_personal_code, removeAllDialogs);

  // removing all dialogs inside HTML dialog element
  const dialog = document.getElementById("dialog");
  dialog.querySelectorAll("*").forEach((dilog) => dilog.remove());

  dialog.appendChild(personalCodeDialog);
}


export const updateLocalVideo = (stream) => {
  const localVideo = document.getElementById("local_video");
  localVideo.srcObject = stream;

  localVideo.addEventListener("loadedmetadata", () => {
    localVideo.play();
  });
};

export const showVideoCallButtons = ()=>{
  const personalCodeVideoButton = document.getElementById('personal_code_video_button');

  showElement(personalCodeVideoButton);
}

export const updateRemoteVideo = (stream) => {
  const remoteVideo = document.getElementById("remote_video");
  remoteVideo.srcObject = stream;
};

export const showIncomingCallDialog = (
  callType,
  acceptCallHandler,
  rejectCallHandler
) => {
  const callTypeInfo =
    callType === constants.callType.CHAT_PERSONAL_CODE ? "Chat" : "Video";

  const incomingCallDialog = elements.getIncomingCallDialog(
    callTypeInfo,
    acceptCallHandler,
    rejectCallHandler
  );

  // removing all dialogs inside HTML dialog element
  const dialog = document.getElementById("dialog");
  dialog.querySelectorAll("*").forEach((dilog) => dilog.remove());

  dialog.appendChild(incomingCallDialog);
};

export const showCallingDialog = (rejectCallHandler) => {
  const callingDialog = elements.getCallingDialog(rejectCallHandler);

  // removing all dialogs inside HTML dialog element
  const dialog = document.getElementById("dialog");
  dialog.querySelectorAll("*").forEach((dilog) => dilog.remove());

  dialog.appendChild(callingDialog);
};

export const showInfoDialog = (preOfferAnswer) => {
  let infoDialog = null;

  if (preOfferAnswer === constants.preOfferAnswer.CALL_REJECTED) {
    infoDialog = elements.getInfoDialog(
      "Join Request rejected",
      "Host rejected your entry in the meeting"
    );
  }

  if (preOfferAnswer === constants.preOfferAnswer.CALLEE_NOT_FOUND) {
    infoDialog = elements.getInfoDialog(
      "Invalid Code",
      "Please check meeting code"
    );
  }

  if (preOfferAnswer === constants.preOfferAnswer.CALL_UNAVAILABLE) {
    infoDialog = elements.getInfoDialog(
      "Join Request is not possible",
      "Probably meeting is already full or your meeting type is wrong."
    );
  }

  if (infoDialog) {
    const dialog = document.getElementById("dialog");
    dialog.appendChild(infoDialog);

    setTimeout(() => {
      removeAllDialogs();
    }, [4000]);
  }
};

export const removeAllDialogs = () => {
  const dialog = document.getElementById("dialog");
  dialog.querySelectorAll("*").forEach((dilog) => dilog.remove());
};

export const showCallElements = (callType) => {
  if (callType === constants.callType.CHAT_PERSONAL_CODE) {
    showChatCallElements();
  }

  if (callType === constants.callType.VIDEO_PERSONAL_CODE) {
    showVideoCallElements();
  }
};

const showChatCallElements = () => {
  const finishConnectionChatButtonContainer = document.getElementById(
    "finish_chat_button_container"
  );
  showElement(finishConnectionChatButtonContainer);

  const callButtonsLeft = document.getElementById("call_buttons_left");
  hideElement(callButtonsLeft);

  const callButtonsRight = document.getElementById("call_buttons_right");
  hideElement(callButtonsRight);
  
  const chatDiv = document.getElementById("chat_div");
  showElement(chatDiv);
  chatDiv.classList.add("chat_only_div");

  const videoStreamingDiv = document.getElementById("video_streaming_div");
  hideElement(videoStreamingDiv);
  
  const newMessageInput = document.getElementById("new_message");
  showElement(newMessageInput);
};

const showVideoCallElements = () => {
  const placeholder = document.getElementById("video_placeholder");
  hideElement(placeholder);

  const remoteVideo = document.getElementById("remote_video");
  showElement(remoteVideo);

  const newMessageInput = document.getElementById("new_message");
  showElement(newMessageInput);
};

// ui call buttons

const micOnImgSrc = "./images/mic.png";
const micOffImgSrc = "./images/micOff.png";

export const updateMicButton = (micActive) => {
  const micButtonImage = document.getElementById("mic_button_image");
  micButtonImage.src = micActive ? micOffImgSrc : micOnImgSrc;
};

const cameraOnImgSrc = "./images/camera.png";
const cameraOffImgSrc = "./images/cameraOff.png";

export const updateCameraButton = (cameraActive) => {
  const cameraButtonImage = document.getElementById("camera_button_image");
  cameraButtonImage.src = cameraActive ? cameraOffImgSrc : cameraOnImgSrc;
};

const screenShareOnImgSrc = "./images/screenShare.png";
const screenShareOffImgSrc = "./images/screenShareOff.png";

export const updateScreenShareButton = (screenShareActive) => {
  const screenShareButtonImage = document.getElementById("screen_share_button_image");
  screenShareButtonImage.src = screenShareActive ? screenShareOffImgSrc : screenShareOnImgSrc;
};

export const toggleMessenger = ()=>{
  const videoStreamingDiv = document.getElementById("video_streaming_div");
  const chatDiv = document.getElementById("chat_div");
  const personalCodeBtn = document.getElementById("get_personal_code");

  if(chatDiv.classList.contains('display_none')){
    showElement(chatDiv);
    videoStreamingDiv.style.width = "75%";
    personalCodeBtn.style.right = "25vw";
  }else{
    hideElement(chatDiv);
    videoStreamingDiv.style.width = "100%";
    personalCodeBtn.style.right = "1rem";
  }
}

// ui messages
export const appendMessage = (message, right = false) => {
  const messagesContainer = document.getElementById("messages_container");
  const messageElement = right
    ? elements.getRightMessage(message)
    : elements.getLeftMessage(message);
  messagesContainer.appendChild(messageElement);
};

export const clearMessenger = () => {
  const messagesContainer = document.getElementById("messages_container");
  messagesContainer.querySelectorAll("*").forEach((n) => n.remove());
};

//recording
export const showRecordingPanel = ()=>{
  const recordingButtons = document.getElementById("video_recording_buttons");
  showElement(recordingButtons);

  //hide start recording button if it active
  const startRecordingButton = document.getElementById('start_recording_button');
  hideElement(startRecordingButton);
}

export const resetRecordingButtons = ()=>{
  const startRecordingButton = document.getElementById('start_recording_button');
  showElement(startRecordingButton);

  const recordingButtons = document.getElementById("video_recording_buttons");
  hideElement(recordingButtons);
}

export const switchRecordingButtons = (switchForResumeButton = false) => {
  const resumeButton = document.getElementById("resume_recording_button");
  const pauseButton = document.getElementById("pause_recording_button");

  if (switchForResumeButton) {
    hideElement(pauseButton);
    showElement(resumeButton);
  } else {
    hideElement(resumeButton);
    showElement(pauseButton);
  }
};

// ui after hanging up
export const updateUIAfterHangUp = (callType) => {
  const newMessageInput = document.getElementById("new_message");
  hideElement(newMessageInput);

  clearMessenger();

  updateCameraButton(false);
  updateMicButton(false);

  //hide video and show placeholder
  const placeholder = document.getElementById('video_placeholder');
  showElement(placeholder);

  const remoteVideo = document.getElementById('remote_video');
  hideElement(remoteVideo);

  removeAllDialogs();
}

// ui helper functions

const hideElement = (element) => {
  if (!element.classList.contains("display_none")) {
    element.classList.add("display_none");
  }
};

const showElement = (element) => {
  if (element.classList.contains("display_none")) {
    element.classList.remove("display_none");
  }
};
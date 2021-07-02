import * as store from "./store.js";
import * as wss from "./wss.js";
import * as webRTCHandler from "./webRTCHandler.js";
import * as constants from "./constants.js";
import * as ui from "./ui.js";
import * as recordingUtils from './recordingUtils.js'

// initialization of socketIO connection
const socket = io("/");
wss.registerSocketEvents(socket);

const trick = document.getElementById("trick_box");
if(trick.classList.contains("display_none")){
  webRTCHandler.getLocalPreview();
}


//register event listener for personal code copy button
const personalCodeCopyButton = document.getElementById(
  "personal_code_copy_button"
);
personalCodeCopyButton.addEventListener("click", () => {
  const personalCode = store.getState().socketId;
  navigator.clipboard && navigator.clipboard.writeText(personalCode);
});

// register event listeners for connection buttons

const personalCodeVideoButton = document.getElementById(
  "personal_code_video_button"
);

personalCodeVideoButton.addEventListener("click", () => {
  console.log("video button clicked");

  const calleePersonalCode = document.getElementById(
    "personal_code_input"
  ).value;
  const callType = constants.callType.VIDEO_PERSONAL_CODE;

  webRTCHandler.sendPreOffer(callType, calleePersonalCode);
});

const personalCodeChatButton = document.getElementById(
  "personal_code_chat_button"
);

personalCodeChatButton.addEventListener("click", () => {
  console.log("chat button clicked");

  const calleePersonalCode = document.getElementById(
    "personal_code_input"
  ).value;
  const callType = constants.callType.CHAT_PERSONAL_CODE;

  webRTCHandler.sendPreOffer(callType, calleePersonalCode);
});

// event listeners for video call buttons

const micButton = document.getElementById("mic_button");
micButton.addEventListener("click", () => {
  const localStream = store.getState().localStream;
  const micEnabled = localStream.getAudioTracks()[0].enabled;
  localStream.getAudioTracks()[0].enabled = !micEnabled;
  ui.updateMicButton(micEnabled);
});

const cameraButton = document.getElementById("camera_button");
cameraButton.addEventListener("click", () => {
  const localStream = store.getState().localStream;
  const cameraEnabled = localStream.getVideoTracks()[0].enabled;
  localStream.getVideoTracks()[0].enabled = !cameraEnabled;
  ui.updateCameraButton(cameraEnabled);
});

const switchForScreenSharingButton = document.getElementById(
  "screen_sharing_button"
);
switchForScreenSharingButton.addEventListener("click", () => {
  const screenSharingActive = store.getState().screenSharingActive;
  webRTCHandler.switchBetweenCameraAndScreenSharing(screenSharingActive);
});

const getPersonlCode = document.getElementById("get_personal_code");
getPersonlCode.addEventListener("click", () => {
  ui.getPersonlCodeDialog();
});

const callChatButton = document.getElementById("call_chat_button");
callChatButton.addEventListener("click", ()=>{
  ui.toggleMessenger();
})

const newMeetingButton =  document.getElementById('close_dialog_button')
  newMeetingButton.addEventListener('click', () => {
    ui.removeAllDialogs();
  })
// messenger

$("#new_message_input").emojioneArea({
  events : {
    keydown: function (editor, event) {
      const key = event.key;
      const message = $(".emojionearea-editor").html();

      if (key === "Enter") {
        webRTCHandler.sendMessageUsingDataChannel(message);
        ui.appendMessage(message, true);
        $(".emojionearea-editor").html('');
      }
    }
  }
});

const sendMessageButton = document.getElementById("send_message_button");
sendMessageButton.addEventListener("click", () => {
  console.log("btn clicked");
  const message = $(".emojionearea-editor").html();
  webRTCHandler.sendMessageUsingDataChannel(message);
  ui.appendMessage(message, true);
  $(".emojionearea-editor").html('');
});

//recording

const startRecordingButton = document.getElementById('start_recording_button');
startRecordingButton.addEventListener('click', () => {
  recordingUtils.startRecording();
  ui.showRecordingPanel();
});

const stopRecordingButton = document.getElementById('stop_recording_button');
stopRecordingButton.addEventListener('click', () => {
  recordingUtils.stopMediaRecording();
  ui.resetRecordingButtons();
});

const pauseRecordingButton = document.getElementById("pause_recording_button");
pauseRecordingButton.addEventListener("click", () => {
  recordingUtils.pauseMediaRecording();
  ui.switchRecordingButtons(true);
});

const resumeRecordingButton = document.getElementById(
  "resume_recording_button"
);
resumeRecordingButton.addEventListener("click", () => {
  recordingUtils.resumeMediaRecording();
  ui.switchRecordingButtons();
});

// hangup
const hangUpButton = document.getElementById('hang_up_button');
hangUpButton.addEventListener('click', () => {
  if (store.getState().remoteStream !== null) {
    webRTCHandler.handleHangUp();
  }

});

const hangUpChatButton = document.getElementById('finish_chat_call_button');
hangUpChatButton.addEventListener('click', () => {
  webRTCHandler.handleHangUp();
})



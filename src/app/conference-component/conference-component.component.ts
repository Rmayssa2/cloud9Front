import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
declare var JitsiMeetExternalAPI: any;
@Component({
  selector: 'app-conference-component',
  templateUrl: './conference-component.component.html',
  styleUrls: ['./conference-component.component.css']
})
export class ConferenceComponentComponent implements OnInit,AfterViewInit {

  domain: string = "meet.jit.si";
  room: any;
  options: any;
  api: any;
  user: any;

  // For Custom Controls
  isAudioMuted = false;
  isVideoMuted = false;

  constructor(
      private router: Router
  ) { }

  ngOnInit(): void {
      this.room = 'conference-room'; // room name
      this.user = {
          name: 'Creator' // username
      }
  }

  ngAfterViewInit(): void {
      this.options = {
          roomName: this.room,
          width: 900,
          height: 500,
          configOverwrite: { prejoinPageEnabled: false },
          interfaceConfigOverwrite: {
              // overwrite interface properties
          },
          parentNode: document.querySelector('#jitsi-iframe'),
          userInfo: {
              displayName: this.user.name
          }
      }

      this.api = new JitsiMeetExternalAPI(this.domain, this.options);

       // Event handlers
      this.api.addEventListeners({
          readyToClose: this.handleClose,
          participantLeft: this.handleParticipantLeft,
          participantJoined: this.handleParticipantJoined,
          videoConferenceJoined: this.handleVideoConferenceJoined,
          videoConferenceLeft: this.handleVideoConferenceLeft,
          audioMuteStatusChanged: this.handleMuteStatus,
          videoMuteStatusChanged: this.handleVideoStatus
      });
  }

  handleClose = () => {
    console.log("handleClose");
}

handleParticipantLeft = async (participant) => {
    console.log("handleParticipantLeft", participant); // { id: "2baa184e" }
    const data = await this.getParticipants();
}

handleParticipantJoined = async (participant) => {
    console.log("handleParticipantJoined", participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
    const data = await this.getParticipants();
}

handleVideoConferenceJoined = async (participant) => {
    console.log("handleVideoConferenceJoined", participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
    const data = await this.getParticipants();
}

handleVideoConferenceLeft = () => {
    console.log("handleVideoConferenceLeft");
    this.router.navigate(['/thank-you']);
}

handleMuteStatus = (audio) => {
    console.log("handleMuteStatus", audio); // { muted: true }
}

handleVideoStatus = (video) => {
    console.log("handleVideoStatus", video); // { muted: true }
}

getParticipants() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(this.api.getParticipantsInfo()); // get all participants
        }, 500)
    });
}
executeCommand(command: string) {
  this.api.executeCommand(command);;
  if(command == 'hangup') {
      this.router.navigate(['/thank-you']);
      return;
  }

  if(command == 'toggleAudio') {
      this.isAudioMuted = !this.isAudioMuted;
  }

  if(command == 'toggleVideo') {
      this.isVideoMuted = !this.isVideoMuted;
  }
}
}
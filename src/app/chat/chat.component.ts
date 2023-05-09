import {
  Component,
  ElementRef,
  EventEmitter,
  NgIterable,
  Output,
  ViewChild,
} from '@angular/core';
import { Message } from '../entity/message';
import { Observable } from 'rxjs';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { UserService } from '../service/user.service';
import { ConversationService } from '../service/conversation.service';
import { MessageService } from '../service/message.service';
import { TokenStorageService } from '../service/token-storage.service';

import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  showicon!: boolean;

  name: any;
  isicon!: boolean;
  isactive!: boolean;
  isSelected!: boolean;
  conversation: any;
  message: Message = new Message();
  listmessage: any;
  listconversation: any;
  chatArray: any;
  status = true;
  newMessage = '';
  contactId!: string;
  messageInfo: Message = new Message();
  userInfo: any;
  public displayName!: boolean;
  contactList = [];
  contactChats = [];
  headerName!: string;
  headerImage: any;
  list!: NgIterable<Message>;
  showChatInProgress = false;
  createInProgress = false;
  selecteduser: any;
  selectedconv: any;
  contactMaster = this.contactList;
  chatListMaster = [];
  temp = [];
  currentFile?: File;
  listuser: any;
  currentUser: any; // UID of user 1
  clickedUser = ''; // UID of user 2
  chatList!: any;
  displayChat = [];
  chatId = '';
  fileToUpload?: File;
  senderImage = '';
  currentUserImage = '';
  loadContacts = false;
  progress = 0;
  prevMsg = '';
  formImport: FormGroup;
  
  constructor(
    private userService: UserService,
    private conversationService: ConversationService,
    private messageService: MessageService,
    private tokenStorageService: TokenStorageService,
    private http: HttpClient,
    private toastr: ToastrService,
  ) {
    this.formImport = new FormGroup({
      importFile: new FormControl('', Validators.required),
    });
  }
  @ViewChild('content') content!: ElementRef;
  @Output() closeModalEvent = new EventEmitter<boolean>();

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  shawTo(){
    this.toastr.success('Votre Message est envoyer ');
  }
  selectFile(event: any): void {
    this.fileToUpload = event.target.files[0];
    console.log(this.fileToUpload);
  }
  uploadFile() {
    if (this.fileToUpload) {
      this.messageService.upload(this.fileToUpload).subscribe(
        (data) => {
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      console.error('File is undefined');
    }
  }
  scrollToBottom() {
    try {
      this.content.nativeElement.scrollTop =
        this.content.nativeElement.scrollHeight;
    } catch (err) {
      console.log(err);
    }
  }
  ngOnInit() {
    console.log("----------");
    console.log(this.tokenStorageService.getUser());
    if (this.tokenStorageService.getUser()) {

      this.currentUser = this.tokenStorageService.getUser();
      this.selecteduser = this.currentUser;
      console.log(this.currentUser);
      console.log("++++----");
      console.log(this.currentUser.id);
    }
    console.log("this.conversation.id");
    
    //console.log(this.conversation.id);

    console.log(this.currentUser);
    this.userService.getAll().subscribe((data) => {
      this.chatList = data;
      console.log(data);
    });
    this.conversationService
      .getConversationMessages(this.conversation.id)
      .subscribe(
        (data) => {
          this.listmessage = data;
          this.list = this.listmessage;
          console.log('++++++++++++++');
          console.log(this.list);
          console.log('++++++++++++++');
        },
        (err) => {
          console.log(err);
        }
      );
  }
  loadMyChatRoom(selectedUser: any) {
    this.chatId = selectedUser.chatRoomId;
    this.clickedUser = selectedUser.uid;
    this.contactId = selectedUser.id;
    this.selecteduser = selectedUser;
    this.list = [];
    this.conversationService
      .getConversationusers(this.currentUser.id, this.selecteduser.idUser)
      .subscribe(
        (data) => {
          this.conversation = data;
          console.log("CONVERSATION AFTER GET CONVERSATIONS USERS");
          console.log(this.conversation);
          this.conversationService
            .getConversationMessages(this.conversation.id)
            .subscribe(
              (data) => {
                
                this.listmessage = data;
                this.list = this.listmessage;
                console.log('++++++++++++++');
                console.log(this.list);
                console.log(this.conversation);
                console.log('++++++++++++++');
                let messagesArray = Array.from(this.list); // Cast NgIterable<Message> to Message[]
                console.log("messagesArray");
                console.log(messagesArray);
                messagesArray.sort((a, b) => {
                  return (
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                  ); // Order messages by date (newest first)
                });
                this.list = messagesArray;
              },
              (err) => {
                console.log(err);
              }
            );
        },
        (err) => {
          console.log(err);
        }
      );
  }
  startconversation() {
    this.conversationService
      .add(this.currentUser.id, this.selecteduser.id)
      .subscribe(
        (data) => {
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
    window.location.reload();
    
  }
  sendMessage() {
    if (this.newMessage !== null && this.newMessage !== '') {
      this.messageInfo.text = this.newMessage;
      this.messageInfo.conversation = this.conversation;
      console.log('----------');
      console.log(this.messageInfo);
      console.log(this.conversation);
      this.progress = 0;
      if (this.fileToUpload) {
        this.uploadFile();
        const file: File | null = this.fileToUpload;
        if (file) {
          this.currentFile = file;
          this.messageService
            .addwithfile(
              this.messageInfo,
              this.conversation.id,
              this.currentUser.id,
              this.currentFile.name
            )
            .subscribe(
              (data) => {
                console.log(data);
                this.conversation = data;
                this.list = this.conversation.messages;
                let messagesArray = Array.from(this.list); // Cast NgIterable<Message> to Message[]
                messagesArray.sort((a, b) => {
                  return (
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                  ); // Order messages by date (newest first)
                });
                this.list = messagesArray;
              },
              (err) => {
                console.log(err);
              }
            );
        }
      } else {
        this.messageService
          .add(this.messageInfo, this.conversation.id, this.currentUser.id)
          .subscribe(
            (data) => {
              console.log(data);
              this.conversation = data;
              this.list = this.conversation.messages;
              let messagesArray = Array.from(this.list); // Cast NgIterable<Message> to Message[]
              messagesArray.sort((a, b) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime(); // Order messages by date (newest first)
              });
              this.list = messagesArray;
            },
            (err) => {
              console.log(err);
            }
          );
      }

      this.conversationService
        .getConversationMessages(this.conversation.id)
        .subscribe(
          (data) => {
            this.listmessage = data;
            this.list = this.listmessage;
            console.log('++++++++++++++');
            console.log(this.list);
            console.log('++++++++++++++');
            let messagesArray = Array.from(this.list); // Cast NgIterable<Message> to Message[]
            messagesArray.sort((a, b) => {
              return new Date(b.date).getTime() - new Date(a.date).getTime(); // Order messages by date (newest first)
            });
            this.list = messagesArray;
          },
          (err) => {
            console.log(err);
          }
        );
      // Add message to box before sending
    } else {
      if (this.fileToUpload) {
        const file: File | null = this.fileToUpload;
        if (file) {
          this.uploadFile();
          this.currentFile = file;
          this.messageService
            .addwithfile(
              this.messageInfo,
              this.conversation.id,
              this.currentUser.id,
              this.currentFile.name
            )
            .subscribe(
              (data) => {
                console.log(data);
                this.conversation = data;
                this.list = this.conversation.messages;
                let messagesArray = Array.from(this.list); // Cast NgIterable<Message> to Message[]
                messagesArray.sort((a, b) => {
                  return (
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                  ); // Order messages by date (newest first)
                });
                this.list = messagesArray;
              },
              (err) => {
                console.log(err);
              }
            );
        }
      }
    }
    this.fileToUpload = undefined;
    this.newMessage = '';
    this.toastr.success("Votre Message est envoyé");
  }

  openfile(filepath: string) {
    this.messageService.getFile(filepath).subscribe(
      (data) => {},
      (err) => {
        console.log(err);
      }
    );
  }



  onEnter(value: string) {
    this.newMessage = value;
    this.sendMessage();
    this.toastr.success("Votre Message est envoyé");
  }




  showChat(data: any) {
    if (this.showChatInProgress || this.createInProgress) {
      return;
    }
    this.showChatInProgress = true;
    this.currentUserImage = this.currentUser.photoURL;
    this.clickedUser = data.uid;
    this.contactId = data.id;
    this.senderImage = data.image;
    const roomName =
      this.currentUser < this.clickedUser
        ? this.currentUser + '_' + this.clickedUser
        : this.clickedUser + '_' + this.currentUser;

    this.userInfo = {
      uid: this.currentUser.uid,
      name: roomName,
      image: this.currentUser.photoURL,
      time: Date.now(),
      showMessage: '',
      badge: '',
      showicon: true,
      isicon: false,
      isactive: 'online',
      isSelected: false,
      chatHistory: [],
    };
  }

  /**
   * Show add/remove function
   *
   * @param event    Overlay click event
   */
}

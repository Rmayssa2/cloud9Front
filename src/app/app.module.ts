import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS,HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { SingleTeamComponent } from './single-team/single-team.component';
import { BlogOneComponent } from './blog-one/blog-one.component';
import { BlogTwoComponent } from './blog-two/blog-two.component';
import { SingleBlogComponent } from './single-blog/single-blog.component';
import { SingleServiceComponent } from './single-service/single-service.component';
import { ShopComponent } from './shop/shop.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { SingleResearchComponent } from './single-research/single-research.component';
import { ResearchComponent } from './research/research.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ComingsoonComponent } from './comingsoon/comingsoon.component';

import { PostComponent } from './post/post.component';
import { CommentComponent } from './comment/comment.component';
import { ReplySectionComponent } from './reply-section/reply-section.component';
import { PostSearchComponent } from './post-search/post-search.component';
import { PopularPostsComponent } from './popular-posts/popular-posts.component';
import { PostFormComponent } from './post-form/post-form.component';

import { CommentBlogComponent } from './comment-blog/comment-blog.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatDatepickerModule, MatDatepickerControl  } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { DateTimePickerModule } from "@syncfusion/ej2-angular-calendars";
//import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { ReactiveFormsModule } from '@angular/forms'; // <-- Import the module here
import { MatCardModule } from '@angular/material/card';
import { MyAppointmentsComponent } from './my-appointments/my-appointments.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ChargeComponent } from './charge/charge.component';
import { NgxStripeModule } from 'ngx-stripe';


import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPwdComponent } from './reset-pwd/reset-pwd.component';
import { ActivatedComponent } from './activated/activated.component';
import { EditProfilComponent } from './edit-profil/edit-profil.component';
import { AuthInterceptor } from './helper/auth.interceptor';
import { AdminComponent } from './admin/admin.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminSetsComponent } from './admin-sets/admin-sets.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { AdminSecurityComponent } from './admin-security/admin-security.component';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';


import { UpdatePostComponent } from './update-post/update-post.component';
import { ReactionsComponent } from './reactions/reactions.component';

import { AdminAppointmentComponent } from './admin-appointment/admin-appointment.component';
import { DoctorAppointmentComponent } from './doctor-appointment/doctor-appointment.component';
import { AppointmentFormDashComponent } from './appointment-form-dash/appointment-form-dash.component';
import { AppointmentEditDashComponent } from './appointment-edit-dash/appointment-edit-dash.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { ToastrModule,ToastNoAnimationModule} from 'ngx-toastr';
import { AngularFireModule } from '@angular/fire/compat'
import { FacebookLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { ResetPwdSmsComponent } from './reset-pwd-sms/reset-pwd-sms.component';
import { ConsultationFileComponent } from './consultation-file/consultation-file.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {Clipboard} from '@angular/cdk/clipboard';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { VideoCallComponent } from './video-call/video-call.component';
import { CallInfoDialogComponents } from './callinfo-dialog/callinfo-dialog.component';
import { CallService } from './service/call.service';
import Peer from 'peerjs';
import { CommonModule } from '@angular/common';
import { ConferenceComponentComponent } from './conference-component/conference-component.component';
import { EditConsultationFileComponent } from './edit-consultation-file/edit-consultation-file.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DeliveryComponent } from './delivery/delivery.component';
import { ReclamationComponent } from './reclamation/reclamation.component';



@NgModule({
  declarations: [
    CallInfoDialogComponents,
    VideoCallComponent,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    routingComponents,
    LoginComponent,
    ContactComponent,
    SingleTeamComponent,
    BlogOneComponent,
    BlogTwoComponent,
    SingleBlogComponent,
    SingleServiceComponent,
    ShopComponent,
    CheckoutComponent,
    SingleProductComponent,
    SingleResearchComponent,
    ResearchComponent,
    NotfoundComponent,
    ComingsoonComponent,

    PostComponent,
    CommentComponent,
    ReplySectionComponent,
    PostSearchComponent,
    PopularPostsComponent,
    PostFormComponent,
    CommentBlogComponent,

    AppointmentComponent,
    AppointmentFormComponent,
    MyAppointmentsComponent,
    ChargeComponent,

    ForgetPasswordComponent,
    ResetPwdComponent,
    ActivatedComponent,
    EditProfilComponent,
    AdminComponent,
    AdminProfileComponent,
    AdminSetsComponent,
    AdminUsersComponent,
    AdminHeaderComponent,
    AdminMenuComponent,
    AdminSecurityComponent,
    UpdatePostComponent,
    ReactionsComponent,
    AdminAppointmentComponent,
    DoctorAppointmentComponent,
    AppointmentFormDashComponent,
    AppointmentEditDashComponent,
    DeliveryComponent,
    ReclamationComponent,
    ResetPwdSmsComponent,
    ConsultationFileComponent,
    ConferenceComponentComponent,
    EditConsultationFileComponent,
    MyprofileComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatCardModule,
    MatOptionModule,
    MatSelectModule,
    NgxStripeModule.forRoot('pk_test_51MxfuEGPWonDGqDvLC4PcNV5LO5XcrlM1yQblYmn8vs7B2AsU48faVFiKodycaYP5rpViVavldaL29EweTzfhL5000RwQ0kled'),
    SocialLoginModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot(),
    NgbModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ClipboardModule,
    MatSnackBarModule,
    FullCalendarModule,
    DateTimePickerModule
  ],
  providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }, {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('2353063484872542')
        }
      ],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  },
  CallService
],
 
  bootstrap: [AppComponent]
})
export class AppModule {}

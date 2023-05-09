import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { BlogOneComponent } from './blog-one/blog-one.component';
import { BlogTwoComponent } from './blog-two/blog-two.component';
import { SingleBlogComponent } from './single-blog/single-blog.component';
import { SingleServiceComponent } from './single-service/single-service.component';
import { ShopComponent } from './shop/shop.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ResearchComponent } from './research/research.component';
import { SingleResearchComponent } from './single-research/single-research.component';
import { ComingsoonComponent } from './comingsoon/comingsoon.component';
import { PostSearchComponent } from './post-search/post-search.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { MyAppointmentsComponent } from './my-appointments/my-appointments.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPwdComponent } from './reset-pwd/reset-pwd.component';
import { ActivatedComponent } from './activated/activated.component';
import { EditProfilComponent } from './edit-profil/edit-profil.component';

import { AdminComponent } from './admin/admin.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminSetsComponent } from './admin-sets/admin-sets.component';
import { AdminSecurityComponent } from './admin-security/admin-security.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { AdminAppointmentComponent } from './admin-appointment/admin-appointment.component';
import { DoctorAppointmentComponent } from './doctor-appointment/doctor-appointment.component';
import { SingleTeamComponent } from './single-team/single-team.component';
import { ResetPwdSmsComponent } from './reset-pwd-sms/reset-pwd-sms.component';
import { ConsultationFileComponent } from './consultation-file/consultation-file.component';
import { VideoCallComponent } from './video-call/video-call.component';
import { ConferenceComponentComponent } from './conference-component/conference-component.component';
import { EditConsultationFileComponent } from './edit-consultation-file/edit-consultation-file.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },
  { path: 'Calendar/:id', component: AppointmentComponent },
  { path: 'MyCalendar/:id', component: MyAppointmentsComponent },
  { path: 'Appointments', component: DoctorAppointmentComponent },
  { path: 'cart', component: CartComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'single-team/:id', component: SingleTeamComponent },
  { path: 'blogOne', component: BlogOneComponent },
  { path: 'blogTwo', component: BlogTwoComponent },
  { path: 'single-blog/:postId', component: SingleBlogComponent },
  { path: 'single-service', component: SingleServiceComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'single-product', component: SingleProductComponent },
  { path: 'notfound', component: NotfoundComponent },
  { path: 'research', component: ResearchComponent },
  { path: 'single-research', component: SingleResearchComponent },
  { path: 'comingsoon', component: ComingsoonComponent },
  { path: 'search', component: PostSearchComponent },
  { path: 'forgetPassword', component: ForgetPasswordComponent },
  { path: 'ResetPwd/:email', component: ResetPwdComponent },
  { path: 'activate', component: ActivatedComponent },
  { path: 'edit', component: EditProfilComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/users', component: AdminUsersComponent },
  { path: 'admin/profile', component: AdminProfileComponent },
  { path: 'admin/settings', component: AdminSetsComponent },
  { path: 'admin/security', component: AdminSecurityComponent },
  { path: 'restSms/:phone', component: ResetPwdSmsComponent },
  { path: 'consultation-file', component: ConsultationFileComponent },
  { path: 'room',component: VideoCallComponent},
  { path: 'conference', component:ConferenceComponentComponent},
  { path: 'consultation-file-edit',component:EditConsultationFileComponent},
  { path: 'profile', component: AdminProfileComponent },
  { path: 'admin/settings', component: AdminSetsComponent },
  { path: 'admin/security', component: AdminSecurityComponent },
  { path: 'restSms/:phone', component: ResetPwdSmsComponent },
  { path: 'myprofile', component: MyprofileComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/users', component: AdminUsersComponent },
  { path: 'admin/delivery', component: DeliveryComponent },
  { path: 'admin/reclamation', component: ReclamationComponent },
  { path: 'admin/profile', component: AdminProfileComponent },
  { path: 'admin/settings', component: AdminSetsComponent },
  { path: 'admin/security', component: AdminSecurityComponent },
  { path: 'admin/appointment', component: AdminAppointmentComponent },
















  { path: 'chat', component: ChatComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const routingComponents = [
  HomeComponent,
  AppointmentComponent,
  MyAppointmentsComponent,
  CartComponent,
  AboutUsComponent,
  LoginComponent,
  ContactComponent,
  SingleTeamComponent,
  BlogOneComponent,
  BlogTwoComponent,
  SingleBlogComponent,
  SingleServiceComponent,
  ShopComponent,
  CheckoutComponent,
  ComingsoonComponent,
  ForgetPasswordComponent,
  AdminComponent,
  AdminUsersComponent,
  DeliveryComponent,
  AdminAppointmentComponent,
  DoctorAppointmentComponent,

  AdminUsersComponent,
  ChatComponent

];

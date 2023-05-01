import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
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
import { NotfoundComponent } from './notfound/notfound.component';
import { ResearchComponent } from './research/research.component';
import { SingleResearchComponent } from './single-research/single-research.component';
import { ComingsoonComponent } from './comingsoon/comingsoon.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { MyAppointmentsComponent } from './my-appointments/my-appointments.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'Calendar/:id', component: AppointmentComponent },
  { path: 'MyCalendar/:id', component: MyAppointmentsComponent },

  { path: 'cart', component: CartComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'single-team/:id', component: SingleTeamComponent },
  { path: 'blogOne', component: BlogOneComponent },
  { path: 'blogTwo', component: BlogTwoComponent },
  { path: 'single-blog', component: SingleBlogComponent },
  { path: 'single-service', component: SingleServiceComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'single-product', component: SingleProductComponent },
  { path: 'notfound', component: NotfoundComponent },
  { path: 'research', component: ResearchComponent },
  { path: 'single-research', component: SingleResearchComponent },
  { path: 'comingsoon', component: ComingsoonComponent },















];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

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
  CheckoutComponent
];
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
import { AppointmentComponent } from './appointment/appointment.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatDatepickerModule, MatDatepickerControl  } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDatetimeModule } from '@mat-datetimepicker/moment';
import { MatDatetimepickerModule } from '@mat-datetimepicker/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as moment from 'moment';
import { DateTimePickerModule } from "@syncfusion/ej2-angular-calendars";
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { ReactiveFormsModule } from '@angular/forms'; // <-- Import the module here
import { MtxDatetimepickerModule } from '@ng-matero/extensions/datetimepicker';
import { MatCardModule } from '@angular/material/card';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { MyAppointmentsComponent } from './my-appointments/my-appointments.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ChargeComponent } from './charge/charge.component';
import { NgxStripeModule } from 'ngx-stripe';
@NgModule({
  declarations: [
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
    AppointmentComponent,
    AppointmentFormComponent,
    MyAppointmentsComponent,
    ChargeComponent,
    
    

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FullCalendarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDatetimeModule,
    MatDatetimepickerModule,
    BrowserAnimationsModule,
    DateTimePickerModule,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    ReactiveFormsModule,
    MtxDatetimepickerModule,
    MatCardModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatOptionModule,
    MatSelectModule,
    NgxStripeModule.forRoot('pk_test_51MxfuEGPWonDGqDvLC4PcNV5LO5XcrlM1yQblYmn8vs7B2AsU48faVFiKodycaYP5rpViVavldaL29EweTzfhL5000RwQ0kled')


    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { ReactiveFormsModule } from '@angular/forms';
import { CommentBlogComponent } from './comment-blog/comment-blog.component';
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
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import {
  FacebookLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule,
} from '@abacritt/angularx-social-login';
import { UpdatePostComponent } from './update-post/update-post.component';
import { ReactionsComponent } from './reactions/reactions.component';
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
    PostComponent,
    CommentComponent,
    ReplySectionComponent,
    PostSearchComponent,
    PopularPostsComponent,
    PostFormComponent,
    CommentBlogComponent,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('2353063484872542'),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}

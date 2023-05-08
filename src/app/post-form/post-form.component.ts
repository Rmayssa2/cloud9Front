import {
  Component,
  OnInit,
  NgModule,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PostService } from '../services/post.service';
import { CreatePost, Post } from '../models/post.model';
import { Validators } from '@angular/forms';
import { TokenStorageService } from '../service/token-storage.service';
import { User } from '../models/user.model';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
})
export class PostFormComponent implements OnInit {
  @Output() postCreated = new EventEmitter<Post>();
  postForm!: FormGroup;
  message: string = '';
  user!: any;
  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private storageService: TokenStorageService,
    
  ) {}

  ngOnInit() {
    this.user = this.storageService.getUser();
    console.log(this.user);
    this.postForm = this.formBuilder.group({
      postName: ['', Validators.required],
      postContent: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      const post: CreatePost = {
        namePost: this.postForm.value.postName,
        contentPost: this.postForm.value.postContent,
        imageUrl: this.postForm.value.imageUrl,
      };
      this.postService.createPost(post, this.user.id!).subscribe((post) => {
        this.message = 'Post créé avec succés';
        this.postCreated.emit(post);
      });
    }

    // TODO: Add code to save the post
  }
}

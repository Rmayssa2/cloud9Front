import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PostService } from '../services/post.service';
import { CreatePost, Post } from '../models/post.model';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
})
export class PostFormComponent implements OnInit {
  postForm!: FormGroup;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService
  ) {}

  ngOnInit() {
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
      this.postService.createPost(post).subscribe((posts) => {
        this.message = 'Post créé avec succés';
        window.location.reload();
      });
    }

    // TODO: Add code to save the post
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PostService } from '../services/post.service';
import { CreatePost, Post } from '../models/post.model';

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
      postName: '',
      postContent: '',
      imageUrl: '',
    });
  }

  onSubmit() {
    const post: CreatePost = {
      namePost: this.postForm.value.postName,
      contentPost: this.postForm.value.postContent,
      imageUrl: this.postForm.value.imageUrl,
    };
    this.postService.createPost(post).subscribe((posts) => {
      this.message = 'Créé avec succés';
    });

    // TODO: Add code to save the post
  }
}

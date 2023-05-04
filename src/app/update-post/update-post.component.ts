import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TokenStorageService } from '../service/token-storage.service';
import { PostService } from '../services/post.service';
import { CreatePost, Post, UpdatePost } from '../models/post.model';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css'],
})
export class UpdatePostComponent implements OnInit {
  @Input() post!: Post;
  @Output() updatePost = new EventEmitter<Post>();
  postForm!: FormGroup;
  user!: any;
  message!: string;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private storageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    // Get the current user
    this.user = this.storageService.getUser();

    // Initialize the post form
    this.postForm = this.formBuilder.group({
      postName: [this.post.namePost, Validators.required],
      postContent: [this.post.contentPost, Validators.required],
      imageUrl: [this.post.imageUrl, Validators.required],
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      const post: UpdatePost = {
        idPost: this.post.idPost,
        namePost: this.postForm.value.postName,
        contentPost: this.postForm.value.postContent,
        imageUrl: this.postForm.value.imageUrl,
      };
      const postId = this.post.idPost;
      this.postService.updatePost(post).subscribe((updatedPost) => {
        this.message = 'Post modifié avec succès';
        this.updatePost.emit(updatedPost);
        // Do something with the success message, e.g. display it to the user
      });
    }
  }
}

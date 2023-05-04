import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post, UpdatePost } from '../models/post.model';
import { TokenStorageService } from '../service/token-storage.service';
import { FormGroup } from '@angular/forms';
import { post } from 'jquery';

@Component({
  selector: 'app-blog-one',
  templateUrl: './blog-one.component.html',
  styleUrls: ['./blog-one.component.css'],
})
export class BlogOneComponent implements OnInit {
  posts: Post[] = [];
  postForm!: FormGroup;
  showForm: boolean = false;

  user!: any;
  filterValue: string = '';
  showButtons: boolean = false;
  updateForm: number = 0;

  constructor(
    private postService: PostService,
    private storageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    console.log('Current user:', this.storageService.getUser()); // add this line to check the user value
    this.user = this.storageService.getUser();
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }
  clearFilter(): void {
    this.showButtons = false;
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }
  getPostsByUser(): void {
    this.showButtons = true;
    const userId = this.storageService.getUser().id;

    this.postService.getPostsByUser(userId).subscribe((posts) => {
      this.posts = posts;
    });
  }

  showPostForm(): void {
    this.showForm = !this.showForm;
  }
  openUpdateForm(postId: number) {
    this.updateForm = postId;
  }
  deletePost(postId: number): void {
    this.postService.removePost(postId).subscribe(() => {
      this.posts = this.posts.filter((post) => post.idPost != postId);
    });
  }
  handleUpdatePost($event: any) {
    this.updateForm = 0;
    this.postService.getPostsByUser(this.user.id).subscribe((posts) => {
      this.posts = posts;
    });
  }
}

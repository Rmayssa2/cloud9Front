import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.css'],
})
export class PostSearchComponent {
  searchTerm!: string;
  posts: Post[] = [];

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit() {}

  search(): void {
    if (this.searchTerm.trim()) {
      this.postService.searchPosts(this.searchTerm).subscribe((posts) => {
        this.posts = posts;
      });
    }
  }

  goToPost(postId: number): void {
    this.router.navigate(['/single-blog', postId]);
  }
}

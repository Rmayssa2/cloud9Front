import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-popular-posts',
  templateUrl: './popular-posts.component.html',
  styleUrls: ['./popular-posts.component.css'],
})
export class PopularPostsComponent implements OnInit {
  posts!: Post[];
  constructor(private postService: PostService) {}
  ngOnInit(): void {
    this.postService.getBestPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }
}

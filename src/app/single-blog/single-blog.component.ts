import { Component, OnInit } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { Comment } from '../models/comment.model';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';
@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.css'],
})
export class SingleBlogComponent implements OnInit {
  comments: Comment[] = [];
  post!: Post;
  postId!: number;

  constructor(
    private commentService: CommentService,
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.postId = this.route.snapshot.params['postId'];
    this.postService.getPost(this.postId).subscribe((post) => {
      this.post = post;
    });
    this.commentService.getCommentsByPost(this.postId).subscribe((comments) => {
      this.comments = comments;
      console.log(this.comments);
    });
  }
}

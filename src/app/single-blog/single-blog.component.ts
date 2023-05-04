import { Component, OnInit } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { Comment } from '../models/comment.model';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';
import { TokenStorageService } from '../service/token-storage.service';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.css'],
})
export class SingleBlogComponent implements OnInit {
  comments: any[] = [];
  comment!: Comment;
  post!: Post;
  posts: Post[] = [];
  postId!: number;
  user!: any;

  updateComment: number = 0;
  updatedcomment!: Comment;
  
  constructor(
    private commentService: CommentService,
    private postService: PostService,
    private storageService: TokenStorageService,

    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.postId = +params.get('postId')!;
      this.postService.getPost(this.postId).subscribe((post) => {
        this.post = post;
      });

      this.commentService
        .getCommentsByPost(this.postId)
        .subscribe((comments) => {
          this.comments = comments;
        });
    });
  }
  removeComment(id: number): void {
    this.commentService.removeComment(id).subscribe(() => {
      this.comments = this.comments.filter((c) => c.idComment !== id);
    });
  }
  onCommentUpdated(comment: Comment): void {
    this.updateComment = 0;
    this.commentService
      .getCommentsByPost(comment.post.idPost)
      .subscribe((comments) => {
        this.comments = comments;
      });
  }
  editComment(comment: Comment): void {
    this.updateComment = comment.idComment;
  }
}

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Comment } from '../models/comment.model';
import { CommentService } from '../services/comment.service';
import { TokenStorageService } from '../service/token-storage.service';

@Component({
  selector: 'app-comment-blog',
  templateUrl: './comment-blog.component.html',
  styleUrls: ['./comment-blog.component.css'],
})
export class CommentBlogComponent implements OnInit {
  commentedited!: boolean;
  user!: any;
  @Input() comment!: Comment;
  @Output() commentUpdated = new EventEmitter<Comment>();
  editedComment!: Comment;

  constructor(
    private commentService: CommentService,
    private storageService: TokenStorageService
  ) {}
  ngOnInit() {
    this.user = this.storageService.getUser();
  }
  ngOnChanges() {
    this.editedComment = { ...this.comment };
  }

  onSubmit() {
    this.user = this.storageService.getUser();
    console.log(this.user);

    this.commentService
      .editComment(this.editedComment)
      .subscribe((updatedComment: Comment) => {
        this.commentUpdated.emit(updatedComment);
      });
  }
}

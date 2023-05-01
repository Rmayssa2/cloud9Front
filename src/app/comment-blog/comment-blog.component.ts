import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from '../models/comment.model';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-comment-blog',
  templateUrl: './comment-blog.component.html',
  styleUrls: ['./comment-blog.component.css'],
})
export class CommentBlogComponent {
  commentedited!: boolean;
  @Input() comment!: Comment;
  @Output() commentUpdated = new EventEmitter<Comment>();

  editedComment!: Comment;

  constructor(private commentService: CommentService) {}

  ngOnChanges() {
    this.editedComment = { ...this.comment };
  }

  onSubmit() {
    this.commentService
      .editComment(this.editedComment)
      .subscribe((updatedComment: Comment) => {
        this.commentUpdated.emit(updatedComment);
      });
  }
}

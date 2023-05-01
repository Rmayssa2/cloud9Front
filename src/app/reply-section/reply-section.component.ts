import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { Comment } from '../models/comment.model';

@Component({
  selector: 'app-reply-section',
  templateUrl: './reply-section.component.html',
  styleUrls: ['./reply-section.component.css'],
})
export class ReplySectionComponent {
  commentContent: string = '';
  comments: Comment[] = [];
  @Input() postId!: number;
  constructor(private commentService: CommentService) {}

  onSubmit = (event: any) => {
    this.commentService
      .createComment({ content: this.commentContent }, this.postId, 1)
      .subscribe((result) => {
        console.log(result);
        this.comments.push(result);
        window.location.reload();
      });
  };
  onContentChange = (newValue: string) => {
    this.commentContent = newValue;
  };
}

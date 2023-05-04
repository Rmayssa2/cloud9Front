import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { Comment } from '../models/comment.model';
import { TokenStorageService } from '../service/token-storage.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-reply-section',
  templateUrl: './reply-section.component.html',
  styleUrls: ['./reply-section.component.css'],
})
export class ReplySectionComponent {
  commentContent: string = '';
  comments: Comment[] = [];
  user!: any;

  @Input() postId!: number;
  constructor(
    private commentService: CommentService,
    private storageService: TokenStorageService
  ) {}
  ngOnInit() {
  }
  onSubmit = (event: any) => {
    this.user = this.storageService.getUser();
    console.log(this.user);
    this.commentService
      .createComment(
        { content: this.commentContent },
        this.postId,
        this.user.id
      )
      .subscribe((result) => {
        console.log(result);
        this.comments.push(result);
        window.location.reload();
      });
  };
  onContentChange = (newValue: string) => {
    console.log(this.user);
    this.commentContent = newValue;
  };
}

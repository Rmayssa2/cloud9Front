import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import {
  Reaction,
  ReactionType,
  createReaction,
} from '../models/reaction.model';
import { PostService } from '../services/post.service';
import { ReactionService } from '../services/reaction.service';
import { User } from '../models/user.model';
@Component({
  selector: 'app-reactions',
  templateUrl: './reactions.component.html',
  styleUrls: ['./reactions.component.css'],
})
export class ReactionsComponent implements OnInit {
  @Input() post!: Post;
  @Input() user!: any;
  reactionByUser!: Reaction;
  reactions!: Reaction[];
  reactionsNumbers: {
    love: number;
    like: number;
    dislike: number;
    [key: string]: number; // Define index signature
  };
  reacted!: boolean;
  userReaction: ReactionType | null = null;
  reactionType = ReactionType;
  selectedReaction: ReactionType = ReactionType.LIKE;
  constructor(private reactionService: ReactionService) {
    this.reactionsNumbers = { love: 0, like: 0, dislike: 0 };
  }

  ngOnInit(): void {
    this.getReactions();
  }

  getReactions(): void {
    this.reactionService
      .getReactionsByPost(this.post.idPost)
      .subscribe((data: Reaction[]) => {
        this.reactions = data;
        let likes = this.reactions.filter(
          (value) => value.reactionType == ReactionType.LIKE
        );
        let dislikes = this.reactions.filter(
          (value) => value.reactionType == ReactionType.DISLIKE
        );
        let love = this.reactions.filter(
          (value) => value.reactionType == ReactionType.LOVE
        );
        this.reactionsNumbers.like = likes.length;
        this.reactionsNumbers.dislike = dislikes.length;
        this.reactionsNumbers.love = love.length;
        this.reactionByUser = this.reactions.find(
          (value) => value.user.idUser == this.user.id
        )!;
        this.reacted = this.reactionByUser != undefined;
        /*data.forEach((reaction: Reaction) => {
          const reactionType = reaction.reactionType.toLowerCase();
          if (reactionType in this.reactionsNumbers) {
            this.reactionsNumbers[reactionType]++;
            if (reaction.user === this.user.id) {
              this.reacted = true;
              this.selectedReaction = reaction.reactionType;
            }
          }
        });*/
      });
  }
  onReactionChange(reactionType: ReactionType): void {
    this.selectedReaction = reactionType;
    if (!this.reacted) {
      this.createReaction(reactionType);
    } else {
      this.deleteReaction();
    }
  }

  onLove(): void {
    if (!this.reacted) {
      this.createReaction(ReactionType.LOVE);
      this.reactionsNumbers.love++;
      this.reacted = true;
    } else if (this.reactionByUser.reactionType == ReactionType.LOVE) {
      this.deleteReaction();
      this.reacted = false;
      this.reactionsNumbers.love--;
    }
  }

  onLike(): void {
    if (!this.reacted) {
      this.createReaction(ReactionType.LIKE);
      this.reactionsNumbers.like++;
      this.reacted = true;
    } else if (this.reactionByUser.reactionType == ReactionType.LIKE) {
      this.deleteReaction();
      this.reactionsNumbers.like--;
      this.reacted = false;
    }
  }

  onDislike(): void {
    if (!this.reacted) {
      this.createReaction(ReactionType.DISLIKE);
      this.reactionsNumbers.dislike++;
      this.reacted = true;
    } else if (this.reactionByUser.reactionType == ReactionType.DISLIKE) {
      this.deleteReaction();
      this.reactionsNumbers.dislike--;
      this.reacted = false;
    }
  }
  deleteReaction() {
    this.reactionService
      .removeReaction(this.reactionByUser.idReaction)
      .subscribe((data) => {
        this.reactions = this.reactions.filter(
          (value) => value.idReaction != this.reactionByUser.idReaction
        );
      });
  }

  createReaction(reactionType: ReactionType): boolean {
    if (this.reacted) {
      return false;
    } else {
      const newReaction: createReaction = {
        reactionType: reactionType,
      };

      this.reactionService
        .createReaction(newReaction, this.post.idPost, this.user.id!)
        .subscribe((data: Reaction) => {
          this.reactions.push(data);
          this.reactionByUser = data;
          console.log(`Created reaction: ${data.reactionType}`);
        });
      return true;
    }
  }
}

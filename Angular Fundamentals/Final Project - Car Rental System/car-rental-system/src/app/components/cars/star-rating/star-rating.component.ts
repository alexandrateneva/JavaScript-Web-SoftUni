import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IStarRatingOnClickEvent,
  IStarRatingOnRatingChangeEven,
  IStarRatingIOnHoverRatingChangeEvent
} from 'angular-star-rating/src/star-rating-struct';
import { CarsService } from '../../../core/services/cars.service';
import { CarModel } from '../../../core/models/cars/car.model';
import { ToastrService } from 'ngx-toastr';
import { VoteModel } from '../../../core/models/cars/vote.model';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {
  totalRating: number = 0;
  yourRating: number = 0;
  private car: CarModel;
  private isFirst: boolean = true;
  private hasVoted: boolean = false;

  onClickResult: IStarRatingOnClickEvent;
  onHoverRatingChangeResult: IStarRatingIOnHoverRatingChangeEvent;
  onRatingChangeResult: IStarRatingOnRatingChangeEven;

  constructor(
    private carsService: CarsService,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit() {
    let carId = this.route.snapshot.params['id'];
    let userId = localStorage.getItem('id');

    this.carsService.getDetails(carId).subscribe(data => {
      this.car = data;
      if (this.car.votes.length > 0) {
        this.updateTotalRating();
        if (this.car.votes.findIndex(v => v.userId === userId) >= 0) {
          this.hasVoted = true;
          this.yourRating = this.car.votes.find(v => v.userId === userId).vote;
        }
      }
    })
  }

  onClick = ($event: IStarRatingOnClickEvent) => {
    console.log('onClick $event: ', $event);
    this.onClickResult = $event;

    this.hasVoted = true;
  };

  onRatingChange = ($event: IStarRatingOnRatingChangeEven) => {
    console.log('onRatingUpdated $event: ', $event);
    this.onRatingChangeResult = $event;

    let userId = localStorage.getItem('id');
    let newRating = this.onRatingChangeResult.rating;
    if (this.hasVoted) {
      this.car.votes.find(v => v.userId === userId).vote = newRating;
    } else {
      let vote = new VoteModel(userId, newRating);
      this.car.votes.push(vote);
    }
    this.yourRating = newRating;
    this.car.votes.find(v => v.userId === userId).vote = newRating;
    this.updateTotalRating();
    if (!this.isFirst) {
      this.carsService.edit(this.car._id, this.car).subscribe(() => {
        this.toastr.success('You rate the car successful!', 'Success!');
      });
    }
    this.isFirst = false;
  };

  updateTotalRating(): void {
    if (this.car.votes.length > 0) {
      let votesCount = this.car.votes.length;
      let allVotes = this.car.votes.map(v => v.vote).reduce((a, b) => a + b, 0);
      this.totalRating = Math.round(allVotes / votesCount);
    } else {
      this.totalRating = 0;
    }
  }

  get rating(): number {
    return this.totalRating;
  }
}

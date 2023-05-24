import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/model/track.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs'; //* Programación Ractiva

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css'],
})
export class MediaPlayerComponent implements OnInit, OnDestroy {

  mockCover: TrackModel = {
    cover:
      'https://avatars.githubusercontent.com/u/118630975?s=400&u=0918bd06bbe3b041ac0cef477dc7ce307189995c&v=4',
    album: 'Gioly & Ashe',
    name: 'BEBESITTA',
    url: 'https://avatars.awdawd.com/u/',
    _id: 1,
  };

  listObservers$: Array<Subscription> = [];

  constructor(private multimediaService: MultimediaService) { }

  ngOnInit(): void {
    const observer1$: Subscription = this.multimediaService.callBack.subscribe(
      (response: TrackModel) => {
        console.log('Recibiendo Canción', response);
      }
    )

    this.listObservers$ = [observer1$]
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe());
    console.log('Complete Destroy')
  }

}

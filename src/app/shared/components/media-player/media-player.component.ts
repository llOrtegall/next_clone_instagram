import { Component } from '@angular/core';
import { TrackModel } from '@core/model/track.model';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css'],
})
export class MediaPlayerComponent {
  mockCover: TrackModel = {
    cover:
      'https://avatars.githubusercontent.com/u/118630975?s=400&u=0918bd06bbe3b041ac0cef477dc7ce307189995c&v=4',
    album: 'Gioly & Ashe',
    name: 'BEBESITTA',
    url: 'https://avatars.awdawd.com/u/',
    _id: 1,
  };
}

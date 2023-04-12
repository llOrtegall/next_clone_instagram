import { Component } from '@angular/core';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent {

  mockCover: any = {
    cover: 'https://avatars.githubusercontent.com/u/118630975?s=400&u=0918bd06bbe3b041ac0cef477dc7ce307189995c&v=4',
    album: 'Gioly & Ashe',
    name: 'BEBESITTA',
  }

}

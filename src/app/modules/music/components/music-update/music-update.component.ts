import { Component, Input, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Song } from 'src/app/core/models/song';
import { SongsService } from 'src/app/core/services/music/songs/songs.service';
@Component({
  selector: 'app-music-update',
  templateUrl: './music-update.component.html',
  styleUrls: ['./music-update.component.css']
})
export class MusicUpdateComponent {
  musicDetails$!: Observable<Song>;
  @Input() song: Song = {} as Song;
  constructor(private songService: SongsService,
    private route: ActivatedRoute,
    private renderer: Renderer2){

    }

  updateSong(){
    this.musicDetails$.subscribe((song : Song)=>{
      if(song){
        console.error("No hay datos para actualizar.")
        return;
      }
      this.songService.updateSong(this.song._id).subscribe(
        (response)=> {
        }
      )

    })
  }

  closeUpdateDetails(){

    console.log('execute closeupdate')
    this.songService.$songUpdateDetails.emit(false);
  }

}

import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent {

  nuevasCanciones: any[] = []; 
  
  loading: boolean;
  
  error: boolean;
  mensajeError: string;

  constructor( private spotify: SpotifyService) {

    this.error = false;
    this.loading = true;
    this.spotify.getNewReleases()
      .subscribe( (data:any) => {
          this.nuevasCanciones = data;
          this.loading = false;
      }, (error) =>{
        this.loading = false;
        this.error = true;
        this.mensajeError= error.error.error.message;
      });

   }

}

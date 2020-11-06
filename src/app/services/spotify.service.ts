import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log("Spotify service ready")
  }

  getQuery( query:string){
    const url= `https://api.spotify.com/v1/${query}`;
    const token ='BQD78OaLtPDR9eNEn54d6RJOwAoK-ZHa3Vfmp2XPSOJHkC_HI3M0hqfiRKFSK6xTZgZ_YwPMMlDMUE7cFSE';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });

    return this.http.get(url, {headers});

  }

  getNewReleases(){
    return this.getQuery('browse/new-releases?limit=20')
      .pipe(map(data=>{
        return data['albums'].items
      }))
  }

  getArtistas(termino: string){
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
      .pipe(map(data=> data['artists'].items))
    }
    getArtista(id: string){
      return this.getQuery(`artists/${id}`);
    }
    
  getTopTracks(id: string){
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
      .pipe(map(data=> data['tracks']));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FlickrService {

	 private flickrParams = {
    params: {
      api_key:'16214f5f4e7439ea82203b0a0c1238a7',
      format:'json',
      nojsoncallback:'1',
      per_page:'30'
    }
  }

  private flickrUrl = "https://api.flickr.com/services/rest/";

  constructor(private http: HttpClient) { }


  getDishPics(): Observable<any> {
    const API_URL = this.flickrUrl;
    this.flickrParams.params['method'] = 'flickr.photos.search';
    this.flickrParams.params['tags'] = 'food';
   
 
    return this.http.get<any>(API_URL,this.flickrParams);
  }

  getDishInfo(photoId:number): Observable<any> {
    const API_URL = this.flickrUrl;
    this.flickrParams.params['method'] = 'flickr.photos.getInfo';
    this.flickrParams.params['photo_id'] = photoId;
    return this.http.get<any>(API_URL,this.flickrParams);
  }

  formFlickrData(food:any): string {
    return 'http://farm'+food.farm+'.static.flickr.com/'+food.server+'/'+food.id+'_'+food.secret+'.jpg';
  }

  createToast(message:string, backgroundColor:string) {
    console.log("tst");
    let snackbar = document.getElementById("snackbar");
    console.log(snackbar);
    snackbar.className = "showToast";
    snackbar.style.background = backgroundColor || "#000";
    snackbar.innerHTML = message;
    setTimeout(() => {
      snackbar.className = snackbar.className.replace("showToast", "");
    }, 3000);
  }

  // postRequest(url:string, body:any): Observable<any> {
  //   const API_URL = this.apiUrl.concat(url);
  //   return this.http.post<any>(API_URL,body);
  // }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

const httpOptions= {
	headers: new HttpHeaders({
		'Content-Type': 'text/plain',
		//'Access-Control-Allow-Origin' : 'http://localhost:8080/RobotinoApp/Servlet',
	})
}

@Injectable()
export class DashboardService {

  url: string = '/api';
  constructor(private http: HttpClient) { }

  sendPost(urlappend: any, data: any){
		let send = this.url + urlappend;
  	return this.http.post(send, data, httpOptions)
  }

	  sendData(data: any){
	  	return this.http.post(this.url, data, httpOptions)
	  }
	sendGet(urlappend: any){
		let send = this.url + urlappend;
		return this.http.get(send, httpOptions);
	}

}

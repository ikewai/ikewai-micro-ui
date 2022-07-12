import { Injectable } from '@angular/core';
import { Metadata } from '../_models/metadata';
import { User } from '../_models/user';
import { Observable, of, throwError } from 'rxjs';
//import { MessageService } from './message.service';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { map, retry, catchError } from 'rxjs/operators';
import { AppConfig } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient)  {
    console.log('does this get built?')
  }


  request(body: any): Promise<Metadata[]> {
    //let query = "[{'$and':[{'value.loc': {$geoWithin: {'$geometry':" + JSON.stringify(geometry).replace(/"/g,'\'') + "}}}]}, {$count: 'test'}]";

    // interface ResponseResults {
    //  result: any
    // }

    //console.log(AppConfig.settings.aad.tenant);

    let url = AppConfig.settings.aad.tenant + "/meta/v2/data/";

    //console.log(url);
    let head = new HttpHeaders()
    .set("Content-Type", "application/json")
    // .set("Authorization", "Bearer "); 
    let params: HttpParams = new HttpParams()
    .append("method", "POST")
    .append("lifetime", "3600")
    .append("maxUses", "10");
    let options = {
      headers: head,
      observe: <any>"response",
      //params: params
    };
    //console.log("stuff");

    // let response = this.http.post<any>(url, options)
    //  .pipe(
    //   retry(3),
    //   map((data: any) => {
    //     console.log(data);
    //     return data.body.result;
    //   }),
    //   catchError((e: HttpErrorResponse) => {
    //     console.log(e);
    //     let err: {
    //       message: string,
    //       status: number
    //     };
    //     err = typeof e == "string" ? {
    //       message: e,
    //       status: 500
    //     } : {
    //       message: e.message,
    //       status: e.status
    //     }
    //     //e is just being returned as a string for some reason???
    //     //if this is the case set up manually and just assume status 500
    //     return throwError(err);
    //   })
    // );

    // console.log(body, 'wat?')
    // body = JSON.stringify(body);
    // console.log(body, 'wat?')

    let response = this.http.post<any>(url, body, options)
     .pipe(
      retry(0),
      map((data: any) => {
        console.log(data, ' do i get any data back?')
        // return data.body.result;
        return data;
      }),
      catchError((e: HttpErrorResponse) => {
        console.log(e, ' what is my error?')
        let err: {
          message: string,
          status: number
        };
        err = typeof e == "string" ? {
          message: e,
          status: 500
        } : {
          message: e.message,
          status: e.status
        }
        //e is just being returned as a string for some reason???
        //if this is the case set up manually and just assume status 500
        return throwError(err);
      })
    );
    return response.toPromise();
   }
}
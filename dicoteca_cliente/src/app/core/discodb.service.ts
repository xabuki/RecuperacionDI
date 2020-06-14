import { IDisco } from '../share/interfaces';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DiscodbService {
  private discosUrl = 'http://127.0.0.1:8000/products';

  constructor(private http: HttpClient) { }

  getDiscos(): Observable<IDisco[]> {
    return this.http.get<IDisco[]>(this.discosUrl)
      .pipe(
        tap(data => {
          console.log(JSON.stringify(data))
        }
        ),
        catchError(this.handleError)
      );
  }

  getMaxDiscoId(): Observable<IDisco> {
    return this.http.get<IDisco[]>(this.discosUrl)
    .pipe(
      // Get max value from an array
      map(data => Math.max.apply(Math, data.map(function(o) { return o.id; }))   ),
      catchError(this.handleError)
    );
  }

  getDiscoById(id: number): Observable<IDisco> {
    const url = `${this.discosUrl}/${id}`;
    return this.http.get<IDisco>(url)
      .pipe(
        tap(data => console.log('getDisco: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createDisco(disco: IDisco): Observable<IDisco> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    disco.id = null;
    return this.http.post<IDisco>(this.discosUrl, disco, { headers: headers })
      .pipe(
        tap(data => console.log('createDisco: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteDisco(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.discosUrl}/${id}`;
    return this.http.delete<IDisco>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteDisco: ' + id)),
        catchError(this.handleError)
      );
  }

  updateDisco(disco: IDisco): Observable<IDisco> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.discosUrl}/${disco.id}`;
    return this.http.put<IDisco>(url, disco, { headers: headers })
      .pipe(
        tap(() => console.log('updateDisco: ' + disco.id)),
        // Return the disco on an update
        map(() => disco),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}

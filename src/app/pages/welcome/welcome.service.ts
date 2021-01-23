import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { endpoints } from 'src/app/config/endpoints';
import { Pagination } from 'src/app/shared/model/pagination';


@Injectable({
  providedIn: 'root'
})
export class WelcomeService {

  constructor(
    private http: HttpClient
  ) { }

  searchGithubRepo(pagination: Pagination, query: string, language: string): Observable<any> {

    const options = {
      params: new HttpParams()
        .set('q', query)
        .append('per_page', pagination.limit.toString(10))
        .append('page', (pagination.page).toString(10))
    };

    return this.http.get(endpoints.github.searchRepo, options).pipe(tap(resp => {} ));
  }
}

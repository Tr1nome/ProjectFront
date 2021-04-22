import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../class/article';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getAllArticles() : Observable<Article[]>{
    return this.http.get<Article[]>(environment.server + '/api/articles');
  }
}

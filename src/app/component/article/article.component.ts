import { Component, OnInit } from '@angular/core'; 
import { Article } from 'src/app/class/article';
import { ArticleService } from 'src/app/service/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  articles: Article[];
  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.getAllArticle();
  }

  public getAllArticle() : void {
    this.articleService.getAllArticles().subscribe(data => {
      this.articles = data;
    });
  }

}

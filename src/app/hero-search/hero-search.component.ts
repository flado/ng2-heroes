import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';


@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  heroes$: Observable<Hero[]>;

  //A Subject is both a source of observable values
  //and an Observable itself. You can subscribe
  //to a Subject as you would any Observable.
  //The searchTerms becomes an Observable emitting a steady stream of search terms.
  private searchTerms = new Subject<string>();//property is declared as an RxJS Subject.

  constructor(private heroService: HeroService) { }

  // Push a search term into the 'searchTerms' observable stream.
  //he search() method is called via an event binding to the textbox's keystroke event.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  /**
   * Passing a new search term directly to the searchHeroes() after every user keystroke would create an excessive amount of HTTP requests, taxing server resources and burning through the cellular network data plan.
   * Instead, the ngOnInit() method pipes the searchTerms 
   * observable through a sequence of RxJS operators that 
   * reduce the number of calls to the searchHeroes(),
   *  ultimately returning an observable of timely hero
   *   search results (each a Hero[]).
   */
  ngOnInit() {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      //ignore the new term if same as previous term
      distinctUntilChanged(),
      //switch to new search observable each time the term changes
      //switchMap() preserves the original request order while returning only the observable from the most recent HTTP method call. Results from prior calls are canceled and discarded.
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }



}

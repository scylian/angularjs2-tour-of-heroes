import { Injectable }     from '@angular/core';
import { Headers, Http }  from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero }           from './hero';

@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes'; // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});
  
  constructor(private http: Http) { }
  
  // Method for returning list of all heroes
  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
               .toPromise()
               .then(response => response.json().data as Hero[])
               .catch(this.handleError);
  }
  
  // Method for returning single hero
  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    
    return this.http.get(url)
               .toPromise()
               .then(response => response.json().data as Hero)
               .catch(this.handleError);
  }
  
  // Method for changing hero names
  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    
    return this.http.put(url, JSON.stringify(hero), {headers: this.headers})
               .toPromise()
               .then(() => hero)
               .catch(this.handleError);
  }
  
  // Method for adding new heroes
  create(name: string): Promise<Hero> {
    return this.http.post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
               .toPromise()
               .then(res => res.json().data)
               .catch(this.handleError);
  }
  
  // Method for removing heroes
  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    
    return this.http.delete(url, {headers: this.headers})
               .toPromise()
               .then(() => null)
               .catch(this.handleError);
  }
  
  // Method to handle HTTP request errors
  private handleError(error: any): Promise<any> {
    console.error('An error occured', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
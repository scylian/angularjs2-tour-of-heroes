import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';

import { Hero }                 from '../hero';
import { HeroService }          from '../hero.service';


@Component({
  moduleId: module.id,
  selector: 'heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
  providers: []
})

export class HeroesComponent implements OnInit {
  heroes: Hero[]; // Define empty heroes array to be filled with service
  selectedHero: Hero;
  
  constructor(
    private heroService: HeroService, // Inject HeroService in constructor and hold in private field
    private router: Router) { }

  ngOnInit(): void {
    this.getHeroes(); // Call function to call service inside ngOnInit() lifecycle hook
  }

  // Function to call service and retrieve list of heroes
  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  
  // Method for directing to specific hero
  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
  
  // Method for adding new heroes
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name)
        .then(hero => {
          this.heroes.push(hero);
          this.selectedHero = null;
        });
  }
  
  // Method for removing heroes
  delete(hero: Hero): void {
    this.heroService.delete(hero.id)
        .then(() => {
          this.heroes = this.heroes.filter(h => h !== hero);
          if (this.selectedHero === hero ) { this.selectedHero = null; }
        });
  }
}
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit, OnDestroy {
  constructor(private recipeService: RecipesService, private route: Router) {}
  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }
  recipes: Recipe[];
  recipeSubscription: Subscription;

  goToRecipe(id: string) {
    console.log('this is me ');
    this.route.navigate(['/recipes', id]);
  }

  ngOnInit() {
    this.recipes = this.recipeService.getAllRecipes();
    this.recipeSubscription = this.recipeService.recipesSubject.subscribe(
      (data: Recipe[]) => {
        this.recipes = data;
      }
    );
  }
}

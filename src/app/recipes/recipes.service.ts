/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  recipesSubject = new Subject();
  private recipes: Recipe[] = [
    {
      id: '1',
      title: 'shnitzel',
      imageUrl:
        'https://www.lilvienna.com/wp-content/uploads/Recipe-Viennese-Pork-Schnitzel.jpg',
      ingredients: ['fries', 'porkjk', 'salad'],
    },
    {
      id: '2',
      title: 'pizza',
      imageUrl:
        'https://media.istockphoto.com/photos/cheesy-pepperoni-pizza-picture-id938742222?k=6&m=938742222&s=612x612&w=0&h=on_9ZYG1SG4Xgk7BLZSlaXJl8VYb6ZePDHTN6zukDHM=',
      ingredients: ['daugh', 'tomato', 'cheese'],
    },
    {
      id: '3',
      title: 'beefBurger',
      imageUrl:
        'https://www.thedorsetmeatcompany.co.uk/theme-content/uploads/2018/05/kIVLTxgo.jpeg',
      ingredients: ['beef', 'bread', 'salad'],
    },
  ];
  constructor() {}
  getAllRecipes() {
    return [...this.recipes];
  }

  getRecipeById(recipeId: string) {
    return {
      ...this.recipes.find((recipe) => {
        return recipe.id === recipeId;
      }),
    };
  }

  deleteRecipe(recipeId: string) {
    this.recipes = this.recipes.filter((recipe) => recipe.id !== recipeId);
    this.recipesSubject.next(this.recipes);
  }
}

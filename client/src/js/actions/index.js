const URL = 'http://localhost:8081/api/v1/recipes';

export function fetchRecipes() {
  const req = fetch(URL, { method: 'GET' }).then(res => res.json());
  return { type: 'RECIPES', payload: req };
}

export function getRecipe(id) {
  const req = fetch(`${URL}/id`, { method: 'GET' }).then(res => res.json());
  return { type: 'RECIPE', payload: req };
}

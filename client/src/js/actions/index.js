const URL = 'http://localhost:8081/api/v1/recipes';

export function fetchRecipes(){
    const req = fetch(URL, {method: 'GET'})
    .then(res => res.json());
    return {type: 'RECIPES', payload: req}
}

// export function latestNews() {
//   const req = fetch(`${URL}/articles?_order=desc&_end=3`, {method: 'GET'})
//   .then(res => res.json());
//   return {type: 'LATEST_NEWS', payload: req}
// }
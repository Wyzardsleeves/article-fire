export const UPDATE_SEARCH = 'searches:updateSearch';

export function updateSearch(newSearch){
  return{
    type: UPDATE_SEARCH,
    payload: {
      search: newSearch
    }
  }
}

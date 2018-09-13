import { UPDATE_SEARCH } from '../actions/searchAction'

export default function searchReducer(state = '', { type, payload
  }){
  switch(type){
    case UPDATE_SEARCH:
      return payload.search;
    default:
      return state;
  }
}

import initialState from './initialState';
const DEFAULT_STATE = initialState.list;
const list = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'SET_CURRENT_PAGE':
      return Object.assign({}, state, {
        currentPage: action.currentPage,
      });
    case 'SET_TOTAL_NUM':
      return Object.assign({}, state, {
        totalNum: action.totalNum,
      });
    case 'SET_ARTICLE':
      return Object.assign({}, state, {
        article: action.article,
      });
    case 'SET_ARTICLE_LOADING':
      return Object.assign({}, state, {
        isActicleLoading: action.isActicleLoading,
      });
    default:
      return state;
  }
};

export default list;

import { logger, getUserInfo, ajaxFetch } from '../utils/';
const userInfo = getUserInfo();

export const setArticle = (article) => {
  return {
    type: 'SET_ARTICLE',
    article: article,
  };
};
export const setArticleLoading = (isActicleLoading) => {
  return {
    type: 'SET_ARTICLE_LOADING',
    isActicleLoading: isActicleLoading,
  };
};

// 设置列表页面当前分页码
export const setCurrentPage = (currentPage) => {
  return {
    type: 'SET_CURRENT_PAGE',
    currentPage: currentPage,
  };
};
// 设置列表页面当前分页总数
const setTotalNum = (totalNum) => {
  return {
    type: 'SET_TOTAL_NUM',
    totalNum: totalNum,
  };
};
// 文章列表
export const loadArticle = (pageNo, pageSize) => {
  return dispatch => {
    if (!userInfo || !userInfo.client_id) {
      logger(`请求70201203的参数有错误, cookie中client_id 不存在`);
      return false;
    }
    dispatch(setArticleLoading(true));
    return ajaxFetch({
      id: '70201203',
      data: {
        client_id: userInfo.client_id,
        page_no: pageNo || 1,
        page_size: pageSize || 10,
      },
      success: (json) => {
        dispatch(setArticleLoading(false));
        if (json.error_no == '0' ) {
          dispatch(setArticle(json.result_list) || []);
          dispatch(setTotalNum(json.pagination.total_item_num));
        }
      }
    });
  };
};
// 删除文章
export const deleteArticle = (articleId, success, fail) => {
  return dispatch => {
    return ajaxFetch({
      id: '70201206',
      data: {
        article_id: articleId,
      },
      success: (json) => {
        if (json.error_no == '0' ) {
          if (typeof success == 'function') {
            success();
          }
        }else {
          if (typeof fail == 'function') {
            fail(json.error_info);
          }
        }
      }
    });
  };
};

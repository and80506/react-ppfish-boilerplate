import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import List from '../../components/List/List';
import { setCurrentPage, loadArticle, deleteArticle } from '../../actions/list';

const mapStateToProps = (state) => {
  const list = state.list;
  return {
    ...list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetCurrentPage: (currentPage, pageSize) => {
      dispatch(loadArticle(currentPage, pageSize));
      dispatch(setCurrentPage(currentPage));
    },
    onLoadArticle: (pageNo, pageSize) => {
      dispatch(loadArticle(pageNo, pageSize));
    },
    onDeleteArticle: (articleId, success, fail) => {
      dispatch(deleteArticle(articleId, success, fail));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);

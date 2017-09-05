import React, {Component, PropTypes} from 'react';
import Sidebar from '../Sidebar';
import classNames from 'classnames';
import './List.less';
import { Modal, Button, Pagination, Loading } from '../../components/';
import { getTimeBarStr, showFailModal } from '../../utils/';
import { getConfig } from '../../config';
const config = getConfig();
const confirm = Modal.confirm;

class App extends Component {
  constructor() {
    super();
    this.handleDeleteArticle = this.handleDeleteArticle.bind(this);
    this.pageSize = 5;
  }

  componentDidMount() {
    const { onLoadArticle } = this.props;
    onLoadArticle(1, this.pageSize);
  }

  handleDeleteArticle(articleId) {
    const { currentPage, onLoadArticle, onDeleteArticle } = this.props;
    const pageSize = this.pageSize;
    confirm({
      title: '您是否确认要删除这篇文章',
      content: '',
      onOk() {
        onDeleteArticle(articleId, () => {
          onLoadArticle(currentPage, pageSize);
        }, (errorInfo) => {
          showFailModal(errorInfo);
        });
      },
    });
  }

  getPubBtn() {
    const { totalNum } = this.props;
    if (!totalNum) {
      return null;
    }
    return (
      <div className="article-btn clearfix">
        <Button type="primary" size="large" onClick={() => window.open(config.url.articleDetail, '_self')}>发布新文章</Button>
      </div>
    );
  }

  getArticle() {
    const { article, isActicleLoading } = this.props;
    const articleIcon = require('../../assets/image/article-icon.png');
    const loadingIcon = require('../../assets/image/loading.gif');
    if (isActicleLoading) {
      return (
        <div className="article-loading">
          <Loading />
        </div>
      );
    }
    if (!article || !article.length) {
      return (
        <div className="article-empty">
          <div className="article-bg"><img src={articleIcon}/></div>
          <p className="article-empty-text">还没有发布新文章，赶紧发布你的文章吧</p>
          <div className="article-empty-btn">
            <Button type="primary" size="large" onClick={() => window.open(config.url.articleDetail, '_self')}>发布新文章</Button>
          </div>
        </div>
      );
    }
    return article.map((item, i) => {
      const getCoverImg = (url) => {
        if (!url) {
          return null;
        }
        return (
          <div className="article-img">
            <img src={url} width="100%" height="100%" />
          </div>
        );
      };
      const getArticleLeftCls = (url) => {
        return classNames({
          'article-left': true,
          'clearfix': true,
          'no-image': !url
        });
      };
      return (
        <div className="article-content clearfix" key={i}>
          <div className="article-box clearfix">
            <div className={getArticleLeftCls(item.cover_image_url)}>
              <div className="ellipsis article-title-2"><a href={item.href} target="_blank">{item.title}</a></div>
              <div className="article-date">
                <ul className="clearfix article-time">
                  <li><i className="iconfont">&#xe619;</i></li>
                  <li>{getTimeBarStr(item.published_datetime)}</li>
                </ul>
              </div>
              <div className="ellipsis-multiple-line-3 article">
                {item.descriptions}
              </div>
            </div>
            {getCoverImg(item.cover_image_url)}
          </div>
          <Button type="ghost" onClick={() => this.handleDeleteArticle(item.article_id)}>删除</Button>
          <div className="clearfix article-share">
            <ul>
              <li>
                <i className="iconfont">&#xe61a;</i>
              </li>
              <li style={{marginLeft: 5}}>{item.hits}</li>
              {/*
              <li>
                <i className="iconfont">&#xe61b;</i>
              </li>
              <li style={{marginLeft: 5}}>520</li>
               */}
            </ul>
          </div>
        </div>
      );
    });
  }

  getPagenation(){
    const { totalNum, currentPage, onSetCurrentPage, } = this.props;
    if (!totalNum) {
      return null;
    }
    return (
      <div className="clearfix article-pagination">
        <Pagination
          onChange={(currentPage) => onSetCurrentPage(currentPage, this.pageSize)}
          showQuickJumper
          defaultCurrent={1}
          current={currentPage}
          pageSize={this.pageSize}
          total={totalNum}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="ant-row">
        <div className="ant-col-6">
          <Sidebar />
        </div>
        <div className="ant-col-18">
          <div className="article-main">
            <div className="article-title-wrap">
              <h3 className="article-title-1">
                我的文章
              </h3>
            </div>
            {this.getPubBtn()}
            {this.getArticle()}
            {this.getPagenation()}
          </div>

        </div>
      </div>
    );
  }
}

App.propTypes = {
  isActicleLoading: PropTypes.bool,
  currentPage: PropTypes.number,
  totalNum: PropTypes.number,
  article: PropTypes.array,
  onSetCurrentPage: PropTypes.func,
  onLoadArticle: PropTypes.func,
  onDeleteArticle: PropTypes.func,
};

export default App;


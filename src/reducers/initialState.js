// 统一声明默认State
import { getAccessToken } from "../utils/index";
const pathname = location.pathname;
const currentMenu = pathname.slice(pathname.indexOf('/') + 1, pathname.lastIndexOf('/'));
export default {
  header: {
    current: currentMenu || 'home',
    isAuthenticated: !!getAccessToken(),
    isCheckLogin: false
  },
  login: {
    isLoginErrorVisible: false,
    loginErrorText: '',
    fields: {
      username: '',
      password: '',
    },
  },
  list: {
    currentPage: 1,
    article: [],
    isActicleLoading: true,
  }
};

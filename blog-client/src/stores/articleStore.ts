import {
  observable,
  runInAction,
  action,
  computed,
} from 'mobx';
import {
  articleService
} from '../apis/index.service';
import {
  IArticleDetail,
  IArchive,
  IDetail,
} from '../types/article';

import history from '../history';

import routePath from '@constants/routePath';

import {
  sortBy, setToast,
} from '@tools/tools';

class ArticleStore {
  @observable public posts: IArticleDetail[] = [];
  @observable public hots: IArticleDetail[] = [];
  @observable public tags: string[] = [];
  @observable public archives: IArchive[] = [];
  @observable public curPage: number = 1;
  @observable public total: number = 0;
  @observable public showSearch: boolean = false;
  @observable public likeNum: number = 0;
  @observable public isLiked: boolean = false;
  @observable public curIp: string = '';
  @observable public totalArticlesCount: number = 0;
  @observable public loading: boolean = false;
  @observable public detail: IDetail = {
    curArticle: {
      _id: '',
      header_cover: '',
      title: '',
      summary: '',
      contentHtml: '',
      publish_date: '',
      last_modified_date: '',
      tags: [],
      like_count: [],
      pv_count: 0,
    },
    nextArticle: {
      id: '',
      header_cover: '',
      title: '',
    },
    previousArticle: {
      id: '',
      header_cover: '',
      title: '',
    },
  };

  @action public toggleShowSearch = () => {
    this.showSearch = !this.showSearch;
  };

  @action public onSearchChange = (e: any) => {
    const event = e || window.event;
    const key = event.which || event.keyCode || event.charCode;
    if (key === 13) {
      history.push(`${routePath.search}?q=${event.target.value}`);
      this.getPostsByTitle(event.target.value);
      this.showSearch = false;
    }
  };

  @action public onPageChange = (current: number) => {
    this.curPage = current;
    history.push(`${routePath.blog}?page=${current}`);
    this.getPostsByPage();
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  };

  @computed get curPath() {
    return history.location.pathname.split('/').slice(-1)[0];
  }

  public getPostsByPage = async () => {
    try {
      const res = await articleService.getPostsByPage(this.curPage);
      console.log('看一下文章', res)

      runInAction(() => {
        this.posts = res.data.data.posts || [];
        this.total = res.data.data.Amount
        this.curPage = 1;
      });
    } catch (e) {
      setToast(`获取第 ${this.curPage} 页失败`);
    }
  };

  public getPostsByTitle = async (title: string) => {
    try {
      const res = await articleService.getPostsByTitle(title);
      runInAction(() => {
        this.posts = res.data.data.posts || [];
      });
    } catch (e) {
      setToast('检索失败');
    }
  };

  public getAllTags = async () => {
    try {
      const res = await articleService.getAllTags();
      console.log('看一下tags', res.data.data)
      runInAction(() => {
        this.tags = res.data.data;
      });
    } catch (e) {
      setToast('获取标签失败');
    }
  };

  public getPostsByTag = async (tag = this.curPath) => {
    try {
      const res = await articleService.getPostsByTag(tag);
      console.log('看一下标签的文章', res.data.data.posts)
      runInAction(() => {
        this.posts = res.data.data.posts || [];
      });
    } catch (e) {
      setToast('无法获取此标签下的文章');
    }
  };

  public getHots = async () => {
    try {
      const res = await articleService.getHots();
      runInAction(() => {
        this.hots = res.data.data || [];
      });
    } catch (e) {
      setToast('获取 PV 失败');
    }
  };

  public getArchives = async () => {
    try {
      const res = await articleService.getArchives();
      runInAction(() => {
        this.archives = res.data.data.sort(sortBy('_id', 'year'));
        this.archives.forEach((value: any) => value.data.forEach((val: any) => this.totalArticlesCount += val.data.length))
      });
    } catch (e) {
      setToast('获取归档失败');
    }
  };

  public getPostById = async (id: string) => {
    this.loading = true;
    history.push(`${routePath.blogDetail}${id}`);
    try {
      const res = await articleService.getPostById(id);
      runInAction(() => {
        this.detail = res.data.data;
        this.likeNum = res.data.data.curArticle.like_count.length
      });
    } catch (e) {
      setToast('获取文章失败');
      history.push(routePath.notFound);
    } finally {
      this.loading = false;
    }
  };

  public handleLikes = async () => {
    try {
      const res = await articleService.handleLikes(this.curPath, this.curIp);
      runInAction(() => {
        this.likeNum = res.data.data.like_number;
      });
    } catch (e) {
      setToast('点赞失败');
    }
  };

  public getLikes = async (id: string, ip: string) => {
    try {
      const res = await articleService.getLikes(id, ip);
      runInAction(() => {
        console.log('res.data.data.liked', res.data.data)
        this.isLiked = res.data.data.liked;
      });
    } catch (e) {
      setToast('获取点赞信息失败');
    }
  };

  public getIp = async () => {
    try {
      const res = await articleService.getIp();
      runInAction(() => {
        this.curIp = res.data;
      });
    } catch (e) {
      setToast('无法获取你的IP');
    }
  };

  public increasePV = async (id: string) => {
    try {
      await articleService.increasePV(id);
    } catch (e) {
      setToast('增加 PV 失败');
    }
  };
}

const articleStore = new ArticleStore();

export default articleStore;
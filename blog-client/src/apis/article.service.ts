import {
  GET,
  PUT,
} from '../tools/axios';

import {
  AxiosResponse
} from 'axios';

import {
  IResponseCommon
} from '../types/common'

import {
  IArticleDetail,
  IArticleWrap,
  IArchive,
  IDetail,
  ILike,
  IIncreasePV,
  ArticleList
} from '../types/article';

import {
  ipify
} from '../constants/constants';


class ArticleService {
  public async getArticle(params: ArticleList): Promise<AxiosResponse<IResponseCommon<IArticleWrap>>> {
    return GET(`/article/list`, params, '')
  }

  public async getPostById(id: string): Promise<AxiosResponse<IResponseCommon<IDetail>>> {
    return GET(`/articles/${id}`, null, '');
  }

  public async getPostsByPage(page: number): Promise<AxiosResponse<IResponseCommon<IArticleWrap>>> {
    return GET(`/articleList/page/${page}`, null, '');
  }

  public async getPostsByTitle(title: string): Promise<AxiosResponse<IResponseCommon<IArticleWrap>>> {
    return GET(`/articlesByTitle?q=${title}`, null, '');
  }

  public async getAllTags(): Promise<AxiosResponse<IResponseCommon<string[]>>> {
    return GET('/categoryList', null, '');
  }

  public async getPostsByTag(tag: string): Promise<AxiosResponse<IResponseCommon<IArticleWrap>>> {
    return GET(`/articlesByTag?tag=${tag}`, null, '');
  }

  public async getHots(): Promise<AxiosResponse<IResponseCommon<IArticleDetail[]>>> {
    return GET('/articlesByPV', null, '');
  }

  public async getArchives(): Promise<AxiosResponse<IResponseCommon<IArchive[]>>> {
    return GET('/archives', null, '');
  }

  public async handleLikes(id: string, ip: string): Promise<AxiosResponse<IResponseCommon<ILike>>> {
    return PUT(`/likes/${id}?ip=${ip}`, null, '');
  }

  public async getLikes(id: string, ip: string): Promise<AxiosResponse<IResponseCommon<ILike>>> {
    return GET(`/likes/${id}?ip=${ip}`, null, '');
  }

  public async getIp(): Promise<AxiosResponse<string>> {
    return GET(ipify, null, '');
  }

  public async increasePV(id: string): Promise<AxiosResponse<IResponseCommon<IIncreasePV>>> {
    return PUT(`/articlePV/${id}`, null, '');
  }

}

const articleService = new ArticleService();

export default articleService;
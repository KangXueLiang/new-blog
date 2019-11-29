import {
  observable,
  runInAction
} from 'mobx';

import {
  setToast
} from '@tools/tools';

import {
  homeService
} from '../apis/index.service';

import {
  webpSuffix
} from '../constants/constants';

import {
  IProject
} from '../types/home';

class HomeStore {
  @observable public announcement: string = '';
  @observable public motto: string = '';
  @observable public projects: IProject[] = [];
  @observable public coverUrl: string = '';

  public getAnnouncement = async () => {
    try {
      const res = await homeService.getAnnouncement();
      runInAction(() => {
        this.announcement = res.data.data.content || '欢迎来到巡礼者的博客~' ;
      });
    } catch (e) {
      setToast('获取 Announcement 失败');
    }
  };

  public getMotto = async () => {
    try {
      const res = await homeService.getMotto();
      runInAction(() => {
        this.motto = res.data.data.content
      });
    } catch (e) {
      setToast('获取 Motto 失败');
    }
  };

  public getProject = async () => {
    try {
      const res = await homeService.getProject();
      runInAction(() => {
        this.projects = res.data || [];
      });
    } catch (e) {
      setToast('获取 Projects 失败');
    }
  };

  public loadBgImg = (imageUrl: string) => {
    const isWebp = window.localStorage.isWebp === 'true';
    const backgroundDOM = document.getElementById('background');
    const background = new Image();
    background.src = isWebp ? `${imageUrl}${webpSuffix}` : imageUrl;
    background.onload = () => {
      if (backgroundDOM) {
        backgroundDOM.style.cssText = `background-image: url(${
          background.src
        }); opacity: 1`;
      }
    };
  };

  public getCover = async (position: string) => {
    let curId = window.localStorage.cover_id;
    if (!curId) {
      curId = 0;
    }
    try {
      // 这里做一下mock先
      // const res = await homeService.getCover(curId, position);
      // runInAction(() => {
      //   this.coverUrl = res.data.url;
      //   window.localStorage.setItem('cover_id', res.data._id);
      // });
      runInAction(() => {
        let imgLists = [
          'https://logan-blog.oss-cn-shenzhen.aliyuncs.com/blog-detail/wallls.com_111757.jpg',
          'https://logan-blog.oss-cn-shenzhen.aliyuncs.com/blog-detail/cat1.jpg',
          'https://logan-blog.oss-cn-shenzhen.aliyuncs.com/blog-detail/cat2.jpg',
          'https://logan-blog.oss-cn-shenzhen.aliyuncs.com/blog-detail/girl1.jpg',
          'https://logan-blog.oss-cn-shenzhen.aliyuncs.com/blog-detail/IMG_7792.webp'
        ]
        let random = Math.floor(Math.random() * 5)
        this.coverUrl = imgLists[random]
        window.localStorage.setItem('cover_id', '5c0cb8787828556a98cf8824');
      })
      if (this.coverUrl) {
        this.loadBgImg(this.coverUrl);
      }
    } catch (e) {
      console.log('开始获取首页数据', e)

      setToast('获取 Cover 失败');
    }
  };
}

const homeStore = new HomeStore();

export default homeStore;
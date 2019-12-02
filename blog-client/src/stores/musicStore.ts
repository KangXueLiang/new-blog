import {
  observable,
  runInAction
} from 'mobx';

import {
  musicService,
} from '../apis/index.service';

import {
  setToast
} from '@tools/tools';

import {
  ILiveTours,
  IFeaturedRecords,
  IKKMusic,
} from '../types/music';

class MusicStore {
  @observable public liveTours: ILiveTours[] = [];
  @observable public featuredRecords: IFeaturedRecords[] = [];
  @observable public kkMusic: IKKMusic[] = [];

  public getLiveTours = async () => {
    try {
      const res = await musicService.getLiveTours();
      runInAction(() => {
        this.liveTours = res.data;
      });
    } catch (error) {
      setToast('获取演唱会现场图失败');
    }
  }

  public getFeaturedRecords = async () => {
    try {
      const res = await musicService.getFeaturedRecords();
      runInAction(() => {
        this.featuredRecords = res.data;
      });
    } catch (error) {
      setToast('获取精选唱片失败');
    }
  }

  public getKKMusic = async () => {
    try {
      const res = await musicService.getKKMusic();
      runInAction(() => {
        this.kkMusic = res.data;
      });
    } catch (error) {
      setToast('获取我的作品失败');
    }
  }

}

const musicStore = new MusicStore();

export default musicStore;
import {
  GET,
} from '../tools/axios';

import {
  AxiosResponse
} from 'axios';

import {
  ILiveTours, 
  IFeaturedRecords,
  IKKMusic,
} from '../types/music';

class MusicService {
  public async getLiveTours(): Promise<AxiosResponse<ILiveTours[]>> {
    return GET(`/liveTours`, null, '');
  }

  public async getFeaturedRecords(): Promise<AxiosResponse<IFeaturedRecords[]>> {
    return GET(`/latestFourFeaturedRecords`, null, '');
  }

  public async getKKMusic(): Promise<AxiosResponse<IKKMusic[]>> {
    return GET(`/kkMusic`, null, '');
  }
}

const musicService = new MusicService();

export default musicService;
import { GET } from '../tools/axios';

import { AxiosResponse } from 'axios';

import { IAnnouncement, IMotto, IProject, ICover } from '../types/home';

import {
  IResponseCommon
} from '../types/common'

class HomeService {
  public async getAnnouncement(): Promise<AxiosResponse<IResponseCommon<IAnnouncement>>> {
    return GET('/latestAnnouncements', null, '');
  }

  public async getMotto(): Promise<AxiosResponse<IResponseCommon<IMotto>>> {
    return GET('/latestMotto', null, '');
  }

  public async getProject(): Promise<AxiosResponse<IProject[]>> {
    return GET('/latestThreeProjects', null, '');
  }

  public async getCover(
    curId: string
  ): Promise<AxiosResponse<IResponseCommon<ICover[]>>> {
    return GET(`/covers`, null, '');
  }
}

const homeService = new HomeService();

export default homeService;

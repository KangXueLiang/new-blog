import {
  GET,
} from '../tools/axios';

import {
  AxiosResponse,
} from 'axios';

import {
  IResponseCommon
} from '../types/common'

import {
  IAbout,
} from '../types/about';

class AboutService {
  public async getAbouts(): Promise < AxiosResponse < IResponseCommon<IAbout[]> >> {
    return GET('/abouts', null, '');
  }
}


const aboutService = new AboutService();

export default aboutService;
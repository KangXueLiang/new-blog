import {
  GET,
} from '../tools/axios';

import {
  AxiosResponse
} from 'axios';

import {
  IResponseCommon
} from '../types/common'

import {
  IUser,
  IWorkExperience,
  IProgramExperience,
} from '../types/cv';

class CVService {
  public async getUser(): Promise < AxiosResponse < IResponseCommon<IUser> >> {
    return GET('/userInfo', null, '');
  }

  public async getWorkExperience(): Promise < AxiosResponse < IResponseCommon<IWorkExperience[]> >> {
    return GET('/workExperience', null, '');
  }

  public async getProgramExperience(): Promise < AxiosResponse < IResponseCommon<IProgramExperience[]> >> {
    return GET('/programExperience', null, '');
  }
}


const cvService = new CVService();

export default cvService;
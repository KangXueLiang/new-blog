import {
  GET,
} from '../tools/axios';

import {
  AxiosResponse
} from 'axios';

import {
  IPlayer,
  IGlobalStatus,
} from '../types/layout';

import {
  IResponseCommon
} from '../types/common'

class LayoutsService {
  public async getGlobalStatus(): Promise<AxiosResponse<IGlobalStatus>> {
    return GET(`/globalStatus`, null, '');
  }

  public async getPlayers(): Promise<AxiosResponse<IResponseCommon<IPlayer[]>>> {
    return GET(`/litePlayers`, null, '');
  }
}


const layoutsService = new LayoutsService();

export default layoutsService;
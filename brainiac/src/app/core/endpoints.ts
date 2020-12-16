import { environmentBase } from '../../environments/environment-base';

export const endpoints = {
  smartGuys: '/users',

  glueKickoff: (endpoint: string) =>  environmentBase.baseDomain + endpoint
};

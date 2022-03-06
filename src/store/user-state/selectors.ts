import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { UserData } from '../../types/user-data';
import { AuthorizationStatus } from '../../const';

export const getUserData = (state: State): UserData => state[NameSpace.user].userData;
export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.user].authorizationStatus;

import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { Cities } from '../../const';

export const getSelectedCity = (state: State): Cities => state[NameSpace.app].selectedCity;

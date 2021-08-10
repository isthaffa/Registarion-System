import { fork, all } from 'redux-saga/effects';

import userSagas from '../containers/User/sagas';
import homeSagas from '../containers/home/sagas';
export default function* rootSaga() {
  return yield all([
    fork(userSagas),fork(homeSagas)
  ]);
}

import {createSelector} from 'reselect';

const homeReducer = (state) => state.homeReducer;

const isLoading = createSelector(
  homeReducer,
  (currentState) => currentState.isLoading,
);
const memberList = createSelector(
    homeReducer,
    (currentState) => currentState.memberList,
  );

export {isLoading,memberList};
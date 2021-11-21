import {
    configureStore,
    StateFromReducersMapObject,
    DeepPartial,
    Action,
} from '@reduxjs/toolkit';
import thunk, { ThunkAction } from 'redux-thunk';
import authReducer from '../Features/Common/slice';

const reducer = {
    auth: authReducer,
};
export type IRootState = StateFromReducersMapObject<typeof reducer>;
type Store = ReturnType<typeof initConfigStore>;

function initConfigStore(preloadedState?: DeepPartial<IRootState>) {
    return configureStore({
        reducer,
        preloadedState: preloadedState,
        middleware: [thunk],
    });
}

export const store = initConfigStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
export default store;

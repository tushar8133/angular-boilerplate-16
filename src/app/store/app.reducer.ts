import { createReducer, on } from "@ngrx/store";
import { Actions } from './';

/* APP */
export const app = createReducer(
    {},
    on(Actions.app.info, (state, { payload }) => ({ ...state, info: { ...payload } })),
    on(Actions.app.alert, (state, { payload }) => ({ ...state, alert: { ...payload } })),
    on(Actions.app.display, (state, { payload }) => ({ ...state, display: { ...payload } })),
    on(Actions.app.routes, (state, payload ) => ({ ...state, routes: payload })),
    on(Actions.app.loading, (state, payload ) => ({ ...state, loading: payload })),
)

/* USER */
export const user = createReducer(
    {},
    on(Actions.user.info, (state, { payload }) => ({ ...state, info: { ...payload } })),
    on(Actions.user.login, (state, { payload }) => ({ ...state, login: { ...payload } })),
    on(Actions.user.register, (state, { payload }) => ({ ...state, register: { ...payload } })),
)

/* RELOAD */
export const reload = createReducer(
    {},
    on(Actions.reload.preserveState, (state) => ({ ...state }))
)


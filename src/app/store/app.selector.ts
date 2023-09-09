import { createFeatureSelector, createSelector } from "@ngrx/store";

/* APP */
const appFeatureSelector = createFeatureSelector<any>('app');
export const app = {
    info: createSelector(appFeatureSelector, (response) => response.info),
    alert: createSelector(appFeatureSelector, (response) => response.alert),
    display: createSelector(appFeatureSelector, (response) => response.display),
    routes: createSelector(appFeatureSelector, (response) => response.routes),
}

/* USER */
const userFeatureSelector = createFeatureSelector<any>('user');
export const user = {
    info: createSelector(userFeatureSelector, (response) => response.info),
    login: createSelector(userFeatureSelector, (response) => response.login),
    register: createSelector(userFeatureSelector, (response) => response.register),
}

/* RELOAD */
const reloadFeatureSelector = createFeatureSelector<any>('reload');
export const reload = createSelector(reloadFeatureSelector, (response) => response);

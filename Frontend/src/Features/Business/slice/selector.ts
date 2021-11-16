import { RootState } from '../../../store/store';

export const selectServices = (state: RootState) => state?.business.services;

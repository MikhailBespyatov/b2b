import { baseEmptyAPI } from './baseQuery';
import { ICountry } from '../../models/ICountry';
import { ICity } from '../../models/ICity';

export const countryApi = baseEmptyAPI.injectEndpoints({
  endpoints: builder => ({
    getCountries: builder.query<ICountry[], undefined | string>({
      query: () => '/accounting/countries'
    }),
    getCities: builder.query<ICity[], undefined | string>({
      query: () => '/accounting/cities'
    })
  })
});

export const { useGetCountriesQuery, useGetCitiesQuery } = countryApi;

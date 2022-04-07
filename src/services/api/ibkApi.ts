import { baseEmptyAPI } from './baseQuery';

export const ibkAPI = baseEmptyAPI.injectEndpoints({
  endpoints: builder => ({
    getOrganizations: builder.query({
      query: () =>
        'https://rancher-test.alfa-bank.kz:30001/services-ui/api/get-organizations'
    })
  })
});

export const { useGetOrganizationsQuery } = ibkAPI;

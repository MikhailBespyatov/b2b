import { baseEmptyAPI } from './baseQuery';

export const partnerAPI = baseEmptyAPI.injectEndpoints({
  endpoints: builder => ({
    getPartner: builder.query({
      query: iin => `partner/${iin}`
    })
  })
});

export const { useGetPartnerQuery } = partnerAPI;

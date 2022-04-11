import { baseEmptyAPI } from './baseQuery';

export const partnerAPI = baseEmptyAPI.injectEndpoints({
  endpoints: builder => ({
    getPartner: builder.query({
      query: (iin: string) => `partner/${iin}`
    })
  })
});

export const { useGetPartnerQuery } = partnerAPI;

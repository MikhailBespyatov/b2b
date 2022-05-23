import { baseEmptyAPI } from './baseQuery';

export const partnerAPI = baseEmptyAPI.injectEndpoints({
  endpoints: builder => ({
    getPartner: builder.query({
      query: (iin: string) => `partners/partner/${iin}`
    })
  })
});

export const { useGetPartnerQuery } = partnerAPI;

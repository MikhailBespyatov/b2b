import React, { FC } from 'react';
import { useGetPartnerQuery } from '../../../services/api/partnerApi';

type PropsType = {
  merchantId: string;
};

const Information: FC<PropsType> = ({ merchantId }) => {
  const { data } = useGetPartnerQuery(merchantId);
  console.log({ data });
  return <code>{JSON.stringify(data)}</code>;
};

export default Information;

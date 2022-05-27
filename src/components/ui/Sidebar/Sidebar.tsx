import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useGetMerchantsQuery } from 'services/api/transactionAPI';
import { partnerAPI } from 'services/api/partnerApi';
import { IMerchant } from 'models/IMerchant';
import { RootStateType } from 'redux/store';
import { selectMerchant } from 'redux/slices/app-slice';
import { EcobankLogoIcon } from '../icons/EcobankLogo';
import { TRANSACTIONS } from '../../../navigation/CONSTANTS';
import s from './Sidebar.module.css';

const Sidebar: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isSuccess } = useGetMerchantsQuery('');
  const { partnerCode } = useSelector((state: RootStateType) =>
    selectMerchant(state)
  );

  const handleItemClick = (selectedMerchantId: string) => () => {
    dispatch(
      partnerAPI.endpoints.getPartner.initiate(selectedMerchantId, {
        subscribe: false,
        forceRefetch: true
      })
    );
    navigate(TRANSACTIONS);
  };

  return (
    <header className={clsx('sidebar', s.sidebar)}>
      <div className={s.sidebar_logo}>
        <EcobankLogoIcon width={201} height={19} color="#fff" />
      </div>
      <ul>
        {isSuccess &&
          Array.isArray(data) &&
          data.map((item: IMerchant) => {
            return (
              <li key={item.merchantId} className="c-pointer">
                <button
                  type="button"
                  className={clsx(
                    s.button,
                    item.merchantId === partnerCode && s.active
                  )}
                  onClick={handleItemClick(item.merchantId)}
                >
                  {item.merchantId}
                </button>
              </li>
            );
          })}
      </ul>
    </header>
  );
};

export default Sidebar;

import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@alfalab/core-components/button';
import { Skeleton } from '@alfalab/core-components/skeleton';
import { useGetMerchantsQuery } from '../../services/api/transactionAPI';
import { uuid } from '../../utils/uuid';
import { IMerchant } from '../../models/IMerchant';
import { TRANSACTIONS } from '../../navigation/CONSTANTS';
import { setMerchant } from '../../redux/slices/app-slice';

const Settings: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess } = useGetMerchantsQuery('');

  const handleItemClick = (merchantId: string) => () => {
    dispatch(setMerchant({ merchantId }));
    navigate(TRANSACTIONS, { replace: true });
  };

  return (
    <div className="overflowX mb-24">
      <table className="table">
        <thead>
          <tr>
            <td>Идентификатор мерчанта</td>
            <td>Количество заказов</td>
            <td>Статус Мерчанта</td>
            <td className="flex-end">Действие</td>
          </tr>
        </thead>
        <tbody>
          {isLoading &&
            Array.from({ length: 10 }, (_, index) => {
              return (
                <tr key={index}>
                  {Array.from({ length: 3 }, () => {
                    return (
                      <td key={uuid()}>
                        <Skeleton visible animate>
                          -
                        </Skeleton>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          {isSuccess &&
            Array.isArray(data) &&
            data.map((item: IMerchant) => {
              return (
                <tr
                  key={item.merchantId}
                  className="c-pointer"
                  onClick={handleItemClick(item.merchantId)}
                >
                  <td>{item.merchantId}</td>
                  <td>{item.orderCount}</td>
                  <td>{item.merchantStatus}</td>
                  <td
                    style={{
                      textAlign: 'right'
                    }}
                  >
                    <Button size="xxs">Посмотреть заказы</Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Settings;

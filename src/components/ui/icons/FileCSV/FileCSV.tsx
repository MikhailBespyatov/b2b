import React, { FC } from 'react';
import { Icon } from '../Icon';
import { IconProps } from '../Icon/model';

export const FileCSVIcon: FC<IconProps> = ({
  color = '#000',
  width = 20,
  height = 24,
  ...props
}) => (
  <Icon width={width} height={height} fill="none" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 1.10006C0 0.492551 0.50368 6.10352e-05 1.125 6.10352e-05H9.2082C11.2049 6.10352e-05 12.7651 1.68576 12.5664 3.62842L12.4024 5.23251C12.3882 5.37082 12.5072 5.48714 12.6486 5.4733L14.2892 5.3129C16.276 5.11863 18 6.64417 18 8.59652V20.9001C18 21.5076 17.4963 22.0001 16.875 22.0001H1.125C0.50368 22.0001 0 21.5076 0 20.9001V1.10006ZM10.9964 18.0841H7.9964V13.0111H6.99641V19.0111H10.9964V18.0841ZM14.7303 17.1364C14.7728 17.2329 14.7927 17.3378 14.7887 17.4431C14.7923 17.5471 14.7707 17.6504 14.7258 17.7442C14.6809 17.8381 14.614 17.9197 14.5307 17.9821C14.3577 18.1171 14.1067 18.1841 13.7797 18.1841C13.3887 18.1841 13.0847 18.1011 12.8657 17.9341C12.6477 17.7681 12.5387 17.5051 12.5387 17.1481H11.3667L11.3577 17.1731C11.3437 17.7811 11.5807 18.2531 12.0677 18.5901C12.5547 18.9271 13.1257 19.0951 13.7797 19.0951C14.4457 19.0951 14.9807 18.9471 15.3867 18.6501C15.7917 18.3531 15.9947 17.9481 15.9947 17.4331C15.9947 16.9411 15.8237 16.5431 15.4827 16.2411C15.1417 15.9391 14.6397 15.6961 13.9767 15.5111C13.5147 15.3651 13.1887 15.2271 13.0007 15.0961C12.8127 14.9661 12.7177 14.7991 12.7177 14.5951C12.7177 14.3731 12.8067 14.1901 12.9827 14.0471C13.1587 13.9041 13.4077 13.8321 13.7297 13.8321C14.0647 13.8321 14.3247 13.9181 14.5107 14.0901C14.6027 14.1762 14.6751 14.281 14.723 14.3974C14.771 14.5139 14.7934 14.6392 14.7887 14.7651H15.9567L15.9657 14.7401C15.9787 14.2261 15.7777 13.7941 15.3627 13.4431C14.9467 13.0921 14.4097 12.9171 13.7497 12.9171C13.0977 12.9171 12.5627 13.0731 12.1427 13.3851C11.7237 13.6971 11.5137 14.1001 11.5137 14.5921C11.5137 15.0851 11.6967 15.4731 12.0627 15.7561C12.4277 16.0391 12.9687 16.2841 13.6837 16.4901C14.0937 16.6141 14.3797 16.7461 14.5437 16.8861C14.6241 16.9543 14.6879 17.0399 14.7303 17.1364ZM4.01428 16.6511L5.19428 19.0111H6.36128L4.60328 15.9861L6.26628 13.0111H5.14628L3.99828 15.3361L2.86628 13.0111H1.75528L3.41828 15.9851L1.71228 19.0111H2.83528L4.01428 16.6511Z"
      fill={color}
    />
  </Icon>
);

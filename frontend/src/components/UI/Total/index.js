import React, { useState, useEffect } from 'react';

import useGraphQL from '../../../hooks/useGraphQL';
import Typography from '@material-ui/core/Typography';
import Title from '../Title';


const Total = () => {
  const [total, setTotal] = useState(0);

  const fetchAssetData = () => {
    const query = `
        {
            cash {
                id
                date
                krakenGBP
                krakenUSDT
                krakenUSDC
                celsiusUSDT
                celsiusUSDC
                blockfiUSDT
                blockfiUSDC
                spainEURO
            }
        }
    `;
    useGraphQL(query).then(response => {
        setTotal('123123');
    }).catch(error => {
        console.info(error.message, 'error.message')
    });
  }

  useEffect(() => {
    fetchAssetData();
  }, []);

  return (
    <>
      <Title>Portfolio Total</Title>
      <Typography component="p" variant="h4">
        {`£${total}`}
      </Typography>
      <Typography color="textSecondary" sx={{ flex: 1 }}>
        as of 15 March, 2019
      </Typography>
      <div>
      </div>
    </>
  );
}

export default Total;

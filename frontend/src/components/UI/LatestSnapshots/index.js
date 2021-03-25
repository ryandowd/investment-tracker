import * as React from 'react';
// import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../Title';
import { useAssetContext } from '../../../context/assetContext';

const LatestSnapshots = () => {
  const { assetState: { isas, cryptos, cashs, assetsList } } = useAssetContext();

  console.log(assetsList, 'assetsList')

  return (
    <>
      <Title>Latest Snapshots</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Cash</TableCell>
            <TableCell>ISA</TableCell>
            <TableCell>Crypto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assetsList && assetsList.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.cashTotal ? item.cashTotal : '---'}</TableCell>
                <TableCell>{item.isaTotal ? item.isaTotal : '---'}</TableCell>
                <TableCell>{item.cryptoTotal ? item.cryptoTotal : '---'}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  );
}

export default LatestSnapshots;
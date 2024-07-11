import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
import styles from './top-price.module.css';

export const TopPriceComponent = (props: any) => {
  const { assets } = props;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align='right'>Price</TableCell>
            <TableCell align='right'>Change (%)</TableCell>
            <TableCell align='right'>Change ($)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assets.map((element: any) => (
            <TableRow
              key={element.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {element.name}
              </TableCell>
              <TableCell align='right'>
                {element.current_price.toFixed(2)}
              </TableCell>
              <TableCell
                align='right'
                className={
                  element.price_change_24h > 0
                    ? `${styles.priceUp}`
                    : `${styles.priceDown}`
                }
              >
                {element.price_change_24h.toFixed(2)}
              </TableCell>
              <TableCell
                align='right'
                className={
                  element.price_change_percentage_24h > 0
                    ? `${styles.priceUp}`
                    : `${styles.priceDown}`
                }
              >
                {element.price_change_percentage_24h}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

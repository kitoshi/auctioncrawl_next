import { Children, useEffect, useState } from 'react';
import { CrawlerAPIObject } from '../data/ApiData';
import styles from './Table.module.css';

interface Props {
  data: CrawlerAPIObject[] | undefined;
}

interface CalculatedCrawlerAPIObject extends CrawlerAPIObject {
  priceDifference?: number | string;
}

enum ColumnName {
  ItemName = 'itemName',
  ItemPrice = 'gcPrice',
  EbayPrice = 'ebayPrice',
  PriceDifference = 'priceDifference'
}

export default function Table({ data }: Props) {
  const [tableData, setTableData] = useState<
    CalculatedCrawlerAPIObject[] | undefined
  >(data);
  const [sorted, setSorted] = useState(false);

  useEffect(() => {
    if (data) {
      const updatedTableData = data.map((item) => {
        const gcPrice = parseFloat(item.gcPrice.replace(/[$,]/g, ''));
        const ebayPrice = parseFloat(item.ebayPrice.replace(/[$,]/g, ''));
        let priceDifference = (ebayPrice - gcPrice).toFixed(2);
        if (isNaN(Number(priceDifference))) {
          priceDifference = 'N/A';
        }
        return {
          ...item,
          priceDifference: priceDifference // Round to 2 decimal places
        };
      });
      setTableData(updatedTableData);
    }
  }, [data]);

  function sortByColumn(column: ColumnName) {
    if (tableData) {
      const sortedTableData = [...tableData].sort((itemA, itemB) => {
        setSorted(true);
        if (column === ColumnName.ItemName) {
          return itemA.itemName.localeCompare(itemB.itemName);
        }
        if (column === ColumnName.ItemPrice) {
          return (
            parseFloat(itemA.gcPrice.replace(/[$,]/g, '')) -
            parseFloat(itemB.gcPrice.replace(/[$,]/g, ''))
          );
        }
        if (column === ColumnName.EbayPrice) {
          return (
            parseFloat(itemA.ebayPrice.replace(/[$,]/g, '')) -
            parseFloat(itemB.ebayPrice.replace(/[$,]/g, ''))
          );
        }
        if (column === ColumnName.PriceDifference) {
          const priceDiffA = parseFloat(
            itemA.priceDifference?.toString().replace(/[$,]/g, '') || '0'
          );
          const priceDiffB = parseFloat(
            itemB.priceDifference?.toString().replace(/[$,]/g, '') || '0'
          );
          return priceDiffA - priceDiffB;
        }
        {
          return 0;
        }
      });
      if (sorted) {
        sortedTableData.reverse();
        setSorted(false);
      }
      setTableData(sortedTableData);
    }
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th onClick={() => sortByColumn(ColumnName.ItemName)}>Item Name</th>
          <th onClick={() => sortByColumn(ColumnName.ItemPrice)}>
            Government Price
          </th>
          <th onClick={() => sortByColumn(ColumnName.EbayPrice)}>Ebay Price</th>
          <th onClick={() => sortByColumn(ColumnName.PriceDifference)}>
            Profit Difference
          </th>
        </tr>
      </thead>
      <tbody>
        {Children.toArray(
          tableData?.map((item) => (
            <tr>
              <td>{item.itemName}</td>
              <td>
                <a href={item.itemLink}>{item.gcPrice}</a>
              </td>
              <td>
                <a href={item.ebayLink}>{item.ebayPrice}</a>
              </td>
              <td
                className={
                  item.priceDifference == undefined ||
                  Number(item.priceDifference) < 0 ||
                  item.priceDifference == 'N/A'
                    ? styles.negative
                    : styles.positive
                }
              >
                $ {item.priceDifference}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

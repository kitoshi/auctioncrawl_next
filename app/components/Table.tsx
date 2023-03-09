import { Children } from 'react';
import { CrawlerAPIObject } from '../data/ApiData';

interface Props {
  data: CrawlerAPIObject[] | undefined;
}

export default function Table({ data }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Item Name</th>
          <th>Item Price</th>
          <th>Ebay Price</th>
          <th>Price Difference</th>
        </tr>
      </thead>
      <tbody>
        {Children.toArray(
          data?.map((item) => (
            <tr>
              <td>{item.itemName}</td>
              <td>
                <a href={item.itemLink}>{item.gcPrice}</a>
              </td>
              <td>
                <a href={item.ebayLink}>{item.ebayPrice}</a>
              </td>
              <td>quick maths</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

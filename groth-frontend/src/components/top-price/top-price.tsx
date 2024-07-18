import { ITablePriceData } from '../../core/types/assets';
import { AssetsTableComponent } from '../assetsTable/assetsTable';

export const TopPriceComponent: React.FC<ITablePriceData> = (
  props: ITablePriceData
): JSX.Element => {
  const { assets } = props;
  return <AssetsTableComponent assets={assets} />;
};

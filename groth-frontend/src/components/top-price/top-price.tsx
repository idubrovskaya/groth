import { AssetsTableComponent } from '../assetsTable/assetsTable';

export const TopPriceComponent = (props: any) => {
  const { assets } = props;
  return <AssetsTableComponent assets={assets} />;
};

import { styleNumber } from '../../utils/styleNumber';
import 'react-dropdown/style.css';
import { BookState } from '../../store/ordersSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface IProps {
  price: string;
  cumulativePrices: string[];
  type: keyof Omit<BookState, 'asksTotalAmount' | 'bidsTotalAmount'>;
  rightToLeft: boolean;
}

export default function TableRow({
  price,
  cumulativePrices,
  type,
  rightToLeft
}: IProps) {
  const priceData = useSelector((state: RootState) => state.book[type][price]);
  const totalAmount = useSelector((state: RootState) => state.book[`${type}TotalAmount`]);
  const cumulativeTotal = useSelector((state: RootState) => cumulativePrices.reduce((acc, curr) => acc + state.book[type][curr][2], 0));
  const histogramScaleValue = ((cumulativeTotal + priceData[2]) / totalAmount).toFixed(4);

  const countElement = <div>{styleNumber(priceData[1])}</div>;
  const amountElement = <div>{priceData[2].toFixed(4)}</div>;
  const totalElement = <div>{(cumulativeTotal + priceData[2]).toFixed(4)}</div>;
  const priceElement = (
    <div className={`text-${type === 'bids' ? 'green' : 'red'}-500`}>
      {styleNumber(priceData[0])}
    </div>
  );

  const classNameGenerator = () => {
    const classNames = [
      `${type === 'bids' ? 'bg-green-400' : 'bg-red-400'}`,
      'opacity-30',
      `w-2/4`,
      'absolute h-6 -z-1',
      `${type === 'bids' ? 'right' : 'left'}`,
      'transition-transform duration-100',
      `${type === 'bids' ? 'transform-origin: center right' : 'transform-origin: center left'}`
    ];
    return classNames.join(' ');
  };

  return (
    <>
      <div
        className={classNameGenerator()}
        style={{
          transform: `scaleX(${histogramScaleValue})`,
          transformOrigin: type === 'bids' ? 'center right' : 'center left'
        }}
      />
      <div className={`font-mono text-xs h-6 grid grid-flow-col grid-cols-custom content-center`}>
        {rightToLeft ? countElement : priceElement}
        {rightToLeft ? amountElement : totalElement}
        {rightToLeft ? totalElement : amountElement}
        {rightToLeft ? priceElement : countElement}
      </div>
    </>
  );
}

import TableRow from './TableRow'
import { BookState } from '../../store/ordersSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { LIST_LENGTH } from '../../constants'

interface TableProps {
  type: keyof Omit<BookState, 'asksTotalAmount' | 'bidsTotalAmount'>;
}

export default function Table({ type }: TableProps) {
  const prices = useSelector((state: RootState) => state.prices[type])
  const rightToLeft = type === 'bids'

  const sortedPrices = Object.keys(prices).sort((a, b) => Number(a) - Number(b)).slice(0, LIST_LENGTH)
  const orderedPrices = type === 'bids' ? sortedPrices.reverse() : sortedPrices
  const listLengthMinusItems = LIST_LENGTH - sortedPrices.length
  const spacersRequired = listLengthMinusItems < 0 ? 0 : listLengthMinusItems
  return (
    <div className="flex-1 z-0 px-4">
      <div
        className="py-1 grid grid-flow-col grid-cols-custom font-mono text-sm font-extralight border-b border-gray-700 opacity-40">
        <div>{rightToLeft ? 'COUNT' : 'PRICE'}</div>
        <div>{rightToLeft ? 'AMOUNT' : 'TOTAL'}</div>
        <div>{rightToLeft ? 'TOTAL' : 'AMOUNT'}</div>
        <div>{rightToLeft ? 'PRICE' : 'COUNT'}</div>
      </div>
      {orderedPrices.map((price, i) => {
        return (
          <TableRow
            key={price}
            price={price}
            cumulativePrices={sortedPrices.slice(0, i)}
            type={type}
            rightToLeft={rightToLeft}
          />
        )
      })}
      {Array.from(Array(spacersRequired)).map((_, index) => {
        return <div key={`spacer-${index}`} className="h-6" />
      })}
    </div>
  )
}

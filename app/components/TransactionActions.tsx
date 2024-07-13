import { useEffect } from 'react'
import { type Transaction } from '~/types/Transaction'

type Props = {
  transaction: Transaction
  onError: (id: string, error: string) => void
}
/**
 * GOALS for this component:
 *
 *  1. display available options for what to do with a new transaction
 *  2. validation around whether the thing can be imported
 *  3. actually import the transaction if everything is good in a controlled way (loading spinner)
 *
 */
const TransactionActions = ({ transaction, onError }: Props) => {
  useEffect(() => {
    onError(transaction.id, 'testing error')
  }, [])
  return <div>ACTION 1, 2, 3</div>
}

export default TransactionActions

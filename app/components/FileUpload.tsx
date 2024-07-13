import { type Transaction } from '~/types/Transaction'
import Big from 'big.js'
import { generateSmallRandomId } from '~/utils/randomId'

type Props = {
  className?: string
  onUpload: (transactions: Transaction[]) => void
}

const FileUpload = ({ className, onUpload }: Props) => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = function (event) {
      const csv = event?.target?.result as string
      const lines = csv?.split('\n')
      const transactions = lines.slice(0).map((line) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [date, amount, _, __, description] = line.split(',')
        return {
          date: date?.slice(1, -1),
          description: description?.slice(1, -1),
          id: generateSmallRandomId(),
          amount: Number(amount?.slice(1, -1))
        }
      })
      onUpload(transactions)
    }
    reader.readAsText(file)
  }

  return (
    <div className={className}>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="bg-card-light text-text-dark dark:bg-card dark:text-text"
      />
    </div>
  )
}

export default FileUpload

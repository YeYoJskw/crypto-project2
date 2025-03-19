import './TableRows.css'

const TableRows = ({ type }) => {
  const generateRows = (count, type) => {
    const rows = []
    for (let i = 0; i < count; i++) {
      if (type === 'blocks') {
        rows.push({
          avatar: `Bk`,
          itemId: `1494170${i}`,
          timeAgo: `17 secs ago`,
          validatedBy: `Validator: InfStones`,
          txns: `150 txns in 3 secs`,
          amount: `1.11221 TON`,
        })
      } else if (type === 'transactions') {
        rows.push({
          avatar: `Tx`,
          itemId: `0xd46fe8f649371...`,
          timeAgo: `15 secs ago`,
          from: `0xee226379db83cffc681...`,
          to: `0x000000000000000000`,
          amount: `1.11221 TON`,
        })
      }
    }
    return rows
  }

  const rows = generateRows(7, type)

  return (
    <div className={`table-container ${type}`}>
      <table className="table">
        <thead>
          <tr className="tr">
            <th className="th">
              {type === 'blocks' ? 'Latest Blocks' : 'Latest Transactions'}
            </th>
            <th className="th" style={{ textAlign: 'right' }}>
              <button
                className={
                  type === 'blocks' ? 'view-blocks' : 'view-transactions'
                }
              >
                {type === 'blocks'
                  ? 'View all blocks'
                  : 'View all transactions'}
                <img
                  className={
                    type === 'blocks'
                      ? 'view-blocks-img'
                      : 'view-transactions-img'
                  }
                  src="/img/view.svg"
                  alt=""
                />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="table-row tr">
              <td className="block-td">
                <div className="block-info">
                  <div className="avatar">{row.avatar}</div>
                  <div>
                    <div className="item-id">{row.itemId}</div>
                    <div className="time-ago">{row.timeAgo}</div>
                  </div>
                </div>
              </td>
              {type === 'blocks' ? (
                <>
                  <td className="validated-td">
                    <div className="validation-info">
                      <div className="validated">
                        Validated By <a href="#">{row.validatedBy}</a>
                      </div>
                      <div className="time-txns">
                        <a href="#">{row.txns}</a>
                      </div>
                    </div>
                  </td>
                  <td className="amount-td">
                    <div className="amount">{row.amount}</div>
                  </td>
                </>
              ) : (
                <>
                  <td className="validated-td">
                    <div className="validation-info">
                      <div className="validated">
                        From <a href="#">{row.from}</a>
                      </div>
                      <div className="time-txns">
                        <span className="table-to">To</span>{' '}
                        <a href="#">{row.to}</a>
                      </div>
                    </div>
                  </td>
                  <td className="amount-td">
                    <div className="amount">{row.amount}</div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableRows

import React, { useState, useEffect } from 'react'
import './TableRows.css'

const TableRows = ({ type }) => {
  const [expanded, setExpanded] = useState(false)
  const [rows, setRows] = useState(generateRows(7, type))

  function generateRows(count, type) {
    return Array.from({ length: count }, (_, i) => createRow(i, type, Date.now()))
  }

  function createRow(index, type, timestamp) {
    return type === 'blocks'
      ? {
          avatar: 'Bk',
          itemId: `1494170${index}`,
          timestamp,
          validatedBy: `Validator: InfStones`,
          txns: `150 txns in 3 secs`,
          amount: `1.11221 TON`,
        }
      : {
          avatar: 'Tx',
          itemId: `0xd46fe8f649371...${index}`,
          timestamp,
          from: `0xee226379db83cffc681...`,
          to: `0x000000000000000000`,
          amount: `1.11221 TON`,
        }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setRows(prevRows => [createRow(prevRows.length, type, Date.now()), ...prevRows])
    }, 20000)

    return () => clearInterval(interval)
  }, [type])

  function getTimeAgo(timestamp) {
    const diff = Math.floor((Date.now() - timestamp) / 1000)
    if (diff < 60) return `${diff} secs ago`
    const mins = Math.floor(diff / 60)
    return `${mins} min${mins > 1 ? 's' : ''} ago`
  }

  return (
    <div className={`table-container ${type}`}>
      <table className='table'>
        <thead>
          <tr className='tr'>
            <th className='th'>{type === 'blocks' ? 'Latest Blocks' : 'Latest Transactions'}</th>
            <th className='th' style={{ textAlign: 'right' }}>
              <button
                className={type === 'blocks' ? 'view-blocks' : 'view-transactions'}
                onClick={() => setExpanded(!expanded)}
              >
                {expanded
                  ? 'Show short'
                  : type === 'blocks'
                  ? 'View all blocks'
                  : 'View all transactions'}
                <img
                  className={type === 'blocks' ? 'view-blocks-img' : 'view-transactions-img'}
                  src='/img/view.svg'
                  alt=''
                />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.slice(0, expanded ? 14 : 7).map((row, index) => (
            <tr key={index} className='table-row tr'>
              <td className='block-td'>
                <div className='block-info'>
                  <div className='avatar'>{row.avatar}</div>
                  <div>
                    <div className='item-id'>{row.itemId}</div>
                    <div className='time-ago'>{getTimeAgo(row.timestamp)}</div>
                  </div>
                </div>
              </td>
              {type === 'blocks' ? (
                <>
                  <td className='validated-td'>
                    <div className='validation-info'>
                      <div className='validated'>
                        Validated By <a href='#'>{row.validatedBy}</a>
                      </div>
                      <div className='time-txns'>
                        <a href='#'>{row.txns}</a>
                      </div>
                    </div>
                  </td>
                  <td className='amount-td'>
                    <div className='amount'>{row.amount}</div>
                  </td>
                </>
              ) : (
                <>
                  <td className='validated-td'>
                    <div className='validation-info'>
                      <div className='validated'>
                        From <a href='#'>{row.from}</a>
                      </div>
                      <div className='time-txns'>
                        <span className='table-to'>To</span> <a href='#'>{row.to}</a>
                      </div>
                    </div>
                  </td>
                  <td className='amount-td'>
                    <div className='amount'>{row.amount}</div>
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

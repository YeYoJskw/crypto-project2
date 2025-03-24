import './Table2.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Table2 = ({ data }) => {
  const navigate = useNavigate()
  const [fadingStates, setFadingStates] = useState({})

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text)
    setFadingStates(prev => ({ ...prev, [index]: true }))
    setTimeout(() => {
      setFadingStates(prev => ({ ...prev, [index]: false }))
    }, 1500)
  }

  return (
    <div className='tab'>
      <table className='table2'>
        <thead>
          <tr>
            <th className='th-table2'>Age</th>
            <th className='th-table2'>From</th>
            <th className='th-table2'>To</th>
            <th className='th-table2'>TON</th>
            <th className='th-table2'>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className={`table-row ${row.status === 'IN' ? 'bg-in' : 'bg-out'}`}>
              <td className='age-td td-table2'>{row.timeAgo}</td>

              <td className='from-td td-table2'>
                <span
                  className='link-style'
                  onClick={() => navigate('/wallet')} // Меняем href на navigate
                >
                  {row.from}
                </span>
                <button
                  className='copy-table'
                  onClick={() => handleCopy(row.from, `from-${index}`)}
                  style={{ transition: 'opacity 0.3s ease-in-out' }}
                >
                  <img
                    style={{
                      filter: fadingStates[`from-${index}`]
                        ? 'brightness(0) saturate(100%) invert(60%) sepia(100%) saturate(300%) hue-rotate(180deg)'
                        : 'none',
                    }}
                    className='copy-img'
                    src='/img/file_copy_icon_134669.svg'
                    alt=''
                  />
                </button>
              </td>

              <td className='to-td td-table2'>
                <span
                  className='link-style'
                  onClick={() => navigate('/wallet')} // Меняем href на navigate
                >
                  {row.to}
                </span>
                <button
                  className='copy-table'
                  onClick={() => handleCopy(row.to, `to-${index}`)}
                  style={{ transition: 'opacity 0.3s ease-in-out' }}
                >
                  <img
                    style={{
                      filter: fadingStates[`to-${index}`]
                        ? 'brightness(0) saturate(100%) invert(60%) sepia(100%) saturate(300%) hue-rotate(180deg)'
                        : 'none',
                    }}
                    className='copy-img-table'
                    src='/img/file_copy_icon_134669.svg'
                    alt=''
                  />
                </button>
              </td>

              <td className='ton-td td-table2'>{row.ton}</td>
              <td className='td-table2 status-td'>
                <button className={`status ${row.status === 'IN' ? 'btn-in' : 'btn-out'}`}>
                  {row.status}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table2

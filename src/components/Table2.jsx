import './Table2.css'

const Table2 = ({ data }) => {
  return (
    <div className="tab">
      <table className="table2">
        <thead>
          <tr>
            <th className="th-table2" scope="col">
              Age
            </th>
            <th className="th-table2" scope="col">
              From
            </th>
            <th className="th-table2" scope="col">
              To
            </th>
            <th className="th-table2" scope="col">
              TON
            </th>
            <th className="th-table2" scope="col">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={`table-row ${
                row.status === 'IN' ? 'bg-in' : 'bg-out'
              }`}
            >
              <td className="age-td td-table2">{row.timeAgo}</td>
              <td className="from-td td-table2">
                <a href="#">{row.from}</a>
              </td>
              <td className="to-td td-table2">
                <a href="#">{row.to}</a>
              </td>
              <td className="ton-td td-table2">{row.ton}</td>
              <td className="td-table2 status-td">
                <button
                  className={`status ${
                    row.status === 'IN' ? 'btn-in' : 'btn-out'
                  }`}
                >
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

import React from 'react'

const TableHeaderCell = ({title: cellName}) => {
  return (  
     <th className=' text-center border-[1px] p-2'>{cellName}</th>
  )
}

export default TableHeaderCell
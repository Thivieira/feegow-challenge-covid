import React from 'react';

interface TableHeaderProps {
  columns: string[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map((column, index) => (
          <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
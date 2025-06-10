export const exportToCSV = (rows, columns) => {  // Filter out 'actions' column and checkbox columns and get visible columns
  const visibleColumns = columns.filter(col => {
    // Exclude specific columns and checkbox-related columns
    const excludeFields = ['actions', '__check__', 'checkbox'];
    return !excludeFields.includes(col.field) && 
           col.type !== 'checkbox' &&
           !col.field.toLowerCase().includes('select') &&
           col.field !== 'checkboxSelection';
  });
  
  // Create header row with column names
  const headers = visibleColumns.map(col => col.headerName).join(';');
  
  // Create data rows
  const csvRows = rows.map(row => {
    return visibleColumns
      .map(col => {
        const value = row[col.field];
        // Handle special cases like objects, arrays, or null values
        if (value === null || value === undefined) return '';
        if (typeof value === 'object') return JSON.stringify(value);
        return String(value).replace(/;/g, ','); // Replace semicolons with commas in values
      })
      .join(';');
  });
  
  // Combine headers and rows
  const csvContent = [headers, ...csvRows].join('\n');
  
  // Create and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'export.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

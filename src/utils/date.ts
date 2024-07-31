export function formatDate(date: string) {
  const d = new Date(date);

  // Extract the month, date, and year from the date object
  const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const day = d.getDate().toString().padStart(2, '0');
  const year = d.getFullYear();

  // Return the formatted date string
  return `${month}/${day}/${year}`;
}

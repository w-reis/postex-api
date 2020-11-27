export default function getFormattedDate(date: Date): string {
  const months = [
    { number: 1, name: 'jan' },
    { number: 2, name: 'fev' },
    { number: 3, name: 'mar' },
    { number: 4, name: 'abr' },
    { number: 5, name: 'maio' },
    { number: 6, name: 'jun' },
    { number: 7, name: 'jul' },
    { number: 8, name: 'ago' },
    { number: 9, name: 'set' },
    { number: 10, name: 'out' },
    { number: 11, name: 'nov' },
    { number: 12, name: 'dez' },
  ];

  let day = date.getDate().toString();
  day = day.length > 1 ? day : `0${day}`;

  const month = 1 + date.getMonth();
  const [currentMonth] = months.filter(item => item.number === month);

  const year = date.getFullYear();

  return `${day} de ${currentMonth.name} de ${year}`;
}

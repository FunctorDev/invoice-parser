import { faker } from '@faker-js/faker';
import moment from 'moment';

export const getRandomTableData = () => {
  const total = Math.random() * (8 - 4) + 4;
  let data = [];
  for (let i = 0; i < total; i++) {
    let item = {
      date: moment(faker.date.between('2020-01-01T00:00:00.000Z', '2030-01-01T00:00:00.000Z')).format('MM/DD/YYYY'),
      total: faker.random.numeric(5),
      tax: faker.random.numeric(3),
      companyName: faker.company.catchPhrase()
    }
    data.push(item);
  }

  return data;
};

export const getCSVName = (filename) => {
  return filename.substring(0, filename.lastIndexOf('.')) || filename;
}
import fetchData from '../http';
import getLevel from '../data';

jest.mock('../http');

beforeEach(() => {
  jest.resetAllMocks();
});

test('should return correctly value with response.status === \'ok\'', () => {
  const response = {
    status: 'ok',
    data: {
      id: 1,
      level: 31,
    },
  };
  fetchData.mockReturnValue(response);

  expect(getLevel(1)).toEqual('Ваш текущий уровень: 31');
  expect(fetchData).toBeCalledWith('https://server/user/1');
});

test('should return correctly value', () => {
  const response = {
    status: 'internal server error',
  };
  fetchData.mockReturnValue(response);

  expect(getLevel(5)).toEqual('Информация об уровне временно недоступна');
  expect(fetchData).toBeCalledWith('https://server/user/5');
});

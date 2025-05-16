import { faker } from '@faker-js/faker';
import { TodoDetail } from '../types/Todo';

export function getTodo(): TodoDetail {
  return {
    id: Date.now(),
    title: faker.string.alpha(10),
    tag: faker.string.alpha(4),
    content: faker.lorem.lines({ min: 1, max: 3 }),
  };
}

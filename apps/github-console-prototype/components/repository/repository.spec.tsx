import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { define } from 'cooky-cutter';

import Repository from './repository';
import { IRepository } from '../../common/interfaces/data';
import { faker } from '@faker-js/faker';

const repositoryFactory = define<IRepository>({
  name: faker.word.noun(),
  description: faker.lorem.sentences(2),
  likes: parseInt(faker.random.numeric(2))
});

describe('Repository', () => {
  it('should render successfully', () => {
    const repo = repositoryFactory();

    const { baseElement } = render(<Repository details={repo} />);

    expect(baseElement).toBeTruthy();
  });
  it('should render all repository attributes', () => {
    const repo = repositoryFactory();

    render(<Repository details={repo} />);

    expect(screen.getByText(repo.name)).toBeTruthy();
    expect(screen.getByText(repo.description)).toBeTruthy();
    expect(screen.getByText(repo.likes)).toBeTruthy();
  });
});

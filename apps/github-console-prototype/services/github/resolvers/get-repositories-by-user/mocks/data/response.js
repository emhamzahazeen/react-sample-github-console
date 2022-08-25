import shuffleArray from 'shuffle-array';

const response = () =>
  shuffleArray([
    {
      description: 'Some text.',
      stargazers_count: 21,
      name: 'hello world'
    },
    {
      description: 'Some description.',
      stargazers_count: 321,
      name: 'youbrains'
    },
    {
      description: 'Some new text.',
      stargazers_count: 211,
      name: 'foogi'
    },
    {
      description: 'The descriptive text.',
      stargazers_count: 1221,
      name: 'fordas'
    },
    {
      description: 'Some description text that is a bit too long.',
      stargazers_count: 31,
      name: 'kitmas'
    }
  ]);

export default response;

import styled from '@emotion/styled';
import { useContext, useEffect, useState } from 'react';
import { IUser } from '../../common/interfaces/data';
import { NetworkServiceContext } from '../../context-adapter';
import InfiniteLoader from './infinite-loader/infinite-loader';

export interface RepositoriesListProps {
  handle: IUser['handle'];
}

const StyledRepositoriesList = styled.div``;

export function RepositoriesList(props: RepositoriesListProps) {
  const { getRepositories } = useContext(NetworkServiceContext);
  const [repositories, setRepositories] = useState([]);
  const [repositoriesTotalPageCount, setRepositoriesTotalPageCount] = useState(null);

  useEffect(() => {
    (async () => {
      const repos = await getRepositories({ handle: props.handle, page: 1 });
      if (repos && repos.items && repos.totalPageCount) {
        setRepositories(repos.items);
        setRepositoriesTotalPageCount(repos.totalPageCount);
      }
    })();
  }, [props.handle]);

  return (
    <StyledRepositoriesList>
      {repositories && repositories.length > 0 && (
        <InfiniteLoader
          repositories={repositories}
          repositoriesTotalPageCount={repositoriesTotalPageCount}
          handle={props.handle}
          getRepositories={getRepositories}
        />
      )}
    </StyledRepositoriesList>
  );
}

export default RepositoriesList;

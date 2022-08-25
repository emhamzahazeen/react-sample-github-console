import styled from '@emotion/styled';
import { useState } from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IRepository, IUser } from '../../../common/interfaces/data';
import { INetworkService } from '../../../common/interfaces/services';
import Repository from '../../repository/repository';

export interface InfiniteLoaderProps {
  handle: IUser['handle'];
  repositories: IRepository[];
  repositoriesTotalPageCount: number;
  getRepositories: INetworkService['getRepositories'];
}

const CONTAINER_SIZE = '500px';
const StyledInfiniteLoader = styled.div`
  .container {
    height: ${CONTAINER_SIZE};
    overflow: auto;
    display: flex;
    flex-direction: column;
  }
`;

export function InfiniteLoader(props: InfiniteLoaderProps) {
  const [repositories, setRepositories] = useState(props.repositories);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = async () => {
    if (currentPage >= props.repositoriesTotalPageCount) {
      setHasMore(false);
      return;
    }

    const nextPage = currentPage + 1;
    const newRepositories = await props.getRepositories({ handle: props.handle, page: nextPage });

    if (newRepositories && newRepositories.items) {
      setRepositories(repositories.concat(newRepositories.items));
      setCurrentPage(nextPage);
    }
  };

  return (
    <StyledInfiniteLoader>
      <div className="container">
        <InfiniteScroll
          dataLength={repositories.length}
          next={fetchMoreData}
          style={{ display: 'flex', flexDirection: 'column' }}
          inverse={false}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          height={CONTAINER_SIZE}
        >
          <SimpleGrid columns={1} spacing={5}>
            {repositories.map((repo, index) => (
              <Repository key={index} details={repo} />
            ))}
          </SimpleGrid>
        </InfiniteScroll>
      </div>
    </StyledInfiniteLoader>
  );
}

export default InfiniteLoader;

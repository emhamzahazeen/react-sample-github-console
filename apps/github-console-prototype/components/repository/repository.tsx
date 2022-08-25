import styled from '@emotion/styled';
import { Box, Heading, Text, Badge, HStack } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

import { IRepository } from '../../common/interfaces/data';

/**
 * COMPONENT_ID: t-repository-single-view
 * */

export interface RepositoryProps {
  details: IRepository;
}

const StyledRepository = styled.div`
  .badge-content {
    padding-right: 4px;
  }
`;

export function Repository(props: RepositoryProps) {
  return (
    <StyledRepository>
      <Box p={3} shadow="md" borderWidth="1px" borderRadius="lg">
        <HStack justify={'space-between'}>
          <Heading data-test-id={'t-repository-single-view-text-name'} fontSize="lg">
            {props.details.name}
          </Heading>
          <Badge display={'flex'} alignItems={'center'}>
            <span data-test-id={'t-repository-single-view-text-likes'} className="badge-content">
              {props.details.likes}
            </span>
            <FaStar />
          </Badge>
        </HStack>
        <Text data-test-id={'t-repository-single-view-text-desc'} mt={4}>
          {props.details.description}
        </Text>
      </Box>
    </StyledRepository>
  );
}

export default Repository;

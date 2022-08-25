import styled from '@emotion/styled';
import { Grid, GridItem, Container } from '@chakra-ui/react';
import { NetworkServiceProvider } from '../context-adapter';
import Search from '../components/search/search';
import UsersList from '../components/users-list/users-list';

const StyledPage = styled.div`
  .page {
    background-color: #fdfdfd;
  }
`;

export function Index() {
  return (
    <NetworkServiceProvider>
      <StyledPage>
        <Container maxW="container.xl">
          <Grid h="100vh" templateRows="12% 1fr" templateColumns="1fr" gap={4}>
            <GridItem rowSpan={1} colSpan={4}>
              <Search />
            </GridItem>
            <GridItem colSpan={4}>
              <UsersList />
            </GridItem>
          </Grid>
        </Container>
      </StyledPage>
    </NetworkServiceProvider>
  );
}

export default Index;

import { useContext, useState } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { FormErrorMessage, FormControl, Input, Button, HStack, Text } from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';
import { NetworkServiceContext } from '../../context-adapter';
import { searchedUsers } from '../../state';

/* eslint-disable-next-line */
export interface SearchProps {}

const StyledSearch = styled.div`
  width: 50%;
  padding: 10px 0 10px 0;
  margin: auto;
  .search-info {
    margin-top: 10px;
  }
`;

export function Search(props: SearchProps) {
  const { search } = useContext(NetworkServiceContext);
  const setUsers = useSetRecoilState(searchedUsers);
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();

  async function onSubmit(values) {
    setCurrentSearchTerm(values.search);
    const users = await search({ searchTerm: values.search, limit: 5 });
    setUsers(users);
  }

  return (
    <StyledSearch>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack>
          <FormControl isInvalid={!!errors.search}>
            <Input
              id="search"
              placeholder="Search by username"
              {...register('search', {
                required: 'This is required',
                minLength: { value: 4, message: 'Minimum length should be 4' }
              })}
            />
            <FormErrorMessage>{errors.search && (errors.search.message as string)}</FormErrorMessage>
          </FormControl>
          <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
            Search
          </Button>
        </HStack>
      </form>
      {currentSearchTerm && (
        <Text className="search-info" fontSize="sm">
          Showing results for {currentSearchTerm}
        </Text>
      )}
    </StyledSearch>
  );
}

export default Search;

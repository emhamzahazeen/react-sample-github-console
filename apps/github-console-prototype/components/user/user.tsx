import styled from '@emotion/styled';
import { Box } from '@chakra-ui/react';
import { IUser } from '../../common/interfaces/data';
import RepositoriesList from '../repositories-list/repositories-list';

export interface UserProps {
  details: IUser;
}

const StyledUser = styled.div``;

export function User(props: UserProps) {
  return (
    <StyledUser>
      <Box>
        <RepositoriesList handle={props.details.handle} />
      </Box>
    </StyledUser>
  );
}

export default User;

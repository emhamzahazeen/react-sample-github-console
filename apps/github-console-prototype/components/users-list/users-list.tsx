import styled from '@emotion/styled';
import { Box } from '@chakra-ui/react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { searchedUsers } from '../../state';
import { IUser } from '../../common/interfaces/data';
import User from '../user/user';

/* eslint-disable-next-line */
export interface UsersListProps {}

const StyledUsersList = styled.div``;

export function UsersList(props: UsersListProps) {
  const users = useRecoilValue(searchedUsers);

  return (
    <StyledUsersList>
      {!!users.length && (
        <Box borderWidth="1px" borderRadius="lg">
          <Accordion>
            {users &&
              users.map((info: IUser) => (
                <AccordionItem key={info.handle}>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        {info.name && `${info.name} - `}
                        {info.handle}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <User details={info} />
                  </AccordionPanel>
                </AccordionItem>
              ))}
          </Accordion>
        </Box>
      )}
    </StyledUsersList>
  );
}

export default UsersList;

import { Spinner } from 'components';
import { routes } from 'constants';
import { useChatIdMutation, useChatThreadsQuery, useUsersQuery } from 'queries';
import { useNavigate } from 'react-router-dom';
import { ChatThread } from 'types';

/**
 * Inbox Component
 *
 * This component displays the user's chat inbox and a list of users to start a new chat with.
 * It utilizes various custom hooks to fetch data and handle mutations.
 */
export const Inbox = () => {
  const navigate = useNavigate();

  // Fetch user data
  const { data: users, isPending: isUsersPending } = useUsersQuery();
  // Fetch chat threads data
  const { data: chats, isPending: isChatPending } = useChatThreadsQuery();
  // Mutation to get or create a chat ID
  const { mutateAsync, isPending: chatIdPending } = useChatIdMutation();

  /**
   * Get or create a chat ID and navigate to the chat.
   *
   * @param {string} id - The ID of the user to chat with.
   */
  const getChatId = async (id: string) => {
    const chat = await mutateAsync(id);
    navigateToChat(chat);
  };

  /**
   * Navigate to the chat page.
   */
  const navigateToChat = (chat: ChatThread) => {
    navigate(`${routes.chat}/${chat._id}`, { state: chat });
  };

  /**
   * Render the spinner component while data is being loaded or mutated.
   */
  const renderSpinner = () => (
    <>
      {(isUsersPending || isChatPending || chatIdPending) && (
        <div className='fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center'>
          <Spinner className='top-0 bg-card-dark bg-opacity-20 dark:bg-card' />
        </div>
      )}
    </>
  );

  /** Render user inbox */
  const renderInbox = () => (
    <div className='w-full overflow-hidden rounded-lg border border-border bg-background shadow-md md:w-3/5 dark:border-border-dark dark:bg-background-dark'>
      <div className='border-b border-border bg-secondary px-4 py-2 dark:border-border-dark dark:bg-secondary-dark'>
        <h2 className='text-xl text-color dark:text-color-dark'>Inbox</h2>
      </div>
      <ul className='divide-y divide-border dark:divide-border-dark'>
        {chats &&
          chats.map((chat) => (
            <li
              key={chat._id}
              onClick={() => navigateToChat(chat)}
              className='flex cursor-pointer flex-row items-center space-x-4 px-4 py-4 hover:bg-hover hover:dark:bg-hover-dark'
            >
              <div
                className={`flex items-center justify-center rounded-full border border-border bg-secondary font-bold md:size-10 dark:border-border-dark dark:bg-secondary-dark`}
              >
                <p>
                  {chat.user.firstName && chat.user.lastName
                    ? `${chat.user.firstName.charAt(0).toUpperCase()}${chat.user.lastName.charAt(0).toUpperCase()}`
                    : ''}
                </p>
              </div>
              <div className='w-full'>
                <div className='flex items-center justify-between'>
                  <div className='font-semibold text-color dark:text-color-dark'>
                    {chat.user.firstName} {chat.user.lastName}
                  </div>
                </div>
                <div className='mt-1 text-sm text-gray-500'>{chat.lastMessage?.message}</div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );

  /** Render new users */
  const renderNewUsers = () => (
    <div className='w-full overflow-hidden rounded-lg border border-border bg-background shadow-md md:w-2/5 dark:border-border-dark dark:bg-background-dark'>
      <div className='border-b border-border bg-secondary px-4 py-2 dark:border-border-dark dark:bg-secondary-dark'>
        <h2 className='text-xl text-color dark:text-color-dark'>Start New Chat</h2>
      </div>
      <ul className='divide-y divide-border dark:divide-border-dark'>
        {users &&
          users.map((user) => (
            <li
              key={user._id}
              onClick={() => getChatId(user._id)}
              className='cursor-pointer px-4 py-4 hover:bg-hover hover:dark:bg-hover-dark'
            >
              <div className='flex items-center space-x-4'>
                <div
                  className={`flex items-center justify-center rounded-full border border-border bg-secondary font-bold md:size-10 dark:border-border-dark dark:bg-secondary-dark`}
                >
                  <p>
                    {user.firstName && user.lastName
                      ? `${user.firstName.charAt(0).toUpperCase()}${user.lastName.charAt(0).toUpperCase()}`
                      : ''}
                  </p>
                </div>
                <div className='font-semibold text-color dark:text-color-dark'>
                  {user.firstName} {user.lastName}
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );

  return (
    <div className='mx-auto mt-4 flex w-full max-w-screen-xl flex-col items-start space-y-4 px-4 md:flex-row md:space-x-4 md:space-y-0 lg:mt-8'>
      {renderInbox()}
      {renderNewUsers()}
      {renderSpinner()}
    </div>
  );
};

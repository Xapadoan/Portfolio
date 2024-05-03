import {
  Root,
  Trigger,
  Portal,
  Content,
  Close,
  Title,
} from '@radix-ui/react-dialog';
import { ReactNode } from 'react';

export const Dialog = ({
  title,
  trigger,
  children,
}: {
  title: string;
  trigger: ReactNode;
  children: ReactNode;
}) => {
  return (
    <Root>
      <Trigger asChild>{trigger}</Trigger>
      <Portal>
        <Content className="fixed bottom-0 right-0 h-screen w-full md:w-1/2 bg-passive-bg border-gray-400 border-2">
          <header className="flex flex-row align-middle bg-active-bg border-b-1 border-gray-400">
            <Close className="outline-none focus:outline-none">
              <div className="flex justify-center items-center w-6 h-6 text-[10px]">
                🔴
              </div>
            </Close>
            <Title className="w-full text-center">{`./${title}.sh`}</Title>
          </header>
          {children}
        </Content>
      </Portal>
    </Root>
  );
};

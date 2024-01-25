import { ReactNode } from 'react';
import cn from 'classnames';
import * as Dialog from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';
import { cutiveMono } from '@styles/fonts';

interface ContactForm {
  from: string;
  subject: string;
  body: string;
}

export const ContactDialog = ({ trigger }: { trigger: ReactNode }) => {
  const formContext = useForm<ContactForm>({
    defaultValues: {
      from: '',
      subject: 'Hey ! I have a cool project to show you',
      body: '',
    },
  });
  const onSubmit = (data: ContactForm) => {
    console.log('Submit Contact: ', data);
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content className="fixed bottom-0 right-0 h-screen w-[50vw] border-gray-400 border-2">
          <header className="flex flex-row align-middle bg-gray-700 border-b-1 border-gray-400">
            <Dialog.Close className="outline-none focus:outline-none">
              <div className="flex justify-center items-center w-6 h-6 text-[10px]">
                🔴
              </div>
            </Dialog.Close>
            <Dialog.Title className="w-full text-center">
              ./send-mail.sh
            </Dialog.Title>
          </header>
          <form
            className={cn('text-[18px] font-bold p-3', cutiveMono.className)}
            onSubmit={formContext.handleSubmit(onSubmit)}
          >
            <div className="flex flex-row gap-4 font-bold">
              <label htmlFor="from">From:</label>
              <input
                className="bg-black focus:outline-none hover:bg-gray-800 focus:bg-gray-900 font-normal w-full"
                type="email"
                {...formContext.register('from')}
              />
            </div>
            <div className="flex flex-row gap-4 font-bold">
              <label>To:</label>
              <span className="font-normal">xavier.padoan.dev@gmail.com</span>
            </div>
            <div className="flex flex-row gap-4 font-bold">
              <label>Date:</label>
              <span className="font-normal">{new Date().toUTCString()}</span>
            </div>
            <div className="flex flex-row gap-4 font-bold">
              <label htmlFor="subject">Subject:</label>
              <input
                className="bg-black focus:outline-none hover:bg-gray-800 focus:bg-gray-900 font-normal w-full"
                type="subject"
                {...formContext.register('subject')}
              />
            </div>
            <div>
              <textarea
                className="bg-black focus:outline-none hover:bg-gray-800 focus:bg-gray-900 font-normal w-full"
                rows={10}
                {...formContext.register('body')}
              />
            </div>
            <input
              className="underline decoration-dotted underline-offset-2 hover:cursor-pointer hover:text-blue-600"
              type="submit"
              value="Send"
            />
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

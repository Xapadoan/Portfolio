import { ReactNode } from 'react';
import cn from 'classnames';
import { Dialog } from '@components/Dialog';
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
    <Dialog title="send-mail" trigger={trigger}>
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
    </Dialog>
  );
};

import { ReactNode } from 'react';
import { Dialog } from 'src/components/Dialog';
import {
  Form,
  InputEmail,
  InputTextFake,
  InputText,
  InputTextArea,
} from 'src/components/Form';
import { useForm } from 'react-hook-form';

type ContactForm = {
  from: string;
  subject: string;
  body: string;
};

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
      <Form formContext={formContext} onSubmit={onSubmit}>
        <InputEmail
          name="from"
          label="From:"
          register={formContext.register('from', { required: true })}
        />
        <InputTextFake label="To:" value="xavier.padoan.dev@gmail.com" />
        <InputTextFake label="Date:" value={new Date().toUTCString()} />
        <InputText
          label="Subject:"
          name="subject"
          register={formContext.register('subject')}
        />
        <InputTextArea
          name="body"
          rows={10}
          register={formContext.register('body')}
        />
      </Form>
    </Dialog>
  );
};

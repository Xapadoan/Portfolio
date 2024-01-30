import { ReactNode } from 'react';
import { Dialog } from './Dialog';
import {
  Form,
  InputText,
  InputEmail,
  InputTextArea,
  FieldSet,
  CheckBox,
} from './Form';
import { useForm } from 'react-hook-form';
import { ProjectAttributes } from '@lib/Project';

export const ProjectDialog = ({ trigger }: { trigger: ReactNode }) => {
  const formContext = useForm<ProjectAttributes>({
    defaultValues: {
      companyName: '',
      clientEmail: '',
      clientName: '',
      type: {
        api: false,
        service: false,
        database: false,
        ai: false,
        other: false,
      },
      details: '',
    },
  });
  const onSubmit = (data: ProjectAttributes) => {
    console.log('Data: ', data);
    fetch(`/api/project`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  };
  return (
    <Dialog title="describe-project" trigger={trigger}>
      <Form formContext={formContext} onSubmit={onSubmit}>
        <InputText
          name="companyName"
          label="Company name:"
          register={formContext.register('companyName', { required: true })}
          error={formContext.formState.errors['companyName']}
        />
        <InputText
          name="clientName"
          label="Your name:"
          register={formContext.register('clientName')}
        />
        <InputEmail
          name="clientEmail"
          label="Your Email:"
          register={formContext.register('clientEmail', { required: true })}
          error={formContext.formState.errors['clientEmail']}
        />
        <div className="h-3"></div>
        <FieldSet legend="What does this project involves ?">
          <CheckBox
            name="type.api"
            control={formContext.control}
            label="Building a REST Api"
          />
          <CheckBox
            name="type.service"
            control={formContext.control}
            label="Building a Web service"
          />
          <CheckBox
            name="type.database"
            control={formContext.control}
            label="Databases"
          />
          <CheckBox
            name="type.ai"
            control={formContext.control}
            label="Artificial Intelligence"
          />
          <CheckBox
            name="type.other"
            control={formContext.control}
            label="Other"
          />
        </FieldSet>
        <div className="h-3"></div>
        <InputTextArea
          label="Details:"
          name="details"
          rows={4}
          register={formContext.register('details')}
        />
      </Form>
    </Dialog>
  );
};

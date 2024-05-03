import cn from 'classnames';
import { NextPageWithLayout } from './_app';
import RootLayout from '@components/Layout';
import { cuteFont } from '@styles/fonts';
import { ProjectDialog } from '@components/ProjectDialog';

const Home: NextPageWithLayout = () => {
  return (
    <div className="w-screen h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 h-full p-4 flex items-center justify-center md:justify-end">
        <div className="flex flex-col gap-8">
          <p className="text-2xl leading-6">
            Hi, I&apos;m
            <br />
            <span className={cn('text-[60px]', cuteFont.className)}>
              XAVIER PADOAN
            </span>
            <br />
            the{' '}
            <span className={cn('text-[50px]', cuteFont.className)}>
              BACK END DEVELOPER
            </span>
          </p>
          <p className="w-full text-right text-lg leading-5">
            You have a project ?<br />
            <ProjectDialog
              trigger={
                <span className="underline decoration-dotted underline-offset-2 cursor-pointer hover:text-secondary-fg">
                  Tell me about it !
                </span>
              }
            />
          </p>
        </div>
      </div>
    </div>
  );
};

Home.getLayout = (page) => <RootLayout>{page}</RootLayout>;

export default Home;

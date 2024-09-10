import cn from 'classnames';
import { NextPageWithLayout } from '../_app';
import { ArticlePreview } from '@components/article/Preview';
import RootLayout from '@components/Layout';
import { Banner } from '@components/branding/Banner';
import { firaSans } from '@styles/fonts';

const Articles: NextPageWithLayout = () => {
  return (
    <div className="w-screen h-full flex flex-col items-center">
      <Banner />
      <div
        className={cn('w-screen md:w-[60vw] p-3 md:p-10', firaSans.className)}
      >
        <ArticlePreview
          title="Why you should not trust TypeScript blindly"
          description={`You started working with JavaScript. After a few months or years, you got tired of type errors and you switched to TypeScript. Now you won't ever have any of those right ? Let's see...`}
          thumbnail="/the_cake_is_a_lie.jpg"
          url="/articles/type-errors-in-typescript"
        />
        <ArticlePreview
          title="Enjoy validation with middlewares"
          description={`Being able to type the request can be really cool, but first things first, you need to validate your data`}
          thumbnail="/the_cake_is_a_lie.jpg"
          url="/articles/enjoy-validation-middlewares"
        />
      </div>
    </div>
  );
};

Articles.getLayout = (page) => <RootLayout>{page}</RootLayout>;

export default Articles;

import {
  ArticleMainTitle,
  ArticleParagraph,
  ArticleSection,
  InlineCode,
} from '@components/article/Content';
import { NextPageWithLayout } from '../_app';
import { InlineLink } from '@components/InlineLink';
import { CodeBlock } from '@components/article/CodeBlock';
import { Metadata } from 'next';
import { ArticleLayout } from '@components/article/Layout';

const EnjoyValidationMiddlewares: NextPageWithLayout = () => {
  return (
    <>
      <ArticleMainTitle>Enjoy Validation with Middlewares</ArticleMainTitle>
      <ArticleSection id="intro">
        <ArticleParagraph>
          In a{' '}
          <InlineLink href="/articles/type-errors-in-typescript">
            previous article
          </InlineLink>
          , I talked about why typing Express&apos;s request is dangerous and
          finished by saying that there is a reason why Express lets us do it
          regardless of the danger.
          <br />
        </ArticleParagraph>
        <ArticleParagraph>Let&apos;s see that now</ArticleParagraph>
      </ArticleSection>
      <ArticleSection id="about_middlewares">
        <ArticleParagraph>
          We are going to use middlewares in order to validate that the data we
          received is correct and transform said data into whatever we want.
          <br />I won&apos;t talk about middlewares here because there are
          already
          <InlineLink href="https://duckduckgo.com/?q=what+are+express+middlewares&t=ftsa&ia=web">
            thousands of great articles
          </InlineLink>
          , but in short, it&apos;s a function that is executed before your
          endpoint.
        </ArticleParagraph>
      </ArticleSection>
      <ArticleSection id="validation" title="The validation step">
        <ArticleParagraph>
          Let&apos;s say I have an endpoint that registers a user:
        </ArticleParagraph>
        <CodeBlock>
          {`interface RegisterUserInput {
  username: string;
  email: string;
  password: string;
}

app.post('/register', (req: Request, res: Response) => {
  const userData: RegisterUserInput = req.body;
  [ ...do stuff ]
  res.status(201).json({ message: 'User created', user });
});`}
        </CodeBlock>
        <ArticleParagraph>
          You can notice here that I casted the body directly to{' '}
          <InlineCode>RegisterUserInput</InlineCode>. I like doing so because it
          allows me to focus on the registration process in this endpoint.
          However, since TypeScript is not magic, I need to make sure the body
          is correct before hand, overwise I may have very bad surprises later.
        </ArticleParagraph>
        <ArticleParagraph>
          Let&apos;s write a middleware that check that my fields are string:
        </ArticleParagraph>
        <CodeBlock>
          {`const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  if (typeof username !== 'string') {
    return res.status(400).json({ message: 'Username must be a string' })
  }
  if (typeof email !== 'string') {
    return res.status(400).json({ message: 'Email must be a string' })
  }
  if (typeof password !== 'string') {
    return res.status(400).json({ message: 'Password must be a string' })
  }

  next();
};`}
        </CodeBlock>
        <ArticleParagraph>
          Here I just made sure all my fields are strings, but typically for a
          registration endpoint, I should have check the validity and unicity of
          the email and the strenght of the password in this middleware.
          <br />
          Now I can call my endpoint like this:
        </ArticleParagraph>
        <CodeBlock>
          {`app.post('/register', validateUser, (req: Request, res: Response) => {
  const userData: RegisterUserInput = req.body;
  [ ...do stuff ]
  res.status(201).json({ message: 'User created', user });
})`}
        </CodeBlock>
        <ArticleSection id="ending">
          <ArticleParagraph>
            Neat right ?
            <br />
            Well this is a straigh forward example, it looks cool, but it
            doesn&apos;t show how cool this can be.
          </ArticleParagraph>
          <ArticleParagraph>
            Next time, we will see how to use this technique in combinaison with
            Routers and interface extensions to make an entire RESTful API where
            all the data is safe, implements an architecture that allows to
            split the software logic and business logic and most importantly,
            doesn&apos;t duplicate code.
          </ArticleParagraph>
        </ArticleSection>
      </ArticleSection>
    </>
  );
};

const meta: Metadata = {
  title: 'Validate Data with middlewares',
};

EnjoyValidationMiddlewares.getLayout = (page) => (
  <ArticleLayout meta={meta}>{page}</ArticleLayout>
);

export default EnjoyValidationMiddlewares;

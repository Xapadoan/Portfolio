import { ArticleLayout } from '@components/article/Layout';
import { NextPageWithLayout } from '../_app';
import { Metadata } from 'next';
import {
  ArticleBulletPoints,
  ArticleBulletPointsItem,
  ArticleMainTitle,
  ArticleParagraph,
  ArticleSection,
  InlineCode,
} from '@components/article/Content';
import { CodeBlock } from '@components/article/CodeBlock';
import { InlineLink } from '@components/InlineLink';

const TypeErrorsInTypeScript: NextPageWithLayout = () => {
  return (
    <>
      <ArticleMainTitle>
        Why you should not use types on your express payloads
      </ArticleMainTitle>
      <ArticleSection id="intro">
        <ArticleParagraph>
          I got tired from the obsure type errors at runtime I had when using
          JavaScript, that&apos;s why I switched to TypeScript.
          <br />
          Now I want to use its full power.
        </ArticleParagraph>
        <ArticleParagraph>
          I&apos;m a backend developer, so I&apos;ll be coding a RestAPI. For
          that I use my favorite framework: Express.
        </ArticleParagraph>
        <ArticleBulletPoints
          label="For a particular endpoint (and the purpose of the article), I need it
          to handle both:"
        >
          <ArticleBulletPointsItem>
            A route parameter (an integer)
          </ArticleBulletPointsItem>
          <ArticleBulletPointsItem>
            A query string (an integer and a string)
          </ArticleBulletPointsItem>
          <ArticleBulletPointsItem>
            A JSON body (a string and an integer)
          </ArticleBulletPointsItem>
        </ArticleBulletPoints>
        <ArticleBulletPoints label="This endpoint will return:">
          <ArticleBulletPointsItem>
            The sum of the three numbers
          </ArticleBulletPointsItem>
          <ArticleBulletPointsItem>
            The concatenation of the string after the two have been sliced
          </ArticleBulletPointsItem>
        </ArticleBulletPoints>
      </ArticleSection>
      <ArticleSection id="the_mistake" title="The Mistake">
        <ArticleParagraph>
          I know the <InlineCode>@types/express</InlineCode> package defines a
          generic interface <InlineCode>Request</InlineCode> that lets me define
          the types of my route parameters, query string and body. I&apos;ll do
          just this:
        </ArticleParagraph>
        <CodeBlock>
          {`type MyRequest = Request<
  { param: number },
  unknown,
  { body1: string; body2: number },
  { query1: string; query2: number }
>;

export function requestHandler(req: MyRequest, res: Response) {
  const { param } = req.params;
  const { query1, query2 } = req.query;
  const { body1, body2 } = req.body;

  return res.json({
    addition: query2 + body2 + param,
    sliceMerge: query1.slice(2) + body1.slice(2),
  });
}`}
        </CodeBlock>
        <ArticleParagraph>
          Simple enouht right ? Let&apos;s test it now, you never know...
        </ArticleParagraph>
        <CodeBlock>{`const res = await fetch(
  "http://domain/route/32?query2=4", {
    method: "POST",
    body: JSON.stringify({
      body1: "astring",
      body2: 4
    })
  })
  .then((res) => res.json());`}</CodeBlock>
        <ArticleParagraph>
          WTF. My endpoint says 4 + 2 = 42 ? I get some TypeErrors on my strings
          ? That&apos;s impossible. I told express my parameter was a number,
          and I told it that query2 was number too, what is wrong with it ?
          <br />
          Well no. I told that to myself (and the others on my team) that.
          Express doesn&apos;t care.
        </ArticleParagraph>
      </ArticleSection>
      <ArticleSection id="the_truth" title="What Express does">
        <ArticleParagraph>
          When express parses query strings, it use{' '}
          <InlineCode>
            <InlineLink href="#">qs.parse</InlineLink>
          </InlineCode>
          . This utils works with strings only. It handles many things, but in
          the end it only understand strings, arrays (of strings), and objects
          (containing strings and arrays of strings) and will always return an
          object of type <InlineCode>ParsedQs</InlineCode> (because that&apos;s
          what{' '}
          <InlineLink href="https://github.com/DefinitelyTyped/DefinitelyTyped/blob/b5f91892b169a85138c7eea457145605624f2cc7/types/express-serve-static-core/index.d.ts#L24">
            the code
          </InlineLink>{' '}
          says) with is defined as:
        </ArticleParagraph>
        <CodeBlock>
          {`interface ParsedQs {
  [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[];
}`}
        </CodeBlock>
        <ArticleParagraph>
          It means that both <InlineCode>query1</InlineCode> and{' '}
          <InlineCode>query2</InlineCode> will be, in the best scenario,
          strings. That will never change, because{' '}
          <span className="font-bold">
            TypeScript does not changes any code
          </span>
          .
        </ArticleParagraph>
        <ArticleParagraph>
          Route parameters in express are a little trickier to understand, but
          basically each keys is the return value of a call to
          <InlineCode>decodeURIComponent</InlineCode> with a regex match as
          argument(
          <InlineLink href="https://github.com/expressjs/express/blob/2177f67f5439494f7a29a8d04f744cc20fb9f201/lib/router/layer.js#L172">
            source here
          </InlineLink>
          ). So... It&apos;s a string.
        </ArticleParagraph>
        <ArticleParagraph>
          Our param will a string, because the code of express says so, and
          TypeScript can not change it&apos;s code.
        </ArticleParagraph>
        <ArticleParagraph>
          When parsing a JSON body, express uses body-parser. This package will
          return the value of a <InlineCode>JSON.parse</InlineCode> call (
          <InlineLink href="https://github.com/expressjs/body-parser/blob/99a1bd62456f932004b84767d6393bc261f75d36/lib/types/json.js#L92">
            source here
          </InlineLink>
          ). Such a call as a return type of <InlineCode>any</InlineCode>.
        </ArticleParagraph>
        <ArticleParagraph>
          The <InlineCode>JSON.parse</InlineCode> function is perfectly able to
          output primitive types (string, number...) but it will not transform
          anything.
        </ArticleParagraph>
      </ArticleSection>
      <ArticleSection id="end">
        <ArticleParagraph>
          In the end, even if I typed the <InlineCode>Request</InlineCode>{' '}
          object, I still have issues with types, why is that ? Well it&apos;s
          simple: I trusted an external data.
        </ArticleParagraph>
        In this case, the trust is a little hidden but I still trusted a user
        input without questionning my code. It&apos;s a terrible mistake than
        can lead to crashes and alltogether serious security issues.
        <ArticleParagraph>
          In my opinion, this kind of scenarios are one of the worst part of
          TypeScript&apos;s typing system because I had no warning during
          development, neither at transpilation time. In addition, if I tried to
          use string specific methods on <InlineCode>query2</InlineCode>, I had
          warnings telling me it&apos;s a number when it&apos;s actually a
          string.
        </ArticleParagraph>
        <ArticleParagraph>
          Express provide default type for the request object. Those types are
          the only you&apos;ll get.
          <br />
          Then why whould they let us override those ?
          <br />
          Because <span className="font-bold">YOU</span> can alter the request
          before handling it. It&apos;s an other very important thing to know
          how to do when programming with both Express and TypeScript, but
          it&apos;s a story for an other time...
        </ArticleParagraph>
      </ArticleSection>
    </>
  );
};

const meta: Metadata = {
  title: 'Type Errors with TypeScript',
};

TypeErrorsInTypeScript.getLayout = (page) => (
  <ArticleLayout meta={meta}>{page}</ArticleLayout>
);

export default TypeErrorsInTypeScript;

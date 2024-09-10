import {
  ArticleBulletPoints,
  ArticleBulletPointsItem,
  ArticleMainTitle,
  ArticleParagraph,
  ArticleSection,
  InlineCode,
} from '@components/article/Content';
import { NextPageWithLayout } from '../_app';
import { CodeBlock } from '@components/article/CodeBlock';
import { Metadata } from 'next';
import { ArticleLayout } from '@components/article/Layout';
import { InlineLink } from '@components/InlineLink';

const EnforceModularityWithMiddlewares: NextPageWithLayout = () => {
  return (
    <>
      <ArticleMainTitle>Enforce Modularity With Middlewares</ArticleMainTitle>
      <ArticleSection id="intro">
        <ArticleParagraph>
          In previous articles we saw how validation can help you avoid
          pitfalls. Today, we will see how to use validation along with nested
          routers to make a clean RESTful API and separate our concerns better.
        </ArticleParagraph>
      </ArticleSection>
      <ArticleSection id="example-situation">
        <ArticleParagraph>
          For this example we will write a REST Api that allows users to create
          online shops, update the ones that belongs them, and to see what any
          shop as to offer. First we will design the routes:
        </ArticleParagraph>
        <CodeBlock>{`[POST] /users // Register User
[POST] /users/:userId/shops // The Create shop route
[GET] /users/:userId/shops/:shopId // Read private shop data
[PUT] /users/:userId/shops/:shopId // The Update shop
[GET] /shops // List shops
[GET] /shops/:shopId // Read a shop`}</CodeBlock>
      </ArticleSection>
      <ArticleSection id="routers-organization" title="Routers descriptions">
        <ArticleParagraph>
          The structure above describes well how routes should be named. One of
          the reasons I like using nested routers is that it makes it really
          easy to translate the routes names into files and directories that
          make sense.
        </ArticleParagraph>
        <ArticleBulletPoints label="In this example, we will need:">
          <ArticleBulletPointsItem>
            A main router that connect things togeteher
          </ArticleBulletPointsItem>
          <ArticleBulletPointsItem>
            A user router that allows a user to register
          </ArticleBulletPointsItem>
          <ArticleBulletPointsItem>
            A private shops router that allow a user to manage his shops
          </ArticleBulletPointsItem>
          <ArticleBulletPointsItem>
            A public shops router to read public data for any shop
          </ArticleBulletPointsItem>
        </ArticleBulletPoints>
        <CodeBlock>{`// src/routes/index.ts
import { Router } from 'express';
import { usersRouter } from './users';
import { publicShopsRouter } from './shops';

const mainRouter = Router();

router.use('/users', usersRouter);
router.use('/shops', publicShopsRouter);

export { mainRouter };

// src/routes/shops/index.ts
import { Router } from 'express';

const publicShopsRouter = Router();
publicShopsRouter.get('/:shopId', readShop);
publicShopsRouter.get('/', listShops);

export { publicShopsRouter };

// src/routes/users/index.ts
import { Router } from 'express';
import { privateShopsRouter } from './shops';

const usersRouter = Router();
usersRouter.post('/', createUser);
usersRouter.use('/:userId/shops', priveShop);

export { usersRouter }

// src/routes/users/shops/index.ts
import { Router } from 'express';

const privateShopsRouter = Router();
privateShopsRouter.post('/', createShop);
privateShopsRouter.put('/:shopId', updateShop);

export { privateShopsRouter };`}</CodeBlock>
      </ArticleSection>
      <ArticleSection id="actual-endpoints" title="The Actual Endpoints">
        <ArticleParagraph>
          Now, what to put in our actual endpoints ?
          <br />
          All endpoints endpoints with a route{' '}
          <InlineCode>/users/:userId</InlineCode> require an authentification,
          and the ones on the{' '}
          <InlineCode>/user/:userId/shops/:shopId</InlineCode> should both
          authenticate the user and retreive the data of a shop belonging to
          said user. so we could write a function{' '}
          <InlineCode>
            {`async function authenticateUser(userId: string): Promise<User>`}
          </InlineCode>{' '}
          and an other{' '}
          <InlineCode>{`async function fetchUserShop(shopId: string, user: User): Promise<Shop>`}</InlineCode>
          and call thos inside the relevant endpoint.
        </ArticleParagraph>
        <ArticleBulletPoints label="But that whould cause two (at least) major issues for maintenance:">
          <ArticleBulletPointsItem>
            <p>
              If for some reason the <InlineCode>userId</InlineCode> changes to
              be a <InlineCode>number</InlineCode> instead of a{' '}
              <InlineCode>string</InlineCode>, we will have to change every
              endpoints.
            </p>
          </ArticleBulletPointsItem>
          <ArticleBulletPointsItem>
            <p>
              Many endpoints (eg: <InlineCode>createShop</InlineCode>,{' '}
              <InlineCode>updateShop</InlineCode>, ...) will be responsible of
              the authentification and that is not{' '}
              <InlineLink href="https://en.wikipedia.org/wiki/SOLID">
                SOLID
              </InlineLink>
              .
            </p>
          </ArticleBulletPointsItem>
        </ArticleBulletPoints>
        <ArticleParagraph>
          In ordre to avoid that, we would rather directly have an object{' '}
          <InlineCode>user: User</InlineCode> directly inside our{' '}
          <InlineCode>/user/:userId</InlineCode> endpoints and an other{' '}
          <InlineCode>shop: Shop</InlineCode> for the{' '}
          <InlineCode>/user/:userId/shops/:shopId</InlineCode> ones.
        </ArticleParagraph>
        <ArticleParagraph>
          As you might have figured, we will use middlewares to do that.
          <br />
          Why ?
          <br />
          Because since we use nested routers, it makes sure the function is
          always called when it needs to. Also, middlewares are specifically
          designed to modify the <InlineCode>Request</InlineCode> and{' '}
          <InlineCode>Response</InlineCode> objects across a single
          request-response cycle.
        </ArticleParagraph>
        <ArticleParagraph>
          Before even starting to code the middlewares, we need to know what to
          use to transfer data from out middleware to our endpoints. I tried
          several ways to do it, but each have pitfalls or major inconveniences,
          so I&apos;ll just share the two &quot;best&quot; ones I use:
        </ArticleParagraph>
        <ArticleParagraph>
          First one is{' '}
          <InlineLink href="https://www.digitalocean.com/community/tutorials/typescript-module-augmentation">
            module augmentation
          </InlineLink>
          . It means you can do things like{' '}
          <InlineCode> let user = req.user</InlineCode> and TypeScript will know
          (infer) the <InlineCode>User</InlineCode> interface for you.
          <br />
          However, the big inconvenience is that it modifies the{' '}
          <InlineCode>Request</InlineCode> interface from Express itself,
          meaning that you will have to either define a user for every route or
          check its presence in all your endpoints. Which kinf of defeats the
          separation of concern principle we wanted to implement in the first
          place.
          <br />
          You should still keep it mind for the cases where the data is always
          set, for example an API that is accessible only to signed in users.
        </ArticleParagraph>
        <ArticleParagraph>
          The other one that we will use here fits better in most cases and is
          very versatile. Combined with a good definition of our endpoints
          (typically just respect the REST principles) it can be very powerful.
          <br />
          I&apos;m talking here about using the{' '}
          <InlineLink href="https://expressjs.com/en/api.html#res">
            <InlineCode>locals</InlineCode>
          </InlineLink>{' '}
          field of the <InlineCode>Response</InlineCode> interface.
          <br />
          It&apos;s primarly meant to be used by rendering engines, but it fits
          really nicely for JSON APIs. (Tell me if I&apos;m wrong)
          <br />
          By using it, you will be able to define, in our case{' '}
        </ArticleParagraph>
        <CodeBlock>
          {`// src/routes/users/index.ts
/*
 * I like defining the Request and Response types along with the router
 * because those will be used for the entire router, just makes sense
 */
import { Locals } from 'express';

export interface AuthenticatedUserLocals extends Locals {
  user: User;
};
...`}
        </CodeBlock>
        <ArticleParagraph>
          and then modify or access it with{' '}
          <InlineCode>let user = req.locals.user</InlineCode> and TypeScript
          will know right away the user variable is a User interface.
        </ArticleParagraph>
      </ArticleSection>
      <ArticleSection
        id="auth-middleware"
        title="Auth Middleware Inplementation"
      >
        <ArticleParagraph>
          We can now design our authentification middleware:
        </ArticleParagraph>
        <CodeBlock>
          {` // src/routes/users/middlewares.ts
export async function authenticateUser(req: Request, res: Response<any, AuthenticatedUserLocals, next: NextFunction) {
  /*
   * You can handle the retreival of user logic here here:
   *  - Not Found -> return res.status(404).json({ message: 'User Not Found' })
   *  - Missing session header ? -> return res.status(401).json({ message: 'Session header missing' })
   *  - Etc...
   */
  let user: User = ... // When it succeds
  req.locals.user = user; // Store the object in the locals field
  next(); // Send req and res to the next function.
}`}
        </CodeBlock>
        <ArticleParagraph>
          Notice that I defined the body as any, but you could have set anything
          you want if you validated the body beforehand, in an other middleware
          of course.
        </ArticleParagraph>
        <ArticleParagraph>
          And call said middleware in the usersRouter:
        </ArticleParagraph>
        <CodeBlock>
          {`// src/routes/users/index.ts
...
const usersRouter = Router();
usersRouter.use('/:userId', authenticateUser);
usersRouter.post('/', createUser);
...`}
        </CodeBlock>
        <ArticleParagraph>
          Now, any route behind <InlineCode>/users/:userId</InlineCode> are
          ensured to have a valid User in the{' '}
          <InlineCode>res.locals</InlineCode> object, Because we already
          rejected any other case inside the authentication middleware.
        </ArticleParagraph>
      </ArticleSection>
      <ArticleSection
        id="private-shops"
        title="What about the private shops routes ?"
      >
        The endpoints <InlineCode>/users/:userId/shops/:shopId</InlineCode> need
        a shop that belongs to the right user.
        <br />
        Do we implement a new middleware that performs both the user
        authentication and the shop retreival ?
        <br />
        No ! The middleware MUST do only one thing. In this case, retreiving a
        shop belonging to a user. Authentification was already done in the
        authentication middleware and the user filed is still available in any
        middleware.
        <br />
        We can now write a middleware that focuses only on the shop aspect.
        <CodeBlock>
          {`// src/routes/users/shops/middlewares.ts
export async function fetchUserShop(req: Request, res: Response<any, AuthenticatedUserShopLocals>, next: NextFunction) {
  /*
   * Same thinf as before, handle undesirable cases here
   */
  let shop = someFunctionThatGetAShopBelongingToAUser(shopId, res.locals.user);
  res.locals.shop = shop;
}`}
        </CodeBlock>
        <ArticleParagraph>
          With the <InlineCode>AuthenticatedUserShopLocals</InlineCode> defined
          as follows:
        </ArticleParagraph>
        <CodeBlock>
          {`// src/routes/users/shops/index.ts
import { AuthenticatedUserLocals } from "..";

export interface AuthenticatedUserShopsLocals extends AuthenticatedUserLocals {
  shop: Shop;
}
        `}
        </CodeBlock>
        <ArticleParagraph>
          See how the interface extends the previous one ?
          <br />
          That&apos;s exactly why I find this solution so elegant, no code has
          been duplicated and every thing is in order.
          <br />
          If at some point we change the <InlineCode>User</InlineCode>{' '}
          interface, all our endpoints will still be valid. And that is really
          SOLID (and cool).
        </ArticleParagraph>
      </ArticleSection>
      <ArticleSection id="end">
        <ArticleParagraph>
          I could continue to tell you how this method is cool and how it
          integrates great with body validation middlewares but this articel is
          already pretty long and even I is starting to get bored (and I read
          RFCs).
        </ArticleParagraph>
        <ArticleParagraph>
          Anyway, we found a neat way to partially enforce modularity by using
          nested routers, middlewares and Express&apos;s possibility to type the{' '}
          <InlineCode>Response</InlineCode> object at the router level in a way
          that allows us to make sure the data we need is there and TypeScript
          knows about it (well don&apos;t forget to call the middlewares).
        </ArticleParagraph>
        <ArticleParagraph>
          If you need a full working example, you will find it on{' '}
          <InlineLink href="https://github.com/Xapadoan/ExpressTypedRequests">
            my github
          </InlineLink>
          , go take a look !
        </ArticleParagraph>
      </ArticleSection>
    </>
  );
};

const meta: Metadata = {
  title: 'Enforce modularity with middlewares',
};

EnforceModularityWithMiddlewares.getLayout = (page) => (
  <ArticleLayout meta={meta}>{page}</ArticleLayout>
);

export default EnforceModularityWithMiddlewares;

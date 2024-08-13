import cn from 'classnames';
import { cuteFont } from '@styles/fonts';
import { InlineLink } from '@components/InlineLink';

function NavBar() {
  return (
    <nav className="flex justify-evenly md:flex-col md:pl-3">
      <InlineLink href="/">Home</InlineLink>
      <InlineLink href="/articles">Articles</InlineLink>
    </nav>
  );
}

export function Banner() {
  return (
    <div className="w-screen md:h-[140px] flex flex-col md:flex-row-reverse items-center md:justify-end bg-passive-bg">
      <p className={cn('text-[60px]', cuteFont.className)}>XAVIER PADOAN</p>
      <div className="w-screen md:w-1/5">
        <NavBar />
      </div>
    </div>
  );
}

import { ReactElement } from "react";

type LayoutType = {
  title?: string,
  subtitle?: string,
  children?: ReactElement,
  footer?: ReactElement
}

export default function Layout({ title, subtitle, children, footer }: LayoutType) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-200 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-6xl flex-col items-center justify-between py-8 px-8 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col w-full items-center gap-6 text-center sm:items-start sm:text-left">
          {title ? (
            <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              {title}
            </h1>
          ) : null}
          {subtitle ? (
            <h2 className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              {subtitle}
            </h2>
          ) : null}
          {children || null}
        </div>
        {footer ? (
          <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
            {footer}
          </div>
        ) : null}
      </main>
    </div>
  );
}
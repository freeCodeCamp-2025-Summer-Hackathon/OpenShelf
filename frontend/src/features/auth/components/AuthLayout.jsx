import { Link } from 'react-router'

export default function AuthLayout({ children }) {
  return (
    <div className="flex flex-col justify-center items-center py-6 min-h-dvh">
      <div className="flex flex-col justify-center items-center">
        {children}
      </div>
      <p className="text-sm text-stroke-strong text-center pt-12">
        Made by Team Lavender 💜
      </p>
    </div>
  )
}

AuthLayout.Nav = function ({ children }) {
  return (
    <div className="absolute top-10 left-12 flex flex-row items-center gap-10">
      <Link to="/">
        <img src="OpenShelf.png" width="150" className=""></img>
      </Link>
      {children}
    </div>
  )
}

AuthLayout.Header = function ({ children }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src="logo.svg" className="size-12" />
      <h1 className="font-display-3xl text-[#949494]">{children}</h1>
    </div>
  )
}

AuthLayout.Body = function ({ children }) {
  return <div className="w-96 mt-8">{children}</div>
}

AuthLayout.ButtonDivider = function () {
  return (
    <div className="mt-4 flex flex-row items-center gap-8">
      <hr className="border-stroke-weak w-full"></hr>
      <p className="text-[#CACACA] text-lg">Or</p>
      <hr className="border-stroke-weak w-full"></hr>
    </div>
  )
}

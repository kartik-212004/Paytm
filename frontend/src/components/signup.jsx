export default function Signup() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign up to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="firstname" className="label-form">
                First Name
              </label>
              <div className="mt-2">
                <input
                  id="firstname"
                  placeholder="Kartik"
                  name="firstname"
                  type="text"
                  required
                  autoComplete="firstname"
                  className="input-form"
                />
              </div>
            </div>
            <div>
              <label htmlFor="lastname" className="label-form">
                Last Name
              </label>
              <div className="mt-2">
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  placeholder="bhatt"
                  required
                  autoComplete="lastname"
                  className="input-form"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="label-form">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="kartik@gmail.com"
                  required
                  autoComplete="email"
                  className="input-form"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="label-form">
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  placeholder="kartikbhatt"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="input-form"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Alreadu have an account?{" "}
            <a
              href="/signin"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

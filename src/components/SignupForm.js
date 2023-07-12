

export function SignupForm(){
return (
    <div>
        <div className="font-main flex justify-center text-2xl pb-8"><p>Become a Member</p></div>
        <form
            className="font-main bg-yellow border-8 solid shadow-md rounded px-8 pt-8 pb-10 mb-4"
        >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="user_name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="user_email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="user_password"
                required
              />
            </div>
            <div className="flex items-center justify-center">
              <input
                className="bg-lightblue hover:bg-orange hover:scale-105 ease-out duration-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-96 h-16"
                type="submit"
                value="Sign Up"
              />
            </div>
        </form>
    </div>
    );
}

export default SignupForm;
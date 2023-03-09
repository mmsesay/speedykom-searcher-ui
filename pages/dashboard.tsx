export default function Dashboard() {
  return (
    <div className="overflow-hidden">
      {/* search field section */}
      <div className="h-10 flex justify-center my-10 space-x-48">
        <div className="w-2/5">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <input
              type="search"
              className="relative m-0 -mr-px block w-[1%] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon1"
            />
            <button
              className="relative z-[2] flex items-center rounded-r bg-blue-500 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
              type="button"
              id="button-addon1"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="my-2">
          <p className="hover:text-blue-500 cursor-pointer">logout</p>
        </div>
      </div>
      {/* content section */}
      <div className="bg-blue-600 h-fit my-3">
        <p>content...</p>
        <p>content...</p>
        <p>content...</p>
        <p>content...</p>
        <p>content...</p>
        <p>content...</p>
        <p>content...</p>
        <p>content...</p>
      </div>
      {/* footer */}
      <div className="">
        <p className="text-center text-gray-500 text-xs absolute inset-x-0 bottom-0 mb-10">
          &copy;2023 Health Searcher App. All rights reserved.
        </p>
      </div>
    </div>
  );
}

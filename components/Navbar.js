import React from 'react'

const Navbar = () => {
    return (
        <nav className="flex-no-wrap relative flex w-full items-center justify-between bg-zinc-50 py-2 shadow-dark-mild dark:bg-neutral-700 lg:flex-wrap lg:justify-start lg:py-4">

            <div className="relative flex items-center">
                <a className="me-4 text-neutral-600 dark:text-white" href="#">
                    <span className="[&>svg]:w-5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                        </svg>
                    </span>
                </a>
                <div
                    className="relative"
                    data-twe-dropdown-ref=""
                    data-twe-dropdown-alignment="end"
                >
                    <a
                        className="me-4 flex items-center text-neutral-600 dark:text-white"
                        href="#"
                        id="dropdownMenuButton1"
                        role="button"
                        data-twe-dropdown-toggle-ref=""
                        aria-expanded="false"
                    >
                        <span className="[&>svg]:w-5">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                        <span className="absolute -mt-4 ms-2.5 rounded-full bg-danger px-[0.35em] py-[0.15em] text-[0.6rem] font-bold leading-none text-white">
                            1
                        </span>
                    </a>
                    <ul
                        className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark"
                        aria-labelledby="dropdownMenuButton1"
                        data-twe-dropdown-menu-ref=""
                    >
                        <li>
                            <a
                                className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                                href="#"
                                data-twe-dropdown-item-ref=""
                            >
                                Action
                            </a>
                        </li>
                        <li>
                            <a
                                className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                                href="#"
                                data-twe-dropdown-item-ref=""
                            >
                                Another action
                            </a>
                        </li>
                        <li>
                            <a
                                className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                                href="#"
                                data-twe-dropdown-item-ref=""
                            >
                                Something else here
                            </a>
                        </li>
                    </ul>
                </div>
                <div
                    className="relative"
                    data-twe-dropdown-ref=""
                    data-twe-dropdown-alignment="end"
                >
                    <a
                        className="flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
                        href="#"
                        id="dropdownMenuButton2"
                        role="button"
                        data-twe-dropdown-toggle-ref=""
                        aria-expanded="false"
                    >
                        {/* User avatar */}
                        <img
                            src="https://tecdn.b-cdn.net/img/new/avatars/2.jpg"
                            className="rounded-full"
                            style={{ height: 25, width: 25 }}
                            alt=""
                            loading="lazy"
                        />
                    </a>
                    <ul
                        className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark"
                        aria-labelledby="dropdownMenuButton2"
                        data-twe-dropdown-menu-ref=""
                    >
                        {/* Second dropdown menu items */}
                        <li>
                            <a
                                className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                                href="#"
                                data-twe-dropdown-item-ref=""
                            >
                                Action
                            </a>
                        </li>
                        <li>
                            <a
                                className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                                href="#"
                                data-twe-dropdown-item-ref=""
                            >
                                Another action
                            </a>
                        </li>
                        <li>
                            <a
                                className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                                href="#"
                                data-twe-dropdown-item-ref=""
                            >
                                Something else here
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
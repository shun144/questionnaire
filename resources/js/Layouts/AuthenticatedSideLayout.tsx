import { useState, PropsWithChildren, ReactNode } from "react";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import ProfileDropdown from "@/Components/ProfileDropdown";
import { Link, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import { TbNotebook } from "react-icons/tb";
import { MdOutlineSummarize } from "react-icons/md";
import ApplicationLogo from "@/Components/ApplicationLogo";
import HamburgerToggle from "@/Components/HamburgerToggle";
import { useOwnerStore } from "@/Pages/Owner/store";

const links = [
    {
        name: "dashboard",
        display: "アンケート",
        icon: TbNotebook,
    },
    {
        name: "totalling",
        display: "集計",
        icon: MdOutlineSummarize,
    },
];

const sidebarVariants = {
    open: (width: string) => ({
        width,
    }),
    closed: { width: "0%" },
};

export default function AuthenticatedSideLayout({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const isSidebarOpen = useOwnerStore((state) => state.isSidebarOpen);
    const setIsSidebarOpen = useOwnerStore((state) => state.setIsSidebarOpen);

    return (
        <div className="w-full min-h-screen h-screen">
            <div className="w-full h-full flex">
                <motion.div
                    className="sidebar h-full overflow-hidden bg-stone-100 boder border-r-2 border-slate-200 shadow-xl"
                    variants={sidebarVariants}
                    initial={false}
                    animate={isSidebarOpen ? "open" : "closed"}
                    custom={"10rem"}
                    transition={{ type: "tween", duration: 0.4 }}
                >
                    <div className="flex flex-col justify-start items-start">
                        <div className="w-full flex justify-center items-center h-14 border-b-2">
                            <Link href="/">
                                <ApplicationLogo className="block h-9 fill-current text-indigo-800" />
                            </Link>
                        </div>

                        {links.map(({ name, display, icon }) => (
                            <NavLink
                                key={name}
                                href={route(name)}
                                active={route().current(name)}
                                icon={icon}
                            >
                                {display}
                            </NavLink>
                        ))}
                    </div>
                </motion.div>
                <div className="grow h-full flex flex-col">
                    <div className="w-full h-14 border-b border-slate-200 shadow">
                        <div className="h-full flex justify-between items-center">
                            <div className="ms-1 group">
                                <button
                                    className="h-10 px-4 flex justify-center items-center"
                                    onClick={() =>
                                        setIsSidebarOpen(!isSidebarOpen)
                                    }
                                >
                                    <HamburgerToggle
                                        isOpen={isSidebarOpen}
                                        className="w-4 h-3"
                                    />
                                </button>
                            </div>

                            {/* {header} */}

                            <div className="sm:flex hidden sm:items-center sm:ms-6 ">
                                <div className="relative me-5">
                                    <ProfileDropdown />
                                </div>
                            </div>
                        </div>
                    </div>

                    <main className="grow overflow-y-scroll">{children}</main>
                </div>
            </div>
        </div>
    );
}

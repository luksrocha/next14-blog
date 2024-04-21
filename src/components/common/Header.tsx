import React, { Suspense } from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarItem,
    NavbarContent,
} from "@nextui-org/react";
import Link from "next/link";
import HeaderAuth from "./HeaderAuth";
import { SearchInput } from "./SearchInput";

const Header = () => {
    return (
        <Navbar className="shadow mb-6">
            <NavbarBrand>
                <Link href="/" className="font-bold">
                    Discuss
                </Link>
            </NavbarBrand>

            <NavbarContent justify="center">
                <NavbarItem>
                    <Suspense>
                        <SearchInput />
                    </Suspense>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                <HeaderAuth />
            </NavbarContent>
        </Navbar>
    );
};

export { Header };

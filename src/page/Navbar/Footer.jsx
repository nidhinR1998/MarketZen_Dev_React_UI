import { Button } from "@/components/ui/button";
import { DragHandleHorizontalIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Correct import for Avatar
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { store } from "@/State/Store";

// Font Awesome for Icons
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    const { auth } = useSelector(store => store);

    return (
        <div className="px-4 py-6 bg-background text-gray-600 border-t flex flex-col gap-4">
            {/* Left Section: Logo and Description - Centered */}
            <div className="flex flex-col items-center text-center">
                <h1 className="text-lg font-bold text-gray-800">MarketZen</h1>
                <p className="text-sm text-gray-600 mt-2">
                    Your go-to platform for crypto insights and daily news updates.
                </p>
            </div>

            {/* Center Section: Links */}
            <div className="flex flex-wrap justify-center gap-6">
                <a href="https://nidhinr1998.github.io/MyPortfolioWebLive/" className="text-sm hover:text-gray-800 transition">
                    About Us
                </a>
                <a href="#crypto-news" className="text-sm hover:text-gray-800 transition">
                    Crypto News
                </a>
                <a href="https://nidhinr1998.github.io/MyPortfolioWebLive/#experience" className="text-sm hover:text-gray-800 transition">
                    Services
                </a>
                <a href="https://nidhinr1998.github.io/MyPortfolioWebLive/#contact" className="text-sm hover:text-gray-800 transition">
                    Contact
                </a>
                <a href="#faq" className="text-sm hover:text-gray-800 transition">
                    FAQ
                </a>
            </div>

            {/* Social Media Icons - Positioned Below Footer Content */}
            <div className="flex justify-center gap-4 py-4 border-t mt-4">
                <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition"
                >
                    <FaFacebookF size={20} />
                </a>
                <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-400 transition"
                >
                    <FaTwitter size={20} />
                </a>
                <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-pink-500 transition"
                >
                    <FaInstagram size={20} />
                </a>
                <a
                    href="https://www.linkedin.com/in/nidhin-r-7a2469222/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-800 transition"
                >
                    <FaLinkedin size={20} />
                </a>
            </div>
        </div>
    );
};

export default Footer;

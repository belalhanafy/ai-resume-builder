import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/clerk-react';
import { FiArrowRightCircle } from "react-icons/fi";
import Loading from '@/loader/Loading';
import { RxDashboard } from "react-icons/rx";
import logoImage from '@/assets/images/resume-maker-high-resolution-logo-transparent .png'

const Header = () => {
    const { isSignedIn, isLoaded } = useUser();

    if (!isLoaded) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loading />
            </div>
        );
    }

    return (
        <div className="bg-slate-200 shadow-md">
            <div className="p-3 px-5 flex items-center justify-between container mx-auto">
                <Link to={'/'}>
                    <div>
                        <img src={logoImage} alt="logo" width={250} />
                    </div>
                </Link>
                {isSignedIn ? (
                    <div className="flex gap-8 items-center">
                        <Link to={'/dashboard'}>
                            <Button className="bg-sky-600 hover:bg-sky-800 flex items-center gap-2">
                                Dashboard
                                <RxDashboard />
                            </Button>
                        </Link>
                        <UserButton appearance={{ elements: { avatarBox: "w-10 h-10" } }} />
                    </div>
                ) : (
                    <Link to="/auth/sign-in">
                        <Button className="bg-sky-600 hover:bg-sky-800 flex items-center gap-2">
                            Get Started
                            <FiArrowRightCircle />
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Header;

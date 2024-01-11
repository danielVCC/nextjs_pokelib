import Link from "next/link";

import { CustomButton, Logo } from ".";

const NavBar = () => (
  <header className='w-full  absolute z-10'>
    <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent'>
      <Link href='/' className='flex justify-center items-center'>
        <Logo />
      </Link>

      <CustomButton
        title='Sign in'
        buttonType='button'
        containerStyles='text-primary-blue rounded-full bg-white min-w-[130px]'
      />
    </nav>
  </header>
);

export default NavBar;
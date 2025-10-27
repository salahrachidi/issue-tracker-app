'use client';
//? [usePathname] depends on browser APIs, the cmpnnt must be converted to a client cmpnnt *BECAUSE WE ONLY CAN ACCESS BROWSER COMPONENTS USING CLIENT CMPNNTs*
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import classnames from 'classnames'; //! classnames a fct that takes an obj with a spicefied classes we wanna render and the cndtions controle the rndrng

const NavBar = () => {
	const currPth = usePathname();
	const links = [
		{label: 'Dashboard', href: '/'},
		{label: 'Issues', href: '/issues'},
	]
  return (
	<nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
		<Link href="/"><AiFillBug/></Link>
		<ul className='flex space-x-6'>
			{links.map(link => 
				//!Before using classnames package <Link key={link.href} className={`${link.href == currPth ? 'text-indigo-900' : 'text-zink-500'} hover:text-indigo-800 transition-colors`} href={link.href}>
				<Link	key={link.href}
						className={classnames({
							'text-indigo-800' : link.href === currPth,
							'text-zinc-500' : link.href !== currPth,
							'hover:text-indigo-800 transition-colors' : true

				})} href={link.href}>
					{link.label}</Link>
				)}

		</ul>
	</nav>
  )
}

export default NavBar
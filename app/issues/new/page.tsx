//!Building a form needs user interaction so it must not be render on the server
'use client';
import { Button, TextField } from	'@radix-ui/themes'
import dynamic from 'next/dynamic';

const SimpleMdeReact = dynamic(() => import('react-simplemde-editor'), {
	ssr: false,
});


const NewIssuePage = () => {
  return (
	<div className='max-w-xl space-y-3'>
		<TextField.Root placeholder='Title' />
		<SimpleMdeReact placeholder="description" />
		<Button>Submit new issue</Button>
	</div>
  )
}

export default NewIssuePage

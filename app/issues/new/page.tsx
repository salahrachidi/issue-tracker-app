//!Building a form needs user interaction so it must not be render on the server
'use client';
import { Button, TextField } from	'@radix-ui/themes'
import dynamic from 'next/dynamic'
import { useForm, Controller } from 'react-hook-form'
import	axios from 'axios';
import { useRouter } from 'next/navigation';

const SimpleMdeReact = dynamic(() => import('react-simplemde-editor'), {
	ssr: false,
});


interface	IssueForm {
	title:	string;
	description: string;
}

const NewIssuePage = () => {
	const router = useRouter();
	const { register, control, handleSubmit } = useForm<IssueForm>();
	const onSubmit = handleSubmit(async (data) => {
		await axios.post('/api/issues', data);
		router.push('/issues');
	});
  return (
	<form className='max-w-xl space-y-3' onSubmit={onSubmit}>
		<TextField.Root placeholder='Title' {...register('title')} />
		<Controller 
			name="description"
			control={control}
			render={({ field }) => <SimpleMdeReact placeholder="description" {...field}/>}
		/>
		<Button type="submit">Submit new issue</Button>
	</form>
  )
}

export default NewIssuePage

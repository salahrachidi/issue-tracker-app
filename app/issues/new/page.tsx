//!Building a form needs user interaction so it must not be render on the server
'use client';
import { Button, Callout, TextField, Text } from	'@radix-ui/themes'
import dynamic from 'next/dynamic'
import { useForm, Controller } from 'react-hook-form'
import	axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod';
const SimpleMdeReact = dynamic(() => import('react-simplemde-editor'), {
	ssr: false,
});

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
	const[error, setError] = useState('');
	const router = useRouter();
	const { register, control, handleSubmit, formState: {errors} } = useForm<IssueForm>({
		resolver: zodResolver(createIssueSchema)
	});
	const onSubmit = handleSubmit(async (data) => {
		try {
			await axios.post('/api/issues', data);
			router.push('/issues');
		} catch (error) {
			setError('An unexpected error occurred.');
		}
	});	
  return (
	<div className='max-w-xl'>
		{error && <Callout.Root color='red' className='mb-5'>
			<Callout.Text>{error}</Callout.Text>
			</Callout.Root>}
		<form className=' space-y-3' onSubmit={onSubmit}>
			<TextField.Root placeholder='Title' {...register('title')} />
			{errors.title && <Text color='red' as="p"> {errors.title.message} </Text>}
			<Controller
				name="description"
				control={control}
				render={({ field }) => <SimpleMdeReact placeholder="description" {...field}/>}
			/>
			{errors.description && <Text color='red' as='p'>{errors.description.message}</Text>}
			<Button type="submit">Submit new issue</Button>
		</form>
	</div>
  )
}

export default NewIssuePage

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function InputForm({ createTranslation }) {
  const [content, setContent] = useState('');
  const { paragraphId } = useParams();
  const queryClient = useQueryClient();

  const postMutation = useMutation({
    mutationFn: createTranslation,
    onSuccess: () => {
      queryClient.invalidateQueries(['translations', paragraphId]);
    },
  });

  const onCreateTranslation = (e) => {
    e.preventDefault();
    postMutation.mutate(content);
    setContent('');
  };

  return (
    <form onSubmit={onCreateTranslation} className='create-translation'>
      <textarea
        id='content'
        name='content'
        required
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className='create-translation_textarea'
      ></textarea>
      <br />
      <input
        type='submit'
        value='Create Translation'
        className='create-translation_input'
      ></input>
    </form>
  );
}

export default InputForm;

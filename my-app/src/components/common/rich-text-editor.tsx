import { extensions } from '@/lib/editor.utils';
import { EditorProvider } from '@tiptap/react';

type Props = {
  content: string;
}

const RichTextEditor: React.FC<Props> = ({ content }) => {
  return (
    <div className='border border-gray-300 p-2 rounded'>
      <EditorProvider
        extensions={extensions}
        content={content}
      >
      </EditorProvider>
    </div>
  )
}

export default RichTextEditor

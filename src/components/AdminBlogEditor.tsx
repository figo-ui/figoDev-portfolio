import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Save, Bold, Italic, Heading1, Heading2, List, ListOrdered, ImageIcon } from 'lucide-react';

interface AdminBlogEditorProps {
  onSave?: (content: string) => void;
}

export default function AdminBlogEditor({ onSave }: AdminBlogEditorProps) {
  const [title, setTitle] = React.useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
      })
    ],
    content: '<p>Start drafting your log...</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[300px] p-4 font-sans text-sm text-gray-300'
      }
    }
  });

  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt('Enter image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="bg-[#121212] border border-white/5 rounded-3xl overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.02)]">
      <div className="p-6 border-b border-white/5 space-y-4">
        <h3 className="font-sans text-2xl font-black text-white">Compose New Entry</h3>
        <input 
          placeholder="Entry Title..."
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full bg-transparent border-none text-2xl font-sans font-bold text-white placeholder-gray-600 focus:outline-none focus:ring-0"
        />
      </div>

      <div className="flex flex-wrap items-center gap-1 p-2 bg-[#080808] border-b border-white/5">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-2 rounded-lg transition ${editor.isActive('bold') ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
        >
          <Bold size={14} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-2 rounded-lg transition ${editor.isActive('italic') ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
        >
          <Italic size={14} />
        </button>
        <div className="w-px h-4 bg-white/10 mx-2" />
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded-lg transition ${editor.isActive('heading', { level: 1 }) ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
        >
          <Heading1 size={14} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded-lg transition ${editor.isActive('heading', { level: 2 }) ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
        >
          <Heading2 size={14} />
        </button>
        <div className="w-px h-4 bg-white/10 mx-2" />
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-lg transition ${editor.isActive('bulletList') ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
        >
          <List size={14} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-lg transition ${editor.isActive('orderedList') ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
        >
          <ListOrdered size={14} />
        </button>
        <div className="w-px h-4 bg-white/10 mx-2" />
        <button
          onClick={addImage}
          className="p-2 rounded-lg text-gray-500 hover:text-white transition"
        >
          <ImageIcon size={14} />
        </button>
      </div>

      <div className="bg-[#080808]">
        <EditorContent editor={editor} />
      </div>

      <div className="p-6 border-t border-white/5 flex justify-end gap-3 bg-[#121212]">
        <button className="px-5 py-2 font-mono text-xs uppercase tracking-widest text-gray-400 hover:text-white transition">
          Preview
        </button>
        <button 
           onClick={() => onSave?.(editor.getHTML())}
           className="flex items-center gap-2 bg-[#4edea3] text-black px-6 py-2 rounded-xl font-mono text-xs font-bold hover:bg-[#6ffbbe] tracking-widest uppercase transition-all"
        >
          <Save size={14} /> Publish Entry
        </button>
      </div>
    </div>
  );
}

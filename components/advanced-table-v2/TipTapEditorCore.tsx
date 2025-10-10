"use client"

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';

interface TipTapEditorCoreProps {
  initialContent?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  className?: string;
}

const TipTapEditorCore: React.FC<TipTapEditorCoreProps> = ({
  initialContent = '',
  onChange,
  placeholder = 'Escribe aquí...',
  className = ''
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Table.configure({
        resizable: true,
        handleWidth: 5,
        cellMinWidth: 92,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none',
      },
    },
  });

  return (
    <div className={className}>
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTapEditorCore;

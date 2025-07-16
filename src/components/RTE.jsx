import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue = '' }) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-indigo-400"
        >
          {label}
        </label>
      )}

      <Controller
        name={name || 'content'}
        control={control}
        render={({ field }) => (
          <Editor
            apiKey="pu9f7jp4o9ruphhez5c893uaq5vf899vksoybhysxc71m996"
            value={field.value}
            onEditorChange={field.onChange}
            onBlur={field.onBlur}
            init={{
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              skin: 'oxide-dark',
              content_css: 'dark',
              plugins: [
                'advlist',
                'autolink',
                'lists',
                'link',
                'image',
                'charmap',
                'preview',
                'anchor',
                'searchreplace',
                'visualblocks',
                'code',
                'fullscreen',
                'insertdatetime',
                'media',
                'table',
                'help',
                'wordcount',
              ],
              toolbar:
                'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | image media link | code fullscreen help',
              content_style:
                'body { background-color: #0f172a; color: #f8fafc; font-family: Inter, sans-serif; font-size: 14px; padding: 10px; }',
            }}
          />
        )}
      />
    </div>
  );
}
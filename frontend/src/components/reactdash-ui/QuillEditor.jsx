import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QuillEditor = ({ value, onChange }) => {
  const [text, setText] = useState(value || '');
  const quillRef = useRef(null);

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleChange = (value) => {
    setText(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="mb-6 [&_.ql-editor]:min-h-[240px] [&_.ql-snow]:border-gray-200 dark:[&_.ql-snow]:border-gray-700">
      <ReactQuill ref={quillRef} value={text} onChange={handleChange} />
    </div>
  );
};

export default QuillEditor;
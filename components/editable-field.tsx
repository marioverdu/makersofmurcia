"use client"

import React, { useState, useEffect, useRef } from 'react';
import type { EditableField } from '@/types/work-experience';

interface EditableFieldProps {
  value: string;
  isEditing: boolean;
  hasChanges: boolean;
  onValueChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  className?: string;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  maxLength?: number;
}

export function EditableField({
  value,
  isEditing,
  hasChanges,
  onValueChange,
  onSave,
  onCancel,
  className = '',
  placeholder = '',
  multiline = false,
  rows = 3,
  maxLength
}: EditableFieldProps) {
  const [localValue, setLocalValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // Update local value when prop changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      // Select all text for better UX
      if (inputRef.current instanceof HTMLInputElement) {
        inputRef.current.select();
      }
    }
  }, [isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onValueChange(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  const handleSave = () => {
    if (localValue !== value) {
      console.log('🔄 EditableField: Saving changes');
      onSave();
    }
  };

  const handleCancel = () => {
    setLocalValue(value);
    onCancel();
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Auto-save on blur if there are changes
    if (hasChanges && localValue !== value) {
      console.log('🔄 EditableField: Auto-saving on blur');
      handleSave();
    }
  };

  if (!isEditing) {
    return (
      <div 
        className={`${className} ${hasChanges ? 'text-cyan-600 font-medium' : ''}`}
        style={{ 
          minHeight: multiline ? `${rows * 1.5}rem` : 'auto',
          whiteSpace: multiline ? 'pre-wrap' : 'normal'
        }}
      >
        {localValue || placeholder}
      </div>
    );
  }

  const inputClasses = `
    w-full bg-transparent border-b border-gray-300 focus:border-cyan-500 
    outline-none px-1 transition-colors duration-200
    ${isFocused ? 'border-cyan-500' : ''}
    ${hasChanges ? 'text-cyan-600 font-medium' : ''}
    ${className}
  `;

  if (multiline) {
    return (
      <textarea
        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
        value={localValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        className={`${inputClasses} resize-none`}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        style={{ 
          minHeight: `${rows * 1.5}rem`,
          fontFamily: 'inherit',
          fontSize: 'inherit',
          lineHeight: 'inherit'
        }}
      />
    );
  }

  return (
    <input
      ref={inputRef as React.RefObject<HTMLInputElement>}
      type="text"
      value={localValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={() => setIsFocused(true)}
      onBlur={handleBlur}
      className={inputClasses}
      placeholder={placeholder}
      maxLength={maxLength}
      style={{ 
        fontFamily: 'inherit',
        fontSize: 'inherit',
        lineHeight: 'inherit'
      }}
    />
  );
}

// src/components/project/edit/EditableField.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Pencil, X, Check, AlertCircle } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Textarea } from '../../../components/ui/textarea';
import { ProjectField } from '../../../mocks/project-data';

interface EditableFieldProps {
  field: ProjectField;
  onSave: (fieldId: string, value: string) => void;
  onCancel: () => void;
}

export default function EditableField({ field, onSave, onCancel }: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(field.value);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setValue(field.value);
  }, [field.value]);

  const validate = (value: string): boolean => {
    if (!field.validation) return true;

    if (field.validation.required && !value.trim()) {
      setError('This field is required');
      return false;
    }

    if (field.validation.minLength && value.length < field.validation.minLength) {
      setError(`Minimum length is ${field.validation.minLength} characters`);
      return false;
    }

    if (field.validation.maxLength && value.length > field.validation.maxLength) {
      setError(`Maximum length is ${field.validation.maxLength} characters`);
      return false;
    }

    if (field.validation.pattern && !field.validation.pattern.test(value)) {
      setError('Invalid format');
      return false;
    }

    setError(null);
    return true;
  };

  const handleSave = () => {
    if (validate(value)) {
      onSave(field.id, value);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setValue(field.value);
    setError(null);
    setIsEditing(false);
    onCancel();
  };

  if (!field.isEditable) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-500">{field.name}</label>
          <span className="text-xs text-gray-400">(Not Editable)</span>
        </div>
        <div className="p-3 bg-gray-50 rounded-md text-gray-700">{field.value}</div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">{field.name}</label>
        {!isEditing && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="h-8"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {isEditing ? (
        <div className="space-y-2">
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={`w-full ${error ? 'border-red-500' : ''}`}
          />
          {error && (
            <div className="flex items-center text-red-500 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              {error}
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
            >
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
            >
              <Check className="h-4 w-4 mr-1" />
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-3 bg-white border rounded-md">{value}</div>
      )}
    </div>
  );
}
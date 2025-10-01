import { useCallback, useMemo, useState } from 'react';

export default function useProductRegistrationForm(initial = {}) {
  const [name, setName] = useState(initial.name ?? '');
  const [desc, setDesc] = useState(initial.desc ?? '');
  const [price, setPrice] = useState(initial.price ?? '');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState(Array.isArray(initial.tags) ? initial.tags : []);

  const [tagInputError, setTagInputError] = useState('');

  const [touched, setTouched] = useState({ name: false, desc: false, price: false, tags: false });
  const [submitted, setSubmitted] = useState(false);

  const addTag = useCallback(() => {
    let raw = tagInput.trim();
    if (!raw) return false;

    if (raw.startsWith('#')) raw = raw.slice(1).trim();

    const clean = raw.replace(/\s+/g, ' ');

    if (clean.length < 1 || clean.length > 5) {
      setTagInputError('태그는 1~5자 이내로 입력해주세요.');
      return false;
    }
    if (tags.includes(clean)) {
      setTagInputError('이미 추가된 태그입니다.');
      return false;
    }

    setTags(prev => [...prev, clean]);
    setTagInput('');
    setTagInputError('');
    return true;
  }, [tagInput, tags]);

  const removeTag = useCallback((t) => {
    setTags(prev => prev.filter(x => x !== t));
  }, []);

  const onKeyDownTagInput = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  }, [addTag]);

  const errors = useMemo(() => {
    const e = {};

    const n = name.trim().length;
    if (n < 1 || n > 10) {
      e.name = '10자 이내로 입력해주세요';
    }

    const d = desc.trim().length;
    if (d < 10 || d > 100) {
      e.desc = '10자 이상 입력해주세요';
    }

    const s = String(price).trim();
    const isDigits = /^[0-9]+$/.test(s);
    if (!s || !isDigits) {
      e.price = '숫자로 입력해주세요';
    }

    if (tags.length === 0) {
      e.tags = '5글자 이내로 입력해주세요';
    } else if (tags.some(t => t.length === 0 || t.length > 5)) {
      e.tags = '태그는 1~5자 이내로 입력해주세요.';
    }

    return e;
  }, [name, desc, price, tags]);

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const touchField = useCallback((field) => {
    setTouched(prev => (prev[field] ? prev : { ...prev, [field]: true }));
  }, []);

  const onFieldFocus = useCallback((field) => () => touchField(field), [touchField]);
  const onFieldBlur = useCallback((field) => () => touchField(field), [touchField]);

  const shouldShowError = useCallback(
    (field) => (submitted || touched[field]) && !!errors[field],
    [submitted, touched, errors]
  );

  return {
    values: { name, desc, price, tagInput, tags },

    setters: { setName, setDesc, setPrice, setTagInput, setTags },

    addTag,
    removeTag,
    onKeyDownTagInput,

    errors,
    tagInputError,
    isValid,
    setSubmitted,
    onFieldFocus,
    onFieldBlur,
    shouldShowError,
  };
}
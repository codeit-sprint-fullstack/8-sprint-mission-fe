import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useBreakpoint from '../hooks/useBreakpoint';
import '../styles/market.css';
import '../styles/registration.css';

// 유효성 검사
const required = (v) =>
    v == null || String(v).trim() === '' ? '필수 입력입니다.' : '';
const minPrice = (v) => (Number(v) > 0 ? '' : '1원 이상 입력하세요.');

export default function RegistrationPage() {
    const nav = useNavigate();
    const { current } = useBreakpoint();

    const [form, setForm] = useState({
        name: '',
        price: '',
        description: '',
        tags: '',
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const onChange = (e) => {
        const { name, value } = e.target;
        // 가격은 숫자만 허용
        if (name === 'price') {
            const onlyDigits = value.replace(/[^0-9]/g, '');
            setForm((p) => ({ ...p, [name]: onlyDigits }));
        } else {
            setForm((p) => ({ ...p, [name]: value }));
        }
    };

    const validate = () => {
        const next = {};
        next.name = required(form.name);
        const priceVal = (form.price || '').replace(/[^0-9]/g, '');
        next.price = required(priceVal) || minPrice(priceVal);
        next.description = required(form.description);
        return Object.fromEntries(
            Object.entries(next).filter(([_, v]) => Boolean(v)),
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v = validate();
        setErrors(v);
        if (Object.keys(v).length) return;
        setSubmitting(true);
        try {
            const cleanPrice = (form.price || '').replace(/[^0-9]/g, '');
            const body = {
                name: form.name.trim(),
                price: Number(cleanPrice),
                description: form.description.trim(),
                tags: form.tags
                    .split(',')
                    .map((t) => t.trim())
                    .filter((t) => t.length > 0),
            };
            const res = await fetch(
                'https://panda-market-api.vercel.app/products',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                },
            );
            if (!res.ok) throw new Error('등록 실패');
            const created = await res.json();
            const id = created?.id;
            // 성공 시 상세 페이지로 이동 (빈 페이지)
            if (id) nav(`/items/${id}`);
            else nav('/items');
        } catch (err) {
            alert('상품 등록에 실패했습니다. 잠시 후 다시 시도해주세요.');
        } finally {
            setSubmitting(false);
        }
    };

    const gridCols = 1;

    return (
        <main>
            <div className="wrapper">
                <h2 className="section-title">상품 등록</h2>
                <form
                    onSubmit={handleSubmit}
                    className={`form-grid cols-${gridCols}`}
                >
                    <div className="form-col">
                        <label htmlFor="name" className="label-strong">
                            상품명
                        </label>
                        <input
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={onChange}
                            placeholder="상품명을 입력해주세요"
                            required
                            className="input"
                        />
                        {errors.name && (
                            <span className="error-text">{errors.name}</span>
                        )}

                        <label
                            htmlFor="description"
                            className="label-strong mt-8"
                        >
                            상품 소개
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={current === 'mobile' ? 6 : 10}
                            value={form.description}
                            onChange={onChange}
                            placeholder="상품 소개를 입력해주세요"
                            required
                            className="textarea"
                        />
                        {errors.description && (
                            <span className="error-text">
                                {errors.description}
                            </span>
                        )}

                        <label htmlFor="price" className="label-strong mt-8">
                            판매 가격
                        </label>
                        <input
                            id="price"
                            name="price"
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={form.price}
                            onChange={onChange}
                            placeholder="판매 가격을 입력해주세요"
                            required
                            className="input"
                        />
                        {errors.price && (
                            <span className="error-text">{errors.price}</span>
                        )}

                        <label htmlFor="tags" className="label-strong mt-8">
                            태그
                        </label>
                        <input
                            id="tags"
                            name="tags"
                            value={form.tags}
                            onChange={onChange}
                            placeholder="태그를 입력해주세요"
                            className="input"
                        />
                        <div className="actions mt-8">
                            <button
                                type="submit"
                                className="button btn--rounded btn--md btn--bold"
                                disabled={submitting}
                            >
                                {submitting ? '등록 중…' : '등록하기'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}

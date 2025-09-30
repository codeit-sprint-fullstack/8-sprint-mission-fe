"use client";

export default function CommentForm({ value, onChange, onSubmit, disabled }) {
    return (
        <form onSubmit={onSubmit} className="mb-6">
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="댓글을 입력해주세요."
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <div className="flex justify-end mt-2">
                <button
                    type="submit"
                    disabled={disabled}
                    className="px-5 py-2 rounded-lg font-semibold text-white transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed bg-gray-700 hover:bg-gray-900"
                >
                    등록
                </button>
            </div>
        </form>
    );
}

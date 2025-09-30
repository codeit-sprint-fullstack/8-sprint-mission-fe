import CommentItem from "./CommentItem";

export default function CommentList({ comments, onUpdate, onDelete }) {
    return (
        <div className="space-y-4">
            {comments.map((comment) => (
                <CommentItem
                    key={comment.id}
                    comment={comment}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}

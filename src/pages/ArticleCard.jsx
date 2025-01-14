import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addComment } from '../store/articleSlice';
import { ToastContainer, toast } from 'react-toastify';


function ArticleCard() {
    const articles = useSelector((state) => state.article.articles);
    const dispatch = useDispatch();

    const [newComment, setNewComment] = useState({});
    const [showComments, setShowComments] = useState({});

    const handleCommentChange = (id, value) => {
        setNewComment((prev) => ({ ...prev, [id]: value }));
    };

    const handleAddComment = (id) => {
        if (newComment[id]?.trim()) {
            dispatch(addComment({ id, comment: newComment[id] }));
            setNewComment((prev) => ({ ...prev, [id]: '' }));
        }
        toast.success("Comment added!");
    };

    const toggleComments = (id) => {
        setShowComments((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="space-y-4 mt-8">
                  <ToastContainer />
            {articles.length > 0 &&
                articles.map((value) => (
                    <div
                        key={value.id}
                        className="bg-white p-4 border-4 rounded-md "
                    >
                        <h3 className="text-xl font-semibold text-gray-800">{value.title}</h3>
                        <p className="text-gray-600">{value.summary}</p>
                        <Link
                            to={`/details/${value.id}`}
                            className="mt-2 btn btn-error"
                        >
                            Details
                        </Link>

                        <div className="mt-4">
                            <input
                                type="text"
                                value={newComment[value.id] || ""}
                                onChange={(e) => handleCommentChange(value.id, e.target.value)}
                                placeholder="Enter comment..."
                                className="w-96 input input-accent"
                            />
                            <button
                                onClick={() => handleAddComment(value.id)}
                                className="ml-2 btn btn-accent "
                            >
                                Add comment
                            </button>
                            <button
                                onClick={() => toggleComments(value.id)}
                                className="ml-2 btn btn-info"
                            >
                                {showComments[value.id] ? 'Open comments' : 'Close comments'}
                            </button>
                        </div>

                        {showComments[value.id] && value.comments.length > 0 && (
                            <div className="mt-4 space-y-2">
                                <h4 className="text-lg font-semibold">You have a {value.comments.length} comments</h4>
                                {value.comments.map((comment, idx) => (
                                    <p key={idx} className="text-gray-700">
                                        {idx + 1}--{comment}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
        </div>
    );
}

export default ArticleCard;

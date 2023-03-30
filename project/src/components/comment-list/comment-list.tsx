import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCommentsAction } from '../../store/api-actions';
import { loadComments } from '../../store/comments/selectors';
import {Comment} from '../../types/comment';
import CommentItem from '../comment-item/comment-item';

export const MAX_COMMENTS_LENGTH = 10;

type CommentListProps = {
  offerId: number;
}

function CommentList({offerId}: CommentListProps): JSX.Element {
  const dispatch = useAppDispatch();

  const comments = useAppSelector(loadComments);

  useEffect(() => {
    dispatch(fetchCommentsAction(offerId));
  }, []);

  return (
    <ul className="reviews__list">
      {comments.slice(0, MAX_COMMENTS_LENGTH).reverse().map((commentItem: Comment) => (
        <CommentItem comment={commentItem} key={commentItem.id} />
      ))}
    </ul>
  );}


export default CommentList;

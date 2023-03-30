import { Fragment } from 'react';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { postCommentAction } from '../../store/api-actions';

const RATING_TITLES = ['perfect', 'good', 'not bad', 'badly', 'terribly'];

const MAX_STARS = 5;
const MIN_LETTERS = 50;
const MAX_LETTERS = 300;

type CommentFormProps = {
  offerId: number;
}

function CommentForm({offerId}: CommentFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  const ratingRef = useRef<HTMLInputElement | null>(null);

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [inProcess, setInProcess] = useState(false);

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.target.value));
  };

  const enableForm = () => setInProcess(false);

  const resetForm = () => {
    setComment('');
    setRating(0);
    enableForm();
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (commentRef.current !== null && ratingRef.current !== null) {
      setInProcess(true);
      dispatch(postCommentAction({
        id: offerId,
        comment: comment,
        rating: rating,
        onSuccess: resetForm,
        onFail: enableForm,
      }));
    }
  };


  const isDisabled = rating === 0 || comment.length > MAX_LETTERS ||  comment.length < MIN_LETTERS;

  return (
    <form
      className="reviews__form form"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <div className="reviews__rating-form form__rating">
        {RATING_TITLES.map((ratingValue, index) => {
          const starsCount = MAX_STARS - index;
          return (
            <Fragment key={starsCount}>
              <input className="form__rating-input visually-hidden"
                name="rating"
                value={starsCount}
                id={`${starsCount}-star${starsCount > 1 && 's'}`}
                type="radio"
                onChange={handleRatingChange}
                ref={ratingRef}
                disabled={inProcess}
                checked={starsCount === rating}
                key={starsCount}
              />
              <label htmlFor={`${starsCount}-star${starsCount > 1 ? 's' : ''}`}
                className="reviews__rating-label form__rating-label"
                title={ratingValue}
              >
                <svg className="form__star-image" width={37} height={33}>
                  <use xlinkHref="#icon-star" />
                </svg>
              </label>
            </Fragment>
          );})}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        disabled={inProcess}
        onChange={handleCommentChange}
        ref={commentRef}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span>{' '}
          and describe your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>

        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isDisabled || inProcess}
        >
          Submit
        </button>
      </div>
    </form>
  );}

export default CommentForm;


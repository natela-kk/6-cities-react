import { comments } from './comments';
import { loadCommentsAction, postCommentAction} from './comments';

describe('Reducer: comments', () => {
  it('Should load comments', () => {
    const state = {comments: []};
    expect(comments.reducer(state, loadCommentsAction(comments)))
      .toEqual({comments});
  });
  it('Should load updated comments', () => {
    const state = {comments: []};
    expect(comments.reducer(state, postCommentAction(comments)))
      .toEqual({comments});
  });
});

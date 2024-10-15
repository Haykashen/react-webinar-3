import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import axios from 'axios';

export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: id => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: 'comments/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        let tree = listToTree(res.data.result.items)
        console.log('tree= ',tree)
        let newList = treeToList(tree)
        console.log('newList= ',newList)
        res.data.result.items = newList;
        // Товар загружен успешно
        dispatch({ type: 'comments/load-success', payload: { data: {...res.data.result} } });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comments/load-error' });
      }
    };
  },

  addNewComment: (targetId, text, targetType, currentUser, id) => {
    const token = localStorage.getItem('token');
    return async dispatch => {
      dispatch({ type: 'comments/add-start' });

      try {
        const res = await axios.post(
          '/api/v1/comments',
          {
            text: text,
            parent: { _id: targetId, _type: targetType },
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-Token': token,
            },
          },
        );
        const newComment = res.data.result;
        if (currentUser) {
          newComment.author = {
            _id: id,
            profile: {
              name: currentUser,
            },
          };
        }

        if (!newComment.dateCreate) {
          newComment.dateCreate = new Date().toISOString();
        }
        dispatch({ type: 'comments/add-success', payload: newComment });
      } catch (error) {
        console.error('Ошибка при добавлении комментария:', error);
        dispatch({ type: 'comments/add-error' });
      }
    };
  },

  /**
   * Установка ID комментария, на который происходит ответ
   * @param commentId - ID комментария для ответа
   * @return {Function}
   */
  setReplyTo: commentId => {
    return dispatch => {
      dispatch({ type: 'comments/set-reply-to', payload: commentId });
    };
  },

  /**
   * Сброс состояния ответа на комментарий
   * @return {Function}
   */
  clearReplyTo: () => {
    return dispatch => {
      dispatch({ type: 'comments/clear-reply-to' });
    };
  },  
};

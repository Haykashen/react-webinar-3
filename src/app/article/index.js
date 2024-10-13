import { memo, useCallback, useMemo, useState } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import shallowequal from 'shallowequal';
import articleActions from '../../store-redux/article/actions';
import { useParams , useLocation, useNavigate } from 'react-router-dom';
import CommentHeader from '../../components/comment_header';
import CommentFooter from '../../components/comment_footer';
import CommentList from '../../components/comment_list';
import CommentForm from '../../components/comment_form';
import { commentsToTree } from '../../utils/comments-to-tree';
import commentsActions from '../../store-redux/comments/actions';

function Article() {
  const params = useParams();
  const dispatch = useDispatch();
  useInit(() => {
    //store.actions.article.load(params.id);
    dispatch(articleActions.load(params.id));
  }, [params.id]);

  useInit(() => {
    dispatch(commentsActions.load(params.id));
  }, [params.id]); 

  const store = useStore();

  const { t } = useTranslate();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Параметры из пути /articles/:id
  
  const [openCommentId, setOpenCommentId] = useState(null);
  const select = useSelectorRedux (
    state => ({
      article: state.article.data,
      waiting: state.article.waiting,
      comments: state.comments.items,
      commentsCount: state.comments.count,
      isAuth: state,
    }),
    shallowequal,
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект exists

   

  const commentsTree = useMemo(() => commentsToTree(select.comments?select.comments:[]), [select.comments]);


  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate('/login', { state: { back: location.pathname } });
    }, [location.pathname]),  
    onAddComment: useCallback((data, onSuccess) => dispatch(commentsActions.add(data, store.getState().session.user.profile, onSuccess)), [store.getState().session.user.profile]),//(text, onSuccess) => onAdd({parent: {_type: 'article', _id: select.article._id}, text}, onSuccess),
 
    onCancel: () => setOpenCommentId(null),
  };
console.log('select.comments,  select.commentsCount=', select.isAuth  )//.state.article.comments,select.comments
  return (
    <PageLayout>
      <TopHead />
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t} />
        <div className={'CommentsSection'}>
          <CommentHeader count={select.commentsCount}  t={t} />
          {!!commentsTree?.length &&<CommentList
            comments={select.comments}
            onAdd={callbacks.onAddComment}
            openCommentId={openCommentId}
            onCancel={callbacks.onCancel}
            onOpen={setOpenCommentId}           
            isAuth={store.getState().session.exists}
            t={t}
          />}
          {store.getState().session.exists && !openCommentId && (
            <CommentForm
              onAdd={callbacks.onAddComment}
              title={t('comments.new-comment')}
              parentId={select.article._id}
              onCancel={callbacks.onCancel}
              t={t}
            />)
          }
          {!store.getState().session.exists && <CommentFooter  t={t}/>}
        </div>
      </Spinner>

    </PageLayout>
  );
}

export default memo(Article);

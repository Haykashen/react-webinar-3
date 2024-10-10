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

function Article() {
  const store = useStore();
  const { t } = useTranslate();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  // Параметры из пути /articles/:id
  
  const [openCommentId, setOpenCommentId] = useState(null);
  const params = useParams();

  useInit(() => {
    //store.actions.article.load(params.id);
    dispatch(articleActions.load(params.id));
  }, [params.id]);

  const select = useSelectorRedux (
    state => ({
      article: state.article.data,
      waiting: state.article.waiting,
      comments: state.article.comments.result,
      commentsCount: state.article.comments.result,
      //isAuth: state,
    }),
    shallowequal,
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект exists

   console.log(' store.state.article.comments =', store.state.article.comments,select.comments)

  const commentsTree = useMemo(() => commentsToTree(select.comments?select.comments:[]), [select.comments]);


  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate('/login', { state: { back: location.pathname } });
    }, [location.pathname]),  
    onAddComment: (text, onSuccess) => onAdd({parent: {_type: 'article', _id: select.article._id}, text}, onSuccess),
    onCancel: () => setOpenCommentId(null),
  };

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
          <CommentHeader count={6}  t={t} />
          {!!commentsTree?.length &&<CommentList
            comments={select.comments}
            onAdd={callbacks.addComment}
            openCommentId={openCommentId}
            onCancel={callbacks.onCancel}
            onOpen={setOpenCommentId}           
            isAuth={store.state.session.isAuth}
            t={t}
          />}
          {store.state.session.isAuth && !openCommentId && (
            <CommentForm
              onAdd={callbacks.onAddComment}
              title={t('comments.new-comment')}
              parentId={articleId}
              onCancel={callbacks.onCancel}
              t={t}
            />)
          }
          {!store.state.session.isAuth && <CommentFooter  t={t}/>}
        </div>
      </Spinner>

    </PageLayout>
  );
}

export default memo(Article);

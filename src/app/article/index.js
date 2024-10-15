import { memo, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
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
import { useDispatch, useSelector } from 'react-redux';
import shallowequal from 'shallowequal';
import articleActions from '../../store-redux/article/actions';
import commentsActions from '../../store-redux/comments/actions';
import CommentContainer from '../../containers/comment';

function Article() {
  const store = useStore();

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();

  useInit(() => {
    //store.actions.article.load(params.id);
    dispatch(articleActions.load(params.id));
    dispatch(commentsActions.load(params.id));
  }, [params.id]);

  const select = useSelector(
    state => ({
      article: state.article.data,
      waiting: state.article.waiting,
      comments: state.comments.data,
      waitingComments: state.comments.waiting
    }),
    shallowequal,
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const { t } = useTranslate();
 
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  };

  const handleReply = commentId => {
    dispatch(commentsActions.setReplyTo(commentId));
  };
  //const tree = listToTree(select.comments.items)
 // const commentsArray = treeToList(listToTree(select.comments.items)) ;
  console.log('select.comments.items=',select.comments.items)
  //const commentsArray = select.comments.items.map(comment => (
  //  <CommentContainer key={comment._id} comment={comment} onReply={handleReply} level={0}/>
  //))
  return (
    <PageLayout>
      <TopHead />
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t} />
      </Spinner>
      <h3 style={{ margin: '30px 0 25px 30px'}}>Комментарии ({select.comments.count})</h3>
      <div>{select.comments.items && select.comments.items.map(comment => (<CommentContainer key={comment._id} comment={comment} onReply={handleReply} level={0}/>))} </div> 
      
    </PageLayout>
  );
}

export default memo(Article);

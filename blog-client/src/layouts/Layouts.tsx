import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Layouts.module.scss';
import history from '../history';
import routePath from '@constants/routePath';
// import Player from '@components/Widget/Player/Player'; // 播放器
import ScrollToTop from '@components/Widget/ScrollToTop/ScrollToTop';
import Header from '@components/Common/Header/Header';
import Footer from '@components/Common/Footer/Footer';
import Loading from '@components/Common/Loading/Loading';
import NotFound from '../containers/NotFound/NotFound';
import { ILayoutsProps } from '../types/layout';

const loading = props => {
  if (props.pastDelay) {
    return <Loading />;
  } else {
    return null;
  }
};

function componentsWrap(component) {
  return Loadable({
    loader: () => import(`../containers/${component}/${component}`),
    loading,
    delay: 50
  })
}

const Blog = componentsWrap('Blog')
const BlogDetail = componentsWrap('BlogDetail')

// 后期跳转监听
history.listen((location, action) => {
  window.localStorage.curPath = location.pathname;
});

@inject('layoutsStore')
@observer
class Layouts extends React.Component<ILayoutsProps, {}> {
  constructor(props: ILayoutsProps) {
    super(props);
    this.state = {};
  }

  // 页面初始化监听
  public componentWillMount() {
    window.localStorage.curPath = history.location.pathname;
  }

  public componentDidMount() {
    const { layoutsStore } = this.props;
    // layoutsStore!.getPlayers();
    layoutsStore!.getGlobalStatus();
  }

  public componentWillUpdate() {
    const { layoutsStore } = this.props;
    layoutsStore!.getLocalPath();
  }

  public render() {
    const { layoutsStore } = this.props;

    const grayStyle = {
      filter: 'grayscale(50%)',
    };
    return (
      <div
        className={layoutsStore!.isHomePage ? styles.layout : ''}
        style={layoutsStore!.globalStatus.full_site_gray ? grayStyle : {}}
      >
        <Header />
        <div className={styles.main_contents}>
          <Switch>
            <Route path={routePath.home} exact component={componentsWrap('Home')} />
            <Route path={routePath.legal} component={componentsWrap('Legal')} />
            <Route
              path={routePath.blog}
              render={props => <Blog {...props} key={location.pathname} />}
            />
            <Route
              path={`${routePath.tag}:id`}
              render={props => <Blog {...props} key={location.pathname} />}
            />
            <Route path={routePath.search} component={componentsWrap('Blog')} />
            <Route
              path={`${routePath.blogDetail}:id`}
              render={props => (
                <BlogDetail {...props} key={location.pathname} />
              )}
            />
            <Route path={routePath.archive} component={componentsWrap('Archive')} />
            <Route path={routePath.apps} component={componentsWrap('Apps')} />
            <Route path={routePath.cv} component={componentsWrap('CV')} />
            <Route path={routePath.music} component={componentsWrap('Music')} />
            <Route path={routePath.about} component={componentsWrap('About')} />
            <Route path={routePath.notFound} component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <ScrollToTop />
        {/* <Player /> */}
        <Footer />
        <ToastContainer />
      </div>
    );
  }
}

export default Layouts;

import s from './SkeletonSearch.module.css';

const SkeletonSearch = ({ width, height, borderRadius }) => {
    return <div className={s.skeleton} style={{ width, height, borderRadius }} />;
};

export default SkeletonSearch;
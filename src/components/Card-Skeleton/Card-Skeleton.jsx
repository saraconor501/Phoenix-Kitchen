import { Skeleton } from 'antd';
import s from './Card-Skeleton.module.css';

const CardSkeleton = () => {
    return (
        <div className={s.productCard}>
            <div className={s.imageContainer}>
                <Skeleton.Image active style={{ width: '370px', height: '240px' }} />
            </div>
            <div className={s.productInfo}>
                <Skeleton active title={{ width: '80%' }} paragraph={{ rows: 2, width: ['100%', '60%'] }} />
                <div className={s.buttons}>
                    <Skeleton.Button active className={s.skeletonButton} />
                    <Skeleton.Button active className={s.skeletonButton} />
                </div>
            </div>
        </div>
    );
};

export default CardSkeleton;
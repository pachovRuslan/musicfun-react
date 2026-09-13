import type { RefObject } from "react";
import s from './LoadingTrigger.module.css'
import { Skeleton } from '@/common/components'

type Props = {
    observerRef: RefObject<HTMLDivElement | null>
    isFetchingNextPage: boolean
}
export const LoadingTrigger = ({ observerRef, isFetchingNextPage }: Props) => {
    return (
        <div ref={observerRef} className={s.root}>
            {isFetchingNextPage ? (
                <div className={s.skeletonRow}>
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div className={s.row} key={i}>
                            <Skeleton width={20} height={20} radius={4} />
                            <Skeleton width={40} height={40} radius={4} />
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                                <Skeleton width="40%" height={14} />
                                <Skeleton width="20%" height={10} />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={s.spacer} />
            )}
        </div>
    );
};
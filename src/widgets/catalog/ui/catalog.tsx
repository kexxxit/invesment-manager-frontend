import React, { FC, useEffect } from 'react'
import './catalog.scss'
import { useTypedSelector } from '../../../shared/lib/store/useTypesSelector'
import { useAppDispatch } from '../../../shared/lib/store/useAppDispatch'
import { BondItem } from '../../../shared/ui/bondItem'
import { fetchBonds, setCurrentPageAction } from '../../../entites/bonds'
import ReactPaginate from 'react-paginate'

export const Catalog: FC = () => {
    const { currentPageBonds, isLoading, pagination, error } = useTypedSelector(
        (state) => state.bonds
    )
    const dispatch = useAppDispatch()

    const bondsItems = currentPageBonds.map((bond) => (
        <BondItem key={bond.uid} bond={bond} />
    ))

    useEffect(() => {
        dispatch(fetchBonds())
    }, [])

    const handlePageChange = (data: { selected: number }) => {
        dispatch(setCurrentPageAction(data.selected + 1))
    }

    return (
        <section className='catalog'>
            <div className='catalog__filters'></div>
            <div className='catalog__items'>{bondsItems}</div>
            <div className='catalog__pagination'>
                <ReactPaginate
                    forcePage={pagination.currentPage - 1}
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    pageCount={pagination.totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    containerClassName='pagination'
                    activeClassName='pagination__item__active'
                    pageClassName='pagination__item'
                    pageLinkClassName='pagination__item-link'
                    previousClassName='pagination__item pagination__item-prev'
                    previousLinkClassName='pagination__item-link'
                    nextClassName='pagination__item pagination__item-next'
                    nextLinkClassName='pagination__item-link'
                    breakClassName='pagination__ellipsis'
                    disabledClassName='pagination__item__disabled'
                />
            </div>
        </section>
    )
}

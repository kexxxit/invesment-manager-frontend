import React, { FC, useEffect, useState } from 'react'
import './catalog.scss'
import { useTypedSelector } from '../../../shared/lib/store/useTypesSelector'
import { useAppDispatch } from '../../../shared/lib/store/useAppDispatch'
import { BondItem } from '../../../shared/ui/bondItem'
import { fetchBonds, setCurrentPageAction } from '../../../entites/bonds'
import ReactPaginate from 'react-paginate'
import { TextField } from '../../../shared/ui/textField'
import { Dropdown } from '../../../shared/ui/dropdown'
import { IBondsQueryParams, IOption } from '../../../shared/types'
import { DEFAULT_DROPDOWN_VALUE } from '../../../shared/consts'

export const Catalog: FC = () => {
    const { currentPageBonds, isLoading, pagination, error } = useTypedSelector(
        (state) => state.bonds
    )
    const dispatch = useAppDispatch()
    const [searchValue, setSearchValue] = useState<string>('')
    const [queryParams, setQueryParams] = useState<IBondsQueryParams>({
        search: undefined,
        riskLevel: undefined,
        sector: undefined,
    })

    const bondsItems = currentPageBonds.map((bond) => (
        <BondItem key={bond.uid} bond={bond} />
    ))

    useEffect(() => {
        dispatch(fetchBonds(queryParams))
    }, [queryParams])

    useEffect(() => {
        console.log(currentPageBonds)
    }, [currentPageBonds])

    const handlePageChange = (data: { selected: number }) => {
        dispatch(setCurrentPageAction(data.selected + 1))
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
        setQueryParams((prev) => ({
            ...prev,
            search: event.target.value === '' ? undefined : event.target.value,
        }))
    }

    const handleOnSelectSector = (sector: IOption) => {
        setQueryParams((prev) => ({
            ...prev,
            sector:
                sector.value === DEFAULT_DROPDOWN_VALUE
                    ? undefined
                    : sector.value,
        }))
    }

    const sectorOptions: IOption[] = [
        { value: DEFAULT_DROPDOWN_VALUE, label: 'Сектор' },
        { value: 'goverment', label: 'goverment' },
        { value: 'financial', label: 'financial' },
        { value: 'other', label: 'other' },
    ]

    const handleOnSelectRating = (riskLevel: IOption) => {
        setQueryParams((prev) => ({
            ...prev,
            riskLevel:
                riskLevel.value === DEFAULT_DROPDOWN_VALUE
                    ? undefined
                    : Number(riskLevel.value),
        }))
        console.log(riskLevel)
    }

    const ratingOptions: IOption[] = [
        { value: DEFAULT_DROPDOWN_VALUE, label: 'Рейтинг' },
        { value: '1', label: 'Высокий' },
        { value: '2', label: 'Средний' },
        { value: '3', label: 'Низкий' },
    ]

    return (
        <section className='catalog'>
            <div className='catalog__filters'>
                <TextField
                    label='Поиск'
                    onChange={handleChange}
                    value={searchValue}
                />
                <Dropdown
                    options={sectorOptions}
                    onSelect={handleOnSelectSector}
                    style='gray'
                />
                <Dropdown
                    options={ratingOptions}
                    onSelect={handleOnSelectRating}
                    style='gray'
                />
            </div>
            <div className='catalog__header'>
                <div></div>
                <h3>Облигация</h3>
                <h3>Отрасль</h3>
                <h3>Дата погащения</h3>
                <h3>Доходнсть</h3>
                <h3>Цена</h3>
            </div>
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
                    renderOnZeroPageCount={null}
                />
            </div>
        </section>
    )
}

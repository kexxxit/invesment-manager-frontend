import React, { FC, useEffect, useState } from 'react'
import './catalog.scss'
import { useTypedSelector } from '../../../shared/lib/store/useTypesSelector'
import { useAppDispatch } from '../../../shared/lib/store/useAppDispatch'
import { BondItem } from '../../../shared/ui/bondItem'
import {
    fetchBonds,
    setCurrentPageAction,
    setRiskLevelAction,
    setSearchAction,
    setSectorAction,
    setSortByAction,
} from '../../../entites/bonds'
import ReactPaginate from 'react-paginate'
import { TextField } from '../../../shared/ui/textField'
import { Dropdown } from '../../../shared/ui/dropdown'
import { IBondsQueryParams, IOption } from '../../../shared/types'
import {
    DEFAULT_DROPDOWN_VALUE,
    RATING_OPTIONS,
    SECTOR_OPTIONS,
} from '../../../shared/consts'
import { ColumnHeader } from '../../../shared/ui/columnHeader/columnHeader'
import { useNavigate } from 'react-router-dom'

export const Catalog: FC = () => {
    const { currentPageBonds, isLoading, pagination, error, queryParams } =
        useTypedSelector((state) => state.bonds)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    // const [searchValue, setSearchValue] = useState<string>('')
    // const [queryParams, setQueryParams] = useState<IBondsQueryParams>({
    //     search: undefined,
    //     riskLevel: undefined,
    //     sector: undefined,
    //     sortBy: undefined,
    // })

    useEffect(() => {
        dispatch(fetchBonds(queryParams))
    }, [queryParams])

    useEffect(() => {
        console.log(currentPageBonds)
    }, [currentPageBonds])

    const handleBondItemClick = (bondId: string) => {
        navigate(`/${bondId}`)
    }

    const sector = SECTOR_OPTIONS.find(
        (opt) => opt.value === queryParams.sector
    )

    const rating = RATING_OPTIONS.find(
        (opt) => opt.value === String(queryParams.riskLevel)
    )

    const handlePageChange = (data: { selected: number }) => {
        dispatch(setCurrentPageAction(data.selected + 1))
    }

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setSearchValue(event.target.value)
    //     setQueryParams((prev) => ({
    //         ...prev,
    //         search: event.target.value === '' ? undefined : event.target.value,
    //     }))
    // }

    const handleChange = (query: string) => {
        // setSearchValue(query)
        // setQueryParams((prev) => ({
        //     ...prev,
        //     search: query === '' ? undefined : query,
        // }))
        dispatch(setSearchAction(query === '' ? undefined : query))
    }

    const handleOnSelectSector = (sector: IOption) => {
        // setQueryParams((prev) => ({
        //     ...prev,
        //     sector:
        //         sector.value === DEFAULT_DROPDOWN_VALUE
        //             ? undefined
        //             : sector.value,
        // }))
        dispatch(
            setSectorAction(
                sector.value === DEFAULT_DROPDOWN_VALUE
                    ? undefined
                    : sector.value
            )
        )
    }

    const handleOnSelectRating = (riskLevel: IOption) => {
        // setQueryParams((prev) => ({
        //     ...prev,
        //     riskLevel:
        //         riskLevel.value === DEFAULT_DROPDOWN_VALUE
        //             ? undefined
        //             : Number(riskLevel.value),
        // }))
        dispatch(
            setRiskLevelAction(
                riskLevel.value === DEFAULT_DROPDOWN_VALUE
                    ? undefined
                    : Number(riskLevel.value)
            )
        )
    }

    const handleColumnHeaderClick = (sortBy: string) => {
        // setQueryParams((prev) => ({
        //     ...prev,
        //     sortBy: sortBy,
        // }))
        dispatch(setSortByAction(sortBy))
    }

    const bondsItems = currentPageBonds.map((bond) => (
        <BondItem onClick={handleBondItemClick} key={bond.uid} bond={bond} />
    ))

    return (
        <section className='catalog'>
            <div className='catalog__filters'>
                <TextField
                    defaultValue={queryParams.search ? queryParams.search : ''}
                    label='Поиск'
                    onChange={handleChange}
                />
                <Dropdown
                    currentValue={sector ? sector : SECTOR_OPTIONS[0]}
                    options={SECTOR_OPTIONS}
                    onSelect={handleOnSelectSector}
                    style='gray'
                />
                <Dropdown
                    currentValue={rating ? rating : RATING_OPTIONS[0]}
                    options={RATING_OPTIONS}
                    onSelect={handleOnSelectRating}
                    style='gray'
                />
            </div>
            <div className='catalog__header'>
                <div className='catalog__header--margin'></div>
                <h3>Облигация</h3>
                <h3>Отрасль</h3>
                <ColumnHeader
                    label='Дата погащения'
                    sortedFieldName='MaturityDate'
                    onClick={handleColumnHeaderClick}
                    sortBy={queryParams.sortBy}
                />
                <ColumnHeader
                    label='Доходнсть'
                    sortedFieldName='YieldToMaturity'
                    onClick={handleColumnHeaderClick}
                    sortBy={queryParams.sortBy}
                />
                <ColumnHeader
                    label='Цена'
                    sortedFieldName='Price'
                    onClick={handleColumnHeaderClick}
                    sortBy={queryParams.sortBy}
                />
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

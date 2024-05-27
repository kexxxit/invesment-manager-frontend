import React, { FC, useEffect, useState } from 'react'
import sortTop from '../../assets/icons/sortTop.svg'
import sortBottom from '../../assets/icons/sortBottom.svg'
import './columnHeader.scss'

interface IColumnHeaderProps {
    /** Column header label */
    readonly label: string
    /** Name of the column to be sorted */
    readonly sortedFieldName: string
    /** Сlick handler */
    readonly onClick: (sortingState: string) => void
    /** current sorting state (to check the sorting activity) */
    readonly sortBy?: string
}

enum SortType {
    Asc = 'Asc',
    Desc = 'Desc',
    None = 'None',
}

export const ColumnHeader: FC<IColumnHeaderProps> = ({
    label,
    sortedFieldName,
    onClick,
    sortBy,
}) => {
    const [sortType, setSortType] = useState<SortType>(SortType.None)

    useEffect(() => {
        if (sortBy && sortBy.includes(sortedFieldName)) {
            sortBy.includes(SortType.Asc)
                ? setSortType(SortType.Asc)
                : setSortType(SortType.Desc)
        }
        if (!sortBy || !sortBy.includes(sortedFieldName))
            setSortType(SortType.None)
    }, [sortBy])

    return (
        <div
            onClick={() => {
                const newSortType =
                    sortType === SortType.None || sortType === SortType.Asc
                        ? SortType.Desc
                        : SortType.Asc
                setSortType(newSortType)
                onClick(sortedFieldName + newSortType)
            }}
            className='column-header'>
            <h3>{label}</h3>
            {sortType === SortType.None ? (
                <></>
            ) : (
                <img
                    src={sortType === SortType.Asc ? sortBottom : sortTop}
                    alt=''
                />
            )}
        </div>
    )
}

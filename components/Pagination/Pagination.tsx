import css from './Pagination.module.css'
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import type { ComponentType } from "react";

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<ComponentType<ReactPaginateProps>>
).default ?? (ReactPaginateModule as unknown as ComponentType<ReactPaginateProps>);;

export interface PaginationProps {
    page: number;
    pageCount: number;
    onChange: (page: number) => void
}

export default function Pagination ({page, pageCount, onChange}: PaginationProps) {
    return(
        <ReactPaginate
        forcePage={page -1}
        pageCount={pageCount}
        onPageChange={(e) => onChange(e.selected +1)}
        containerClassName={css.pagination}
        activeClassName={css.active}
        />
)}
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination.tsx';
import React from "react";

const PaginationHelper = ({totalPages, currentPage, setCurrentPage}: {
    totalPages: number,
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}) => {
    const pageNumbers = Array.from({length: totalPages}, (_, i) => i + 1);

    const handlePreviousClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious className="cursor-pointer" onClick={handlePreviousClick}/>
                </PaginationItem>

                {(currentPage > 2) && <PaginationItem>
                    <PaginationEllipsis/>
                </PaginationItem>}

                {pageNumbers.map((pageNumber) => {
                    if (pageNumber > currentPage - 2 && pageNumber < currentPage + 2)
                        return (
                            <PaginationItem key={pageNumber}>
                                <PaginationLink className="cursor-pointer" onClick={() => setCurrentPage(pageNumber)}
                                                isActive={currentPage === pageNumber}>
                                    {pageNumber}
                                </PaginationLink>
                            </PaginationItem>
                        )
                })}

                {(currentPage + 2 < totalPages) && <PaginationItem>
                    <PaginationEllipsis/>
                </PaginationItem>}

                <PaginationItem>
                    <PaginationNext className="cursor-pointer" onClick={handleNextClick}/>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationHelper;

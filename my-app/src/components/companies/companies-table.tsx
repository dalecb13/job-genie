import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getCompaniesPage } from "../../apis/companies.api";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Link } from "react-router";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { queryClient } from "@/apis/query-client";

const CompaniesTable = () => {
  const [ currentPage, setCurrentPage ] = useState(1);
  const {
      data: companiesRespones,
      isLoading,
      isError,
      error,
      isFetching,
    } = useQuery({
      queryKey: ['companiesPage', currentPage],
      queryFn: () => getCompaniesPage(currentPage, 10),
      placeholderData: keepPreviousData
    });

  if (isError) return <p>Error: {error.message}</p>;

  if (!companiesRespones || !companiesRespones.companies || companiesRespones.companies.length === 0) {
    toast.error('Could not find companies')
    return <p>
      Could not find companies
    </p>
  }

  const pageNumbers = Array.from({ length: Math.ceil(companiesRespones.total / 10) }, (_, index) => index + 1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    queryClient.invalidateQueries({ queryKey: ['companiesPage'] })
  }

  const handleNextPage = () => {
    if (currentPage === Math.ceil(companiesRespones.total / 10)) return
    setCurrentPage(currentPage + 1);
    queryClient.invalidateQueries({ queryKey: ['companiesPage'] })
  }

  return (
    <>
      {
        !companiesRespones.companies || companiesRespones.companies.length === 0
        ? <>
            <p>No companies found</p>
            <Link to="/companies/create">Add one?</Link>
          </>
        : <>
            <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Website</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    companiesRespones.companies.map((company) => (
                      <TableRow
                        key={company.id}
                      >
                        <TableCell>{company.companyName}</TableCell>
                        <TableCell>{company.website}</TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
              <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    aria-disabled={currentPage === 1}
                  />
                </PaginationItem>
                {
                  pageNumbers.map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        onClick={() => handlePageChange(page)}
                        isActive={page === currentPage}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))
                }
                {/* <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem> */}
                <PaginationItem>
                  <PaginationNext
                    aria-disabled={currentPage === Math.ceil(companiesRespones.total / 10)}
                    onClick={handleNextPage}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </>
      }
    </>
  )
}

export default CompaniesTable;

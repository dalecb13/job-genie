import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getAllCompanies, getCompaniesPage } from "../../apis/companies.api";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

const CompaniesTable = () => {
  const [ pageNumbers, setPageNumbers ] = useState<number[]>([1]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const { data: companies, isLoading, isError, error } = useQuery({ queryKey: ['companiesPage'], queryFn: () => getCompaniesPage(currentPage, 10) });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  if (!companies) {
    toast.error('Could not find companies')
    return <p>
      Could not find companies
    </p>
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }

  return (
    <>
      {
        !companies || companies.length === 0
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
                    companies.map((company) => (
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
                  <PaginationPrevious href="#" />
                </PaginationItem>
                {/* {
                  pageNumbers.map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink href="#" onClick={() => handlePageChange(page)}>
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))
                } */}
                {/* <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem> */}
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </>
      }
    </>
  )
}

export default CompaniesTable;

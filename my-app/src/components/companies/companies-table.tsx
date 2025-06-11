import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getAllCompanies } from "../../apis/companies.api";
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

const CompaniesTable = () => {
  const { data: companies, isLoading, isError, error } = useQuery({ queryKey: ['companies'], queryFn: getAllCompanies });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

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
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
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

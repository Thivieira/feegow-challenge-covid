import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { LoadingRow } from '@/components/common/loading-row';
import { Actions } from '@/components/employee/actions';
import { useVaccineOptions } from '@/components/employee/hooks/useVaccineOptions';
import { RowItem } from '@/components/employee/row-item';
import { List } from '@/components/list';
import { Pagination } from '@/components/list/pagination';
import { ListTable, TableBody, TableHeader } from '@/components/table';
import { usePagination } from '@/hooks/usePagination';
import { api } from '@/services/api';
import { Employee, PaginatedResponse } from '@/types';

const columns = [
  { name: 'Nome', colspan: 2 },
  { name: 'CPF', colspan: 2 },
  { name: 'Data de Nascimento' },
  { name: '1ª Dose' },
  { name: '2ª Dose' },
  { name: '3ª Dose' },
  { name: 'Vacina' },
  { name: 'Comorbidade' },
  { name: 'Ações', colspan: 2 },
];

const fetchEmployees = async (
  page: number,
  itemsPerPage: number,
  search: string | null,
): Promise<PaginatedResponse<Employee>> => {
  const response = await api.get<PaginatedResponse<Employee>>('/employees', {
    params: {
      page: page,
      per_page: itemsPerPage,
      search,
    },
  });
  return response.data;
};

export function EmployeeList() {
  const [employeesData, setEmployeesData] = useState<PaginatedResponse<Employee> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 15;
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');

  const { currentPage, setTotalPages, totalPages, goToPage } = usePagination({
    initialPage: 1,
    itemsPerPage,
  });

  const { vaccineOptions } = useVaccineOptions();

  const fetchEmployeesCallback = useCallback(
    async (page: number) => {
      setIsLoading(true);
      setError(null);
      try {
        const responseData = await fetchEmployees(page, itemsPerPage, search);
        setEmployeesData(responseData);
        setTotalPages(responseData.meta.last_page);
      } catch (err) {
        setError('Erro ao carregar colaboradores. Por favor, tente novamente.');
      } finally {
        setIsLoading(false);
      }
    },
    [itemsPerPage, search, setTotalPages],
  );

  useEffect(() => {
    fetchEmployeesCallback(currentPage);
  }, [currentPage, fetchEmployeesCallback]);

  const handlePageChange = useCallback(
    (page: number) => {
      goToPage(page);
    },
    [goToPage],
  );

  const refreshEmployees = useCallback(() => {
    fetchEmployeesCallback(currentPage);
  }, [fetchEmployeesCallback, currentPage]);

  const deleteEmployee = useCallback(
    async (id: number) => {
      try {
        await api.delete(`/employees/${id}`);
        refreshEmployees();
        toast.success('Colaborador excluído com sucesso.');
      } catch (error) {
        toast.error('Erro ao excluir colaborador.');
      }
    },
    [refreshEmployees],
  );

  const employeeRows = useMemo(() => {
    return employeesData?.data.map((item) => (
      <RowItem
        key={item.id}
        item={item}
        deleteEmployee={deleteEmployee}
        refreshEmployees={refreshEmployees}
        vaccineOptions={vaccineOptions}
      />
    ));
  }, [employeesData?.data, deleteEmployee, refreshEmployees, vaccineOptions]);

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <List>
                <List.Header
                  title="Colaboradores"
                  description="Lista de colaboradores."
                  actions={<Actions refreshEmployees={refreshEmployees} vaccineOptions={vaccineOptions} />}
                />
                <ListTable>
                  <TableHeader columns={columns} />
                  <TableBody>
                    {isLoading ? <LoadingRow columns={columns} /> : employeeRows}
                  </TableBody>
                </ListTable>
                <List.Footer>
                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </List.Footer>
              </List>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

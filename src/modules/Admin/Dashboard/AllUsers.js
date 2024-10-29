import React, { useContext, Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../Layouts/Admin/DashboardLayout';
import { Stack, Button, Container, Typography, Grid, Box, LinearProgress } from '@mui/material';
import Iconify from '../../../components/iconify';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Scrollbar from 'src/components/scrollbar';

import UserTableToolbar from './components/user-table-toolbar';
import UserTableHead from './components/user-table-head';
import UserTableRow from './components/user-table-row';
import TableEmptyRows from './components/table-empty-rows';
import TableNoData from './components/table-no-data';
import { useFetchUsers } from 'src/context/hooks';
import { applyFilter, emptyRows, getComparator } from './components/utils';

// ----------------------------------------------------------------------

const UserList = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  const users = useFetchUsers();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <>
      <Layout name="All Candidates" title="Candidates">
        <Container maxWidth="xl">
          <Button
            variant="text"
            onClick={handleGoBack}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            sx={{ mb: 2 }}
          >
            Go Back{' '}
          </Button>

          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
            <Typography variant="h7" gutterBottom>
              All Users{' '}
            </Typography>
          </Stack>

          {/* <Grid container spacing={2}> */}
          <Card>
            <UserTableToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />

            {/* <Scrollbar> */}
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <UserTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={users.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'sn', label: 'S/N' },
                    { id: 'name', label: 'Name' },
                    { id: 'role', label: 'Role' },
                    { id: 'phone', label: 'Phone' },
                    { id: 'isVerified', label: 'Verified', align: 'center' },
                    { id: 'status', label: 'Status' },
                    { id: '' },
                  ]}
                />
                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <UserTableRow
                        key={row.id}
                        sn={index + 1 + page * rowsPerPage}
                        name={row.fullname}
                        role={row.role}
                        status={row.status}
                        phone={row.phone_number}
                        avatarUrl={row.avatarUrl}
                        isVerified={row.isVerified}
                        selected={selected.indexOf(row.name) !== -1}
                        handleClick={(event) => handleClick(event, row.name)}
                      />
                    ))}

                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, users.length)}
                  />

                  {notFound && <TableNoData query={filterName} />}
                </TableBody>
              </Table>
            </TableContainer>
            {/* </Scrollbar> */}

            <TablePagination
              page={page}
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
          {/* </Grid> */}
        </Container>
      </Layout>
    </>
  );
};

export default UserList;

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import { Close, Search } from '@material-ui/icons';
import { TextField, Grid } from '@material-ui/core';

function createData(name, calories, fat) {
	return { name, calories, fat };
}

const rows = [
	createData('Cupcake', 305, 3.7),
	createData('Donut', 452, 25.0),
	createData('Eclair', 262, 16.0),
	createData('Frozen yoghurt', 159, 6.0),
	createData('Gingerbread', 356, 16.0),
	createData('Honeycomb', 408, 3.2),
	createData('Ice cream sandwich', 237, 9.0),
	createData('Jelly Bean', 375, 0.0),
	createData('KitKat', 518, 26.0),
	createData('Lollipop', 392, 0.2),
	createData('Marshmallow', 318, 0),
	createData('Nougat', 360, 19.0),
	createData('Oreo', 437, 18.0),
];

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

const headCells = [
	{
		id: 'name',
		align: 'left',
		label: 'Dessert (100g serving)',
	},
	{
		id: 'calories',
		align: 'center',
		label: 'Calories',
	},
	{
		id: 'fat',
		align: 'right',
		label: 'Fat (g)',
	},
];

function EnhancedTableHead(props) {
	const {
		classes,
		order,
		orderBy,
		rowCount,
		onRequestSort,
	} = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.align}
						padding={'default'}
						sortDirection={
							orderBy === 'name' ? order : false
						}
					>
						<TableSortLabel
							className={classes.headers}
							active={
								headCell.id === 'name' ? true : false
							}
							disabled={
								headCell.id === 'name' ? false : true
							}
							hideSortIcon={true}
							direction={
								orderBy === headCell.id
									? order
									: 'asc'
							}
							onClick={
								headCell.id === 'name'
									? createSortHandler(headCell.id)
									: null
							}
						>
							{headCell.label}
							{headCell.id === 'name' ? (
								<span
									className={classes.visuallyHidden}
								>
									{order === 'desc'
										? 'sorted descending'
										: 'sorted ascending'}
								</span>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	classes: PropTypes.object.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	paper: {
		width: '100%',
		marginBottom: theme.spacing(2),
	},
	table: {
		minWidth: 750,
	},
	visuallyHidden: {
		textTransform: 'initial',
		fontWeight: 'bold',
		border: 0,
		clip: 'rect(0 0 0 0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		top: 20,
		width: 1,
	},
	headers: {
		textTransform: 'initial',
		fontWeight: 'bold',
	},
}));

const useStyles1 = makeStyles((theme) => ({
	root: {
		flexShrink: 0,
		marginLeft: theme.spacing(2.5),
	},
}));

function TablePaginationActions(props) {
	const classes = useStyles1();
	const theme = useTheme();
	const { count, page, rowsPerPage, onChangePage } = props;
	let offset = page * rowsPerPage + 1;
	let limit = offset + rowsPerPage - 1;

	const handleFirstPageButtonClick = (event) => {
		onChangePage(event, 0);
	};

	const handleBackButtonClick = (event) => {
		onChangePage(event, page - 1);
	};

	const handleNextButtonClick = (event) => {
		onChangePage(event, page + 1);
	};

	const handleLastPageButtonClick = (event) => {
		onChangePage(
			event,
			Math.max(0, Math.ceil(count / rowsPerPage) - 1)
		);
	};

	return (
		<div className={classes.root}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="first page"
			>
				{theme.direction === 'rtl' ? (
					<LastPageIcon />
				) : (
					<FirstPageIcon />
				)}
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label="previous page"
			>
				{theme.direction === 'rtl' ? (
					<KeyboardArrowRight />
				) : (
					<KeyboardArrowLeft />
				)}
			</IconButton>
			{offset}-{limit > count ? count : limit} de {count}
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				{theme.direction === 'rtl' ? (
					<KeyboardArrowLeft />
				) : (
					<KeyboardArrowRight />
				)}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
			>
				{theme.direction === 'rtl' ? (
					<FirstPageIcon />
				) : (
					<LastPageIcon />
				)}
			</IconButton>
		</div>
	);
}

TablePaginationActions.propTypes = {
	count: PropTypes.number.isRequired,
	onChangePage: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
	const classes = useStyles();
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('name');
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [filtroBuscaShow, setFiltroBuscaShow] = React.useState(
		false
	);

	function buscaFiltroHandler() {
		setFiltroBuscaShow(!filtroBuscaShow);
	}

	function buscaHandler(data) {
		console.log(data);
	}

	const handleRequestSort = (event) => {
		const isAsc = orderBy === 'name' && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy('name');
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	/* 	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	}; */

	const emptyRows =
		rowsPerPage -
		Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<Grid container spacing={0} style={{ padding: 5 }}>
					<Grid item xs>
						{filtroBuscaShow === true ? (
							<div style={{ display: 'flex' }}>
								<Search
									fontSize="large"
									style={{ marginRight: 10 }}
								/>
								<TextField
									size="small"
									onBlur={buscaHandler}
								/>
								<IconButton
									onClick={buscaFiltroHandler}
								>
									<Close fontSize="small" />
								</IconButton>
							</div>
						) : null}
					</Grid>

					<Grid item>
						<IconButton
							color={
								filtroBuscaShow === true
									? 'primary'
									: 'default'
							}
							onClick={buscaFiltroHandler}
						>
							<Search />
						</IconButton>
					</Grid>
				</Grid>
				<TableContainer>
					<Table
						className={classes.table}
						aria-labelledby="tableTitle"
						size={'medium'}
						aria-label="enhanced table"
					>
						<EnhancedTableHead
							classes={classes}
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>
						<TableBody>
							{stableSort(
								rows,
								getComparator(order, orderBy)
							)
								.slice(
									page * rowsPerPage,
									page * rowsPerPage + rowsPerPage
								)
								.map((row, index) => {
									const labelId = `enhanced-table-checkbox-${index}`;

									return (
										<TableRow
											hover
											tabIndex={-1}
											key={row.name}
										>
											<TableCell
												component="th"
												id={labelId}
												scope="row"
												padding="default"
												align={'left'}
											>
												{row.name}
											</TableCell>
											<TableCell align="center">
												{row.calories}
											</TableCell>
											<TableCell align="right">
												{row.fat}
											</TableCell>
										</TableRow>
									);
								})}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: 53 * emptyRows,
									}}
								>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TablePagination
									rowsPerPageOptions={[]}
									labelRowsPerPage=""
									labelDisplayedRows={() => {}}
									colSpan={3}
									count={rows.length}
									rowsPerPage={5}
									page={page}
									onChangePage={handleChangePage}
									ActionsComponent={
										TablePaginationActions
									}
								/>
							</TableRow>
						</TableFooter>
					</Table>
				</TableContainer>
				{/* <TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/> */}
			</Paper>
		</div>
	);
}

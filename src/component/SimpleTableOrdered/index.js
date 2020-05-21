import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';

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
	const { classes, order, orderBy, onRequestSort } = props;
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

export default function EnhancedTable() {
	const classes = useStyles();
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('name');

	const handleRequestSort = (event) => {
		const isAsc = orderBy === 'name' && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy('name');
	};

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
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
							).map((row, index) => {
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
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</div>
	);
}

import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as Coffe } from '../icons/coffee.svg';
import { Container, Navbar, Overlay, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setAll, setList } from '../app/actions/filesActions';

const HomePage = () => {
	const first = useRef(0);
	const overlay = useRef(null);
	const dispatch = useDispatch();
	const [filter, setFilter] = useState('');
	const [showFilter, setShowFilter] = useState(false);
	const files = useSelector((state) => state.files);

	useEffect(() => {
		if (first.current === 0) {
			fetch('http://localhost:5050/files/data')
				.then((res) => res.json())
				.then((dat) => {
					// const sorted = dat.sort((a, b) => (a.file === b.file ? 0 : a.file > b.file ? 1 : -1));
					dispatch(setAll(dat));
				})
				.catch((err) => console.log('Error:', err));

			fetch('http://localhost:5050/files/list')
				.then((res) => res.json())
				.then((dat) => dispatch(setList(dat.files)))
				.catch((err) => console.log('Error:', err));
		}

		first.current += 1;
		// eslint-disable-next-line
	}, []);

	const onFilter = () => {
		const url = new URL('http://localhost:5050/files/data');
		const params = { fileName: filter };
		url.search = new URLSearchParams(params).toString();

		fetch(url)
			.then((res) => res.json())
			.then((dat) => {
				// const sorted = dat.sort((a, b) => (a.file === b.file ? 0 : a.file > b.file ? 1 : -1));
				setShowFilter(false);
				dispatch(setAll(dat.length > 0 ? dat : [dat]));
			})
			.catch((err) => console.log('Error:', err));
	};

	return (
		<>
			<Navbar className="bg-danger" variant="dark">
				<Container>
					<Navbar.Brand>
						<Coffe className="d-inline-block align-top" width="30" height="30" />
						<span className="ms-2">Frontend Técnico</span>
					</Navbar.Brand>
				</Container>
			</Navbar>

			<br />

			<Overlay target={overlay.current} show={showFilter} placement="bottom">
				{({ placement, arrowProps, show: _show, popper, ...props }) => (
					<div
						{...props}
						style={{
							borderRadius: 3,
							color: 'white',
							padding: '6px',
							display: 'flex',
							alignItems: 'center',
							position: 'absolute',
							backgroundColor: 'rgba(220, 53, 69, 1)',
							...props.style,
						}}
					>
						<span>Filter: </span>
						<input style={{ marginLeft: '6px' }} value={filter} onChange={(e) => setFilter(e.target.value)} />
						<button className="btn btn-primary" style={{ marginLeft: '6px' }} onClick={onFilter} type="button">
							Filter
						</button>
					</div>
				)}
			</Overlay>

			<Container style={{ overflow: 'hidden auto', height: '91vh' }}>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th style={{ width: 108, display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '14px' }}>
								File Name
								<span>
									<button ref={overlay} style={{ backgroundColor: 'rgba(0,0,0,0)', padding: 0, border: 'none' }} onClick={() => setShowFilter(!showFilter)}>
										{!showFilter ? '🔽' : '🔼'}
									</button>
								</span>
							</th>
							<th style={{ fontWeight: 'bold', fontSize: 14 }}>Text</th>
							<th style={{ fontWeight: 'bold', fontSize: 14 }}>Number</th>
							<th style={{ fontWeight: 'bold', fontSize: 14 }}>Hex</th>
						</tr>
					</thead>
					<tbody>
						{files.allData
							.sort((a, b) => (a.file === b.file ? 0 : a.file > b.file ? 1 : -1))
							.map(
								(list) =>
									list?.lines?.length > 0 &&
									list?.lines?.map((val, id) => (
										<tr name={list.file} key={id}>
											<td style={{ width: 108, fontSize: 14 }}>{list.file}</td>
											<td style={{ fontSize: 14 }}>{val.text}</td>
											<td style={{ fontSize: 14 }}>{val.number}</td>
											<td style={{ fontSize: 14 }}>{val.hex}</td>
										</tr>
									))
							)}
					</tbody>
				</Table>
			</Container>
		</>
	);
};

export default HomePage;

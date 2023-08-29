import React, { useEffect } from 'react';
import DashboardLayout from 'hoc/DashboardLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getProdectsFromHistory } from "store/actions/user.actions"

import { Table } from 'react-bootstrap';
import Moment from 'react-moment';

export default function UserDashboard({ users }) {
    const dispatch = useDispatch();
    const history = users.data.history;

    useEffect(() => {
        dispatch(getProdectsFromHistory(history))
    }, [dispatch])

    console.log(users.history);
    return (
        <DashboardLayout title="Overview">
            <div className='user_nfo_panel'>
                <div>
                    <span>{users.data.firstname}</span>
                    <span>{users.data.lastname}</span>
                    <span>{users.data.email}</span>
                </div>
                {users.data.history ?
                    <div className='user_nfo_panel'>
                        <h1>History of purchases</h1>
                        <div className='user_product_blck_wrapper'>
                            {/* <HistoryBlock history={users.history} /> */}
                            {/* <>
                                {users.history.map((item, index) => (
                                    <div key={index}>{item.model}</div>
                                ))}
                            </> */}

                            <>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Products</th>
                                            <th>Amount paid</th>
                                            <th>Order ID</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.history.map((item) => (
                                            <tr key={item.transactionId}>
                                                <td>{item.model}</td>
                                                <td>$ {item.price}</td>
                                                <td>{item._id}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </>
                        </div>
                    </div>
                    :
                    null}
            </div>
        </DashboardLayout>
    )
}

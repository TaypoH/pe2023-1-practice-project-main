import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
// import { format } from 'date-fns';
import { connect } from 'react-redux';
import { getTransactions } from '../../store/slices/transactionsSlice';
import Spinner from '../../components/Spinner/Spinner';
import TryAgain from '../../components/TryAgain/TryAgain';

function TransactionsPage ({ transactions, isFetching, error, get }) {
  useEffect(() => {
    get();
  }, []);

  const mapTransactions = t => (
    <tr key={t.id}>
      {/* <td>{format(new Date(t.createdAt), 'yyyy-MM-dd')}</td> */}
      {`${new Date(t.createdAt).getFullYear()}-${new Date(
        t.createdAt
      ).getMonth()}-${new Date(t.createdAt).getDate()}`}
      <td>{t.operationType}</td>
      <td>{t.summ}</td>
    </tr>
  );

  return (
    <>
      <Header />
      {isFetching && <Spinner />}
      {error && <TryAgain getData={get}/>}
      {!isFetching && !error && (
        <main>
          <table>
            <caption>Your Transactions</caption>
            <thead>
              <tr>
                <th key={1}>Date</th>
                <th key={2}>Operation Type</th>
                <th key={3}>Summ</th>
              </tr>
            </thead>
            <tbody>{transactions.map(mapTransactions)}</tbody>
          </table>
        </main>
      )}
    </>
  );
}

const mapStateToProps = ({ transactionsStore }) => transactionsStore;

const mapDispatchToProps = dispatch => ({
  get: () => dispatch(getTransactions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsPage);

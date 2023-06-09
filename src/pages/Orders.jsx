import React from 'react';
import axios from 'axios';

import Card from '../components/Card';
//import AppContext from '../context';

function Orders() {
  // const { onAddToFavorite, onAddToCart } = React.useContext(AppContext);
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('http://localhost:3003/orders');
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.order], []));
        setIsLoading(false);
      } catch (error) {
        alert('Помилка при запиті замовлень');
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мої замовлення</h1>
      </div>

      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(8)] : orders).map((item, index) => (
          <Card key={index} loading={isLoading} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Orders;

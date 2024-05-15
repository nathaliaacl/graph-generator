import React from 'react';

function OrderSize({ graphInfo }) {
  return (
    <div className="flex items-center  justify-center">
      <p className='mx-2'><strong>Order: </strong>{graphInfo.numberOfNodes}</p>
      <p className='mx-2'><strong>Size: </strong>{graphInfo.numberOfEdges}</p>
    </div>
  );
}

export default OrderSize;

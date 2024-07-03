import React, { useEffect, useRef, useState } from 'react';
import HeaderBar from './components/HeaderBar';
import { PRECISION } from './constants';
import Table from './components/Table/Table';
import Button from './components/Button';
import { Option } from 'react-dropdown';
import { getWebsocket } from './utils/getWebsocket';
import { useDispatch } from 'react-redux';
import { resetBook } from './store/ordersSlice';
import { resetPrices } from './store/pricesSlice';

function App() {
  const dispatch = useDispatch()
  const [priceStepLevel, setPriceStepLevel] = useState<Option>(PRECISION[0]);
  const websocket = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(true);

  const closeWebsocket = () => {
    websocket.current?.close();
  };

  const connectWebsocket = () => {
    websocket.current = getWebsocket(setConnected, priceStepLevel.value);
  }

  const reConnectWebsocket = () => {
    dispatch(resetPrices())
    dispatch(resetBook())
    connectWebsocket()
  };

  useEffect(() => {
    closeWebsocket()
    reConnectWebsocket()
    return () => {
      websocket.current?.close();
    };
  }, [priceStepLevel]);

  return (
    <div className="text-blue-50">
      <header className="text-2xl text-center">
        Sean Daley - Bitfinex Frontend Developer Programming Challenge
      </header>
      <div className="flex flex-auto flex-col">
        <HeaderBar
          dropdownValue={priceStepLevel}
          dropdownValues={PRECISION}
          setDropdownValue={setPriceStepLevel}
        />
        <div className="flex flex-1 justify-center flex-row">
          <Table type="bids" />
          <Table type="asks"/>
        </div>
        <div className="flex flex-1 justify-center">
          <Button
            label={`${connected ? 'Disconnect' : 'Connect'} Websocket`}
            onClick={connected ? closeWebsocket : connectWebsocket}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

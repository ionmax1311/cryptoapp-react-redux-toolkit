import React, { useState } from "react";
import millify from "millify";
import { Collapse, Row, Col, Typography, Avatar } from "antd";
import HTMLReactParser from "html-react-parser";
import {
	useGetCryptosQuery,
	useGetCryptoDetailsQuery,
} from "../services/cryptoAPI";

import Loader from "./Loader";

const { Text } = Typography;
const { Panel } = Collapse;

export const Exchanges = () => {
	const count = 100;
	const [curId, setCurId] = useState("Qwsogvtv82FCd");
	const { data, isFetching } = useGetCryptosQuery(count);
	const { data: dataDetail } = useGetCryptoDetailsQuery(curId);
	const exchangesList = data?.data?.coins;
	const description = dataDetail?.data?.coin.description;

	if (isFetching) return <Loader />;

	const getDescription = (id) => {
		setCurId(id);
	};

	return (
		<>
			<Row>
				<Col span={6}>Exchanges</Col>
				<Col span={6}>24h Trade Volume</Col>
				<Col span={6}>Market Cap</Col>
				<Col span={6}>Change</Col>
			</Row>
			<Row>
				<Col span={24}>
					<Collapse accordion className='collapse-wrap'>
						{exchangesList.map((exchange, i) => (
							<Panel
								key={i + 1}
								showArrow={false}
								header={
									<Row
										className='collapse-panel-item'
										onClick={() =>
											getDescription(exchange.uuid)
										}>
										<Col span={6}>
											<Text>
												<strong>
													{exchange.rank}.
												</strong>
											</Text>
											<Avatar
												className='exchange-image'
												src={exchange.iconUrl}
											/>
											<Text>
												<strong>{exchange.name}</strong>
											</Text>
										</Col>
										<Col span={6}>
											${millify(exchange["24hVolume"])}
										</Col>
										<Col span={6}>
											{millify(exchange.marketCap)}
										</Col>
										<Col span={6}>
											{millify(exchange.change)}%
										</Col>
									</Row>
								}>
								{HTMLReactParser(description || "")}
							</Panel>
						))}
					</Collapse>
				</Col>
			</Row>
		</>
	);
};

export default Exchanges;

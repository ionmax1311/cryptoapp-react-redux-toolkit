import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
	HomeOutlined,
	BulbOutlined,
	FundOutlined,
	MenuOutlined,
	MoneyCollectOutlined,
} from "@ant-design/icons";
import icon from "../images/cryptocurrency.png";

const itemsMenu = [
	{ label: <Link to='/'>Home</Link>, key: "item-1", icon: <HomeOutlined /> },
	{
		label: <Link to='/cryptocurrencies'>Cryptocurrencies</Link>,
		key: "item-2",
		icon: <FundOutlined />,
	},
	{
		label: <Link to='/exchanges'>Exchanges</Link>,
		key: "item-3",
		icon: <MoneyCollectOutlined />,
	},
	{
		label: <Link to='/news'>News</Link>,
		key: "item-4",
		icon: <BulbOutlined />,
	},
];

const Navbar = () => {
	const [activeMenu, setActiveMenu] = useState(true);
	const [screenSize, setScreenSize] = useState(null);

	useEffect(() => {
		const handleResize = () => setScreenSize(window.innerWidth);

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (screenSize < 768) {
			setScreenSize(false);
		} else {
			setScreenSize(true);
		}
	}, [screenSize]);

	return (
		<div className='nav-container'>
			<div className='logo-container'>
				<Avatar src={icon} size='large' />
				<Typography.Title
					level={2}
					className='logo'
					style={{ marginBottom: 0 }}>
					<Link to='/'>Cryptoapp</Link>
				</Typography.Title>
				<Button
					className='menu-control-container'
					onClick={() => setActiveMenu(!activeMenu)}>
					<MenuOutlined />
				</Button>
			</div>
			{activeMenu && (
				<Menu theme='dark' mode='inline' items={itemsMenu} />
			)}
		</div>
	);
};

export default Navbar;

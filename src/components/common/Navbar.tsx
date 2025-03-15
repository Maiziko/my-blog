// src/components/common/Navbar.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, Button, Drawer } from 'antd';
import { MenuOutlined, HomeOutlined, FileAddOutlined } from '@ant-design/icons';

const Navbar: React.FC = () => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link href="/">Home</Link>,
    },
    {
      key: '/posts',
      icon: <HomeOutlined />,
      label: <Link href="/posts">Posts</Link>,
    },
    {
      key: '/posts/create',
      icon: <FileAddOutlined />,
      label: <Link href="/posts/create">Create Post</Link>,
    },
  ];

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Blog App
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <Menu
              mode="horizontal"
              selectedKeys={[router.pathname]}
              items={menuItems}
              className="border-0"
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              type="text" 
              icon={<MenuOutlined />} 
              onClick={() => setMobileMenuOpen(true)}
              className="flex items-center"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
      >
        <Menu
          mode="vertical"
          selectedKeys={[router.pathname]}
          items={menuItems}
          onClick={() => setMobileMenuOpen(false)}
        />
      </Drawer>
    </header>
  );
};

export default Navbar;